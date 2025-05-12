import React, { useEffect, useRef, useState } from 'react';
import { 
  generatePlayerImage, 
  generateDogImage, 
  generateTreeImage, 
  generateBackgroundImage,
  generateHouseImage,
  generatePowerupImage
} from './generate-placeholders';

interface Game2DProps {
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  onGameOver: (win: boolean, score: number) => void;
  setProgress: (progress: number) => void;
  onHeardVoice: (text: string) => void;
}

// Default game settings based on difficulty
const difficultySettings = {
  easy: {
    dogSpeed: 0.6,
    obstacleCount: 10,
    playerSpeed: 5
  },
  medium: {
    dogSpeed: 0.8,
    obstacleCount: 15,
    playerSpeed: 4
  },
  hard: {
    dogSpeed: 1.0,
    obstacleCount: 20,
    playerSpeed: 3
  }
};

const Game2D: React.FC<Game2DProps> = ({ 
  difficulty, 
  soundEnabled, 
  onGameOver, 
  setProgress,
  onHeardVoice
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState] = useState({
    humanX: 400,
    humanY: 400,
    dogX: 400,
    dogY: 500,
    speed: difficultySettings[difficulty].playerSpeed,
    running: false,
    jumping: false,
    jumpHeight: 0,
    score: 0,
    gameDistance: 1500, // Total distance to win
    finished: false,
    lastAction: Date.now(),
    obstacles: [] as {x: number, y: number, width: number, height: number}[],
    powerups: [] as {x: number, y: number, type: 'speed' | 'shield'}[],
    animationId: 0
  });
  
  // Load assets
  const [assets, setAssets] = useState<{
    player: HTMLImageElement | null;
    dog: HTMLImageElement | null;
    tree: HTMLImageElement | null;
    background: HTMLImageElement | null;
    house: HTMLImageElement | null;
  }>({
    player: null,
    dog: null,
    tree: null,
    background: null,
    house: null
  });
  
  // Initial image loading
  useEffect(() => {
    const loadImage = (name: keyof typeof assets, src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setAssets(prev => ({ ...prev, [name]: img }));
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          
          // Create placeholder
          let placeholderImg = new Image();
          switch(name) {
            case 'player':
              placeholderImg.src = generatePlayerImage();
              break;
            case 'dog':
              placeholderImg.src = generateDogImage();
              break;
            case 'tree':
              placeholderImg.src = generateTreeImage();
              break;
            case 'background':
              placeholderImg.src = generateBackgroundImage();
              break;
            case 'house':
              placeholderImg.src = generateHouseImage();
              break;
          }
          
          setAssets(prev => ({ ...prev, [name]: placeholderImg }));
          resolve();
        };
        img.src = src;
      });
    };
    
    // Load all images
    Promise.all([
      loadImage('player', '/images/escape-game-2d/player.png'),
      loadImage('dog', '/images/escape-game-2d/dog.png'),
      loadImage('tree', '/images/escape-game-2d/tree.png'),
      loadImage('background', '/images/escape-game-2d/background.png'),
      loadImage('house', '/images/escape-game-2d/house.png')
    ]);
  }, []);
  
  // Generate obstacles and powerups
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const obstacleCount = difficultySettings[difficulty].obstacleCount;
    
    // Generate obstacles (trees)
    gameState.obstacles = [];
    for (let i = 0; i < obstacleCount; i++) {
      gameState.obstacles.push({
        x: Math.random() * (canvas.width - 60),
        y: Math.random() * gameState.gameDistance,
        width: 60,
        height: 80
      });
    }
    
    // Add some power-ups
    gameState.powerups = [];
    for (let i = 0; i < 5; i++) {
      gameState.powerups.push({
        x: Math.random() * (canvas.width - 30),
        y: 200 + Math.random() * (gameState.gameDistance - 400),
        type: Math.random() > 0.5 ? 'speed' : 'shield'
      });
    }
  }, [difficulty, gameState]);
  
  // Game loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Voice recognition setup
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
          onHeardVoice(transcript);
          if (transcript.includes('left')) movePlayer('left');
          if (transcript.includes('right')) movePlayer('right');
          if (transcript.includes('jump')) movePlayer('jump');
          if (transcript.includes('down')) movePlayer('down');
          if (transcript.match(/run( run)?( run)?/)) movePlayer('run');
        };
        
        recognition.start();
        return () => recognition.stop();
      }
    }
    
    // Load sounds
    const sounds = {
      jump: new Audio('/sounds/jump.mp3'),
      run: new Audio('/sounds/run.mp3'),
      win: new Audio('/sounds/win.mp3'),
      lose: new Audio('/sounds/lose.mp3'),
      powerup: new Audio('/sounds/powerup.mp3')
    };
    
    // Preload sounds
    Object.values(sounds).forEach(sound => sound.load());
    
    // Game rendering
    function render() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      if (assets.background) {
        // Create a scrolling background effect
        const bgHeight = canvas.height;
        const scrollPosition = (gameState.humanY % bgHeight) / bgHeight;
        
        ctx.drawImage(assets.background, 0, -scrollPosition * bgHeight, canvas.width, bgHeight);
        ctx.drawImage(assets.background, 0, (1 - scrollPosition) * bgHeight, canvas.width, bgHeight);
      } else {
        // Create gradient if image not available
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw path
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(canvas.width/2 - 50, 0, 100, canvas.height);
      }
      
      // Draw house at the end (destination)
      const houseScreenY = 50 - gameState.humanY + canvas.height / 2;
      if (houseScreenY > -100 && houseScreenY < canvas.height) {
        if (assets.house) {
          ctx.drawImage(assets.house, canvas.width/2 - 50, houseScreenY - 100, 100, 100);
        } else {
          ctx.fillStyle = 'red';
          ctx.fillRect(canvas.width/2 - 30, houseScreenY - 80, 60, 80);
          ctx.fillStyle = 'brown';
          ctx.fillRect(canvas.width/2 - 10, houseScreenY - 40, 20, 40);
        }
      }
      
      // Draw obstacles
      gameState.obstacles.forEach(obstacle => {
        const screenY = obstacle.y - gameState.humanY + canvas.height / 2;
        // Only draw if visible on screen
        if (screenY > -100 && screenY < canvas.height + 100) {
          if (assets.tree) {
            ctx.drawImage(assets.tree, obstacle.x, screenY, obstacle.width, obstacle.height);
          } else {
            ctx.fillStyle = 'green';
            ctx.fillRect(obstacle.x, screenY, obstacle.width, obstacle.height);
          }
        }
      });
      
      // Draw power-ups
      gameState.powerups.forEach(powerup => {
        const screenY = powerup.y - gameState.humanY + canvas.height / 2;
        if (screenY > -30 && screenY < canvas.height + 30) {
          // Draw using the generated powerup image
          const powerupImg = new Image();
          powerupImg.src = generatePowerupImage(powerup.type);
          ctx.drawImage(powerupImg, powerup.x, screenY, 30, 30);
        }
      });
      
      // Draw human character
      if (assets.player) {
        ctx.drawImage(
          assets.player, 
          gameState.humanX - 25, 
          canvas.height / 2 - 25 - gameState.jumpHeight, 
          50, 
          50
        );
      } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(
          gameState.humanX - 25, 
          canvas.height / 2 - 25 - gameState.jumpHeight, 
          50, 
          50
        );
      }
      
      // Draw dog character
      const dogScreenY = gameState.dogY - gameState.humanY + canvas.height / 2;
      if (assets.dog) {
        ctx.drawImage(
          assets.dog, 
          gameState.dogX - 35, 
          dogScreenY - 25, 
          70, 
          50
        );
      } else {
        ctx.fillStyle = 'brown';
        ctx.fillRect(
          gameState.dogX - 35, 
          dogScreenY - 25, 
          70, 
          50
        );
      }
      
      // Draw score
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 24px Arial';
      const scoreText = `Score: ${gameState.score}`;
      ctx.strokeText(scoreText, 20, 30);
      ctx.fillText(scoreText, 20, 30);
    }
    
    // Game update logic
    function update() {
      if (gameState.finished) return;
      
      // Increase score as player progresses
      gameState.score = Math.floor(gameState.humanY / 10);
      
      // Update jump
      if (gameState.jumping) {
        gameState.jumpHeight += 5;
        if (gameState.jumpHeight > 100) {
          gameState.jumping = false;
        }
      } else if (gameState.jumpHeight > 0) {
        gameState.jumpHeight -= 5;
      }
      
      // Move human forward
      gameState.humanY -= gameState.running ? gameState.speed * 2 : gameState.speed;
      
      // Dog follows the human
      const dogSpeedMultiplier = difficultySettings[difficulty].dogSpeed;
      
      // Dog follows with some intelligence
      if (gameState.dogY > gameState.humanY + 120) {
        gameState.dogY -= gameState.speed * dogSpeedMultiplier;
        
        // Dog tries to match player's x position
        if (gameState.dogX < gameState.humanX - 10) {
          gameState.dogX += gameState.speed * 0.5;
        } else if (gameState.dogX > gameState.humanX + 10) {
          gameState.dogX -= gameState.speed * 0.5;
        }
      }
      
      // Collision detection with obstacles
      for (let i = 0; i < gameState.obstacles.length; i++) {
        const obstacle = gameState.obstacles[i];
        const obstacleScreenY = obstacle.y - gameState.humanY + canvasRef.current!.height / 2;
        
        // Check if human collides with obstacle
        if (
          gameState.humanX + 20 > obstacle.x && 
          gameState.humanX - 20 < obstacle.x + obstacle.width &&
          canvasRef.current!.height / 2 + 20 - gameState.jumpHeight > obstacleScreenY && 
          canvasRef.current!.height / 2 - 20 - gameState.jumpHeight < obstacleScreenY + obstacle.height
        ) {
          // Collision with tree - slow down the player
          gameState.speed = Math.max(2, gameState.speed - 0.5);
          
          // Push the player away slightly
          if (gameState.humanX < obstacle.x + obstacle.width / 2) {
            gameState.humanX -= 10;
          } else {
            gameState.humanX += 10;
          }
        }
      }
      
      // Collision with power-ups
      for (let i = gameState.powerups.length - 1; i >= 0; i--) {
        const powerup = gameState.powerups[i];
        const powerupScreenY = powerup.y - gameState.humanY + canvasRef.current!.height / 2;
        
        // Check if human collides with power-up
        if (
          gameState.humanX + 20 > powerup.x && 
          gameState.humanX - 20 < powerup.x + 30 &&
          canvasRef.current!.height / 2 + 20 - gameState.jumpHeight > powerupScreenY && 
          canvasRef.current!.height / 2 - 20 - gameState.jumpHeight < powerupScreenY + 30
        ) {
          // Apply power-up effect
          if (powerup.type === 'speed') {
            gameState.speed += 2;
            setTimeout(() => { gameState.speed = Math.max(3, gameState.speed - 2); }, 5000);
          } else if (powerup.type === 'shield') {
            // Push dog back
            gameState.dogY += 200;
          }
          
          // Play sound effect
          if (soundEnabled) {
            sounds.powerup.play().catch(() => {});
          }
          
          // Increase score
          gameState.score += 50;
          
          // Remove the power-up
          gameState.powerups.splice(i, 1);
        }
      }
      
      // Check if dog caught the human
      const dogDistance = Math.sqrt(
        Math.pow(gameState.dogX - gameState.humanX, 2) + 
        Math.pow(gameState.dogY - gameState.humanY, 2)
      );
      
      if (dogDistance < 50) {
        // Game over - dog caught the human
        gameState.finished = true;
        
        // Play lose sound
        if (soundEnabled) {
          sounds.lose.play().catch(() => {});
        }
        
        setTimeout(() => onGameOver(false, gameState.score), 1000);
      }
      
      // Check if human reached the goal
      if (gameState.humanY <= 50) {
        // Game over - human escaped!
        gameState.finished = true;
        
        // Play win sound
        if (soundEnabled) {
          sounds.win.play().catch(() => {});
        }
        
        setTimeout(() => onGameOver(true, gameState.score), 1000);
      }
      
      // Update progress (0 to 1)
      setProgress(1 - Math.max(0, Math.min(1, gameState.humanY / gameState.gameDistance)));
    }
    
    // Game loop
    function gameLoop() {
      update();
      render();
      
      if (!gameState.finished) {
        gameState.animationId = requestAnimationFrame(gameLoop);
      }
    }
    
    // Start the game loop
    gameLoop();
    
    // Cleanup
    return () => {
      if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
      }
    };
  }, [assets, difficulty, gameState, onGameOver, onHeardVoice, setProgress, soundEnabled]);
  
  // Player action handler
  const movePlayer = (action: string) => {
    if (gameState.finished) return;
    
    switch (action) {
      case 'left':
        gameState.humanX -= 20;
        if (gameState.humanX < 20) gameState.humanX = 20;
        break;
      case 'right':
        gameState.humanX += 20;
        if (canvasRef.current && gameState.humanX > canvasRef.current.width - 20) {
          gameState.humanX = canvasRef.current.width - 20;
        }
        break;
      case 'jump':
        if (!gameState.jumping && gameState.jumpHeight === 0) {
          gameState.jumping = true;
          // Play jump sound
          if (soundEnabled) {
            const jumpSound = new Audio('/sounds/jump.mp3');
            jumpSound.play().catch(() => {});
          }
        }
        break;
      case 'run':
        gameState.running = true;
        // Play run sound
        if (soundEnabled) {
          const runSound = new Audio('/sounds/run.mp3');
          runSound.play().catch(() => {});
        }
        
        // Only run for a short duration
        setTimeout(() => {
          gameState.running = false;
        }, 1000);
        break;
      case 'down':
        // Duck or slide action
        break;
    }
  };
  
  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === 'ArrowUp' || e.key === ' ') movePlayer('jump');
    if (e.key === 'ArrowDown') movePlayer('down');
    if (e.key === 'Shift') movePlayer('run');
  };
  
  return (
    <div 
      className="relative w-full"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <canvas 
        ref={canvasRef}
        width={800}
        height={500}
        className="border-2 border-gray-300 rounded-lg shadow-xl bg-sky-100 w-full max-h-[80vh] object-contain"
      />
    </div>
  );
};

export default Game2D; 