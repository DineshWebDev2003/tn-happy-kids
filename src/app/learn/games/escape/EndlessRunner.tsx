import React, { useEffect, useRef, useState } from 'react';
import { 
  generatePlayerImage,
  generateDogImage,
  generateBackgroundImage,
  generateObstacleImage,
  generateCollectibleImage,
  generateSchoolImage
} from './asset-generator';

interface EndlessRunnerProps {
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  language: 'english' | 'tamil';
  onGameOver: (score: number) => void;
  onUpdateScore: (score: number) => void;
}

// Game constants
const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const GAME_SPEED_START = 5;
const GAME_SPEED_INCREMENT = 0.001;
const OBSTACLE_SPAWN_RATE = 0.02; 
const COLLECTIBLE_SPAWN_RATE = 0.01;

// Player states
enum PlayerState {
  RUNNING = 'running',
  JUMPING = 'jumping',
  SLIDING = 'sliding',
  CRASHED = 'crashed'
}

// Obstacle types
enum ObstacleType {
  PUDDLE = 'puddle',
  BIKE = 'bike',
  VENDOR = 'vendor',
  TRASH_CAN = 'trash_can'
}

// Collectible types
enum CollectibleType {
  PENCIL = 'pencil',
  BOOK = 'book',
  NOTEBOOK = 'notebook',
  APPLE = 'apple'
}

// Game messages in different languages
const GAME_MESSAGES = {
  english: {
    start: "Run to school!",
    jump: "Jump!",
    slide: "Slide!",
    gameOver: "Oh no! Try again!",
    score: "Score: ",
    highScore: "High Score: ",
    restart: "Tap to restart",
    collectible: "Great job!",
    obstacle: "Watch out!"
  },
  tamil: {
    start: "பள்ளிக்கு ஓடு!",
    jump: "தாவு!",
    slide: "சறுக்கு!",
    gameOver: "அடடா! மீண்டும் முயற்சி செய்!",
    score: "மதிப்பெண்: ",
    highScore: "அதிக மதிப்பெண்: ",
    restart: "மீண்டும் தொடங்க தட்டவும்",
    collectible: "அருமை!",
    obstacle: "கவனம்!"
  }
};

const EndlessRunner: React.FC<EndlessRunnerProps> = ({ 
  difficulty, 
  soundEnabled, 
  language = 'english',
  onGameOver,
  onUpdateScore
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.RUNNING);
  const [showMessage, setShowMessage] = useState('');
  
  // Game state reference to avoid closure issues in animation
  const gameStateRef = useRef({
    player: {
      x: 100,
      y: 0,
      width: 50,
      height: 60,
      velocityY: 0,
      isJumping: false,
      isSliding: false
    },
    obstacles: [] as {
      x: number,
      y: number,
      width: number,
      height: number,
      type: ObstacleType,
      passed: boolean
    }[],
    collectibles: [] as {
      x: number,
      y: number,
      width: number,
      height: number,
      type: CollectibleType,
      collected: boolean
    }[],
    background: {
      x: 0,
      speed: GAME_SPEED_START
    },
    gameSpeed: GAME_SPEED_START,
    groundLevel: 0,
    frameCount: 0,
    score: 0,
    animationId: 0
  });
  
  // Load assets
  const [assets, setAssets] = useState<{
    player: HTMLImageElement | null;
    dog: HTMLImageElement | null;
    background: HTMLImageElement | null;
    obstacles: Record<ObstacleType, HTMLImageElement | null>;
    collectibles: Record<CollectibleType, HTMLImageElement | null>;
    school: HTMLImageElement | null;
  }>({
    player: null,
    dog: null,
    background: null,
    obstacles: {
      [ObstacleType.PUDDLE]: null,
      [ObstacleType.BIKE]: null,
      [ObstacleType.VENDOR]: null,
      [ObstacleType.TRASH_CAN]: null
    },
    collectibles: {
      [CollectibleType.PENCIL]: null,
      [CollectibleType.BOOK]: null,
      [CollectibleType.NOTEBOOK]: null,
      [CollectibleType.APPLE]: null
    },
    school: null
  });
  
  // Load images on component mount
  useEffect(() => {
    // Load image utility function
    const loadImage = (src: string, fallbackGenerator: () => string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}, using fallback generator`);
          const fallbackImg = new Image();
          fallbackImg.src = fallbackGenerator();
          fallbackImg.onload = () => resolve(fallbackImg);
          fallbackImg.onerror = () => {
            // If even the fallback fails, create a simple colored rectangle
            console.error('Fallback generator failed');
            const canvas = document.createElement('canvas');
            canvas.width = 50;
            canvas.height = 50;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = 'magenta';
              ctx.fillRect(0, 0, 50, 50);
              const placeholderImg = new Image();
              placeholderImg.src = canvas.toDataURL();
              resolve(placeholderImg);
            } else {
              // Last resort - empty image
              resolve(new Image());
            }
          };
        };
        img.src = src;
      });
    };
    
    // Load all assets
    Promise.all([
      // Player character
      loadImage('/images/school-runner/player.png', generatePlayerImage),
      
      // Dog
      loadImage('/images/school-runner/dog.png', generateDogImage),
      
      // Background
      loadImage('/images/school-runner/background.png', () => generateBackgroundImage()),
      
      // Obstacles
      loadImage('/images/school-runner/puddle.png', () => generateObstacleImage('puddle')),
      loadImage('/images/school-runner/bike.png', () => generateObstacleImage('bike')),
      loadImage('/images/school-runner/vendor.png', () => generateObstacleImage('vendor')),
      loadImage('/images/school-runner/trash_can.png', () => generateObstacleImage('trash_can')),
      
      // Collectibles
      loadImage('/images/school-runner/pencil.png', () => generateCollectibleImage('pencil')),
      loadImage('/images/school-runner/book.png', () => generateCollectibleImage('book')),
      loadImage('/images/school-runner/notebook.png', () => generateCollectibleImage('notebook')),
      loadImage('/images/school-runner/apple.png', () => generateCollectibleImage('apple')),
      
      // School (finish)
      loadImage('/images/school-runner/school.png', generateSchoolImage)
    ]).then(([
      playerImg,
      dogImg, 
      bgImg,
      puddleImg,
      bikeImg,
      vendorImg,
      trashCanImg,
      pencilImg,
      bookImg,
      notebookImg,
      appleImg,
      schoolImg
    ]) => {
      // Set all loaded assets
      setAssets({
        player: playerImg,
        dog: dogImg,
        background: bgImg,
        obstacles: {
          [ObstacleType.PUDDLE]: puddleImg,
          [ObstacleType.BIKE]: bikeImg,
          [ObstacleType.VENDOR]: vendorImg,
          [ObstacleType.TRASH_CAN]: trashCanImg
        },
        collectibles: {
          [CollectibleType.PENCIL]: pencilImg,
          [CollectibleType.BOOK]: bookImg,
          [CollectibleType.NOTEBOOK]: notebookImg,
          [CollectibleType.APPLE]: appleImg
        },
        school: schoolImg
      });
    });
    
    // Load high score from local storage
    const savedHighScore = localStorage.getItem('runnerHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  // Initialize and run game
  useEffect(() => {
    if (!canvasRef.current || !gameActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup game
    const setupGame = () => {
      // Reset the game state
      const state = gameStateRef.current;
      state.player.y = canvas.height - state.player.height - 20; // Place player on ground
      state.groundLevel = canvas.height - 20; // Ground level
      state.obstacles = [];
      state.collectibles = [];
      state.gameSpeed = GAME_SPEED_START;
      state.score = 0;
      state.frameCount = 0;
      
      // Reset player state
      setPlayerState(PlayerState.RUNNING);
      setScore(0);
      setShowMessage(GAME_MESSAGES[language].start);
      
      // Hide the start message after 2 seconds
      setTimeout(() => {
        setShowMessage('');
      }, 2000);
    };
    
    // Play sound effect
    const playSound = (soundName: string) => {
      if (!soundEnabled) return;
      
      const sounds: Record<string, HTMLAudioElement> = {
        jump: new Audio('/sounds/jump.mp3'),
        collect: new Audio('/sounds/collect.mp3'),
        crash: new Audio('/sounds/crash.mp3'),
        slide: new Audio('/sounds/slide.mp3')
      };
      
      if (sounds[soundName]) {
        sounds[soundName].play().catch(err => console.error('Error playing sound:', err));
      }
    };
    
    // Generate a random obstacle
    const generateObstacle = () => {
      const types = Object.values(ObstacleType);
      const type = types[Math.floor(Math.random() * types.length)];
      
      let width, height;
      
      switch (type) {
        case ObstacleType.PUDDLE:
          width = 70;
          height = 20;
          break;
        case ObstacleType.BIKE:
          width = 60;
          height = 50;
          break;
        case ObstacleType.VENDOR:
          width = 80;
          height = 70;
          break;
        case ObstacleType.TRASH_CAN:
          width = 40;
          height = 60;
          break;
        default:
          width = 50;
          height = 50;
      }
      
      return {
        x: canvas.width,
        y: gameStateRef.current.groundLevel - height,
        width,
        height,
        type,
        passed: false
      };
    };
    
    // Generate a random collectible
    const generateCollectible = () => {
      const types = Object.values(CollectibleType);
      const type = types[Math.floor(Math.random() * types.length)];
      
      const width = 30;
      const height = 30;
      
      // Random y position - some items in air, some on ground
      const onGround = Math.random() > 0.5;
      const y = onGround 
        ? gameStateRef.current.groundLevel - height 
        : gameStateRef.current.groundLevel - height - Math.random() * 150;
      
      return {
        x: canvas.width,
        y,
        width,
        height,
        type,
        collected: false
      };
    };
    
    // Draw game elements
    const draw = () => {
      const state = gameStateRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      if (assets.background) {
        // Create a looping background
        const bgWidth = canvas.width;
        ctx.drawImage(
          assets.background, 
          state.background.x % bgWidth, 
          0, 
          bgWidth, 
          canvas.height
        );
        ctx.drawImage(
          assets.background, 
          (state.background.x % bgWidth) + bgWidth, 
          0, 
          bgWidth, 
          canvas.height
        );
      } else {
        // Fallback background
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Simple ground
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, state.groundLevel, canvas.width, canvas.height - state.groundLevel);
      }
      
      // Draw obstacles
      state.obstacles.forEach(obstacle => {
        const obstacleImg = assets.obstacles[obstacle.type];
        if (obstacleImg) {
          ctx.drawImage(
            obstacleImg, 
            obstacle.x, 
            obstacle.y, 
            obstacle.width, 
            obstacle.height
          );
        } else {
          // Fallback obstacle drawing
          ctx.fillStyle = 'red';
          ctx.fillRect(
            obstacle.x, 
            obstacle.y, 
            obstacle.width, 
            obstacle.height
          );
        }
      });
      
      // Draw collectibles
      state.collectibles.forEach(collectible => {
        const collectibleImg = assets.collectibles[collectible.type];
        if (collectibleImg) {
          ctx.drawImage(
            collectibleImg, 
            collectible.x, 
            collectible.y, 
            collectible.width, 
            collectible.height
          );
        } else {
          // Fallback collectible drawing
          ctx.fillStyle = 'gold';
          ctx.beginPath();
          ctx.arc(
            collectible.x + collectible.width/2, 
            collectible.y + collectible.height/2, 
            collectible.width/2, 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        }
      });
      
      // Draw player
      if (assets.player) {
        // Use different frames for different states
        ctx.drawImage(
          assets.player, 
          state.player.x, 
          state.player.y, 
          state.player.width, 
          state.player.isSliding ? state.player.height / 2 : state.player.height
        );
      } else {
        // Fallback player drawing
        ctx.fillStyle = 'blue';
        ctx.fillRect(
          state.player.x, 
          state.player.y, 
          state.player.width, 
          state.player.isSliding ? state.player.height / 2 : state.player.height
        );
      }
      
      // Draw pursuing dog (always behind player)
      if (assets.dog) {
        ctx.drawImage(
          assets.dog, 
          state.player.x - 100 + Math.sin(state.frameCount * 0.1) * 10, // Make dog move slightly to create tension
          state.groundLevel - 50, 
          60, 
          50
        );
      } else {
        // Fallback dog drawing
        ctx.fillStyle = 'brown';
        ctx.fillRect(
          state.player.x - 100 + Math.sin(state.frameCount * 0.1) * 10, 
          state.groundLevel - 50, 
          60, 
          50
        );
      }
      
      // Draw score
      ctx.fillStyle = 'black';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`${GAME_MESSAGES[language].score} ${state.score}`, 20, 30);
      
      // Draw message if any
      if (showMessage) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(canvas.width/2 - 150, canvas.height/2 - 40, 300, 80);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(showMessage, canvas.width/2, canvas.height/2);
        ctx.textAlign = 'left';
      }
    };
    
    // Update game state
    const update = () => {
      const state = gameStateRef.current;
      state.frameCount++;
      
      // Increase game speed over time
      state.gameSpeed += GAME_SPEED_INCREMENT;
      
      // Update background position
      state.background.x -= state.gameSpeed;
      
      // Update player position (gravity, jump physics)
      if (state.player.isJumping) {
        state.player.velocityY += GRAVITY;
        state.player.y += state.player.velocityY;
        
        // Check if landing
        if (state.player.y >= state.groundLevel - state.player.height) {
          state.player.y = state.groundLevel - state.player.height;
          state.player.isJumping = false;
          state.player.velocityY = 0;
          setPlayerState(PlayerState.RUNNING);
        }
      }
      
      // Reset sliding after a duration
      if (state.player.isSliding && state.frameCount % 60 === 0) {
        state.player.isSliding = false;
        setPlayerState(PlayerState.RUNNING);
      }
      
      // Random obstacle generation
      if (Math.random() < OBSTACLE_SPAWN_RATE * (state.gameSpeed / GAME_SPEED_START)) {
        if (state.obstacles.length === 0 || 
            state.obstacles[state.obstacles.length - 1].x < canvas.width - 200) {
          state.obstacles.push(generateObstacle());
        }
      }
      
      // Random collectible generation
      if (Math.random() < COLLECTIBLE_SPAWN_RATE * (state.gameSpeed / GAME_SPEED_START)) {
        if (state.collectibles.length === 0 || 
            state.collectibles[state.collectibles.length - 1].x < canvas.width - 150) {
          state.collectibles.push(generateCollectible());
        }
      }
      
      // Update obstacles
      state.obstacles = state.obstacles.filter((obstacle, index) => {
        obstacle.x -= state.gameSpeed;
        
        // Check if player passed this obstacle
        if (!obstacle.passed && obstacle.x + obstacle.width < state.player.x) {
          obstacle.passed = true;
          state.score += 10; // Points for passing obstacle
          setScore(state.score);
          onUpdateScore(state.score);
        }
        
        // Check collision
        if (checkCollision(state.player, obstacle)) {
          handleCollision();
        }
        
        // Remove if off-screen
        return obstacle.x > -obstacle.width;
      });
      
      // Update collectibles
      state.collectibles = state.collectibles.filter(collectible => {
        collectible.x -= state.gameSpeed;
        
        // Check if collected
        if (!collectible.collected && checkCollision(state.player, collectible)) {
          collectible.collected = true;
          state.score += 50; // Points for collectible
          setScore(state.score);
          onUpdateScore(state.score);
          
          // Show message
          setShowMessage(GAME_MESSAGES[language].collectible);
          setTimeout(() => setShowMessage(''), 1000);
          
          // Play sound
          playSound('collect');
          
          return false; // Remove collected item
        }
        
        // Remove if off-screen
        return collectible.x > -collectible.width;
      });
      
      // Increment score based on distance
      if (state.frameCount % 10 === 0) {
        state.score += 1;
        setScore(state.score);
        onUpdateScore(state.score);
      }
    };
    
    // Check collision between two objects
    const checkCollision = (a: any, b: any) => {
      // Adjust collision box for sliding
      const aHeight = a.isSliding ? a.height / 2 : a.height;
      
      return !(
        a.x + a.width < b.x || // a is left of b
        a.x > b.x + b.width || // a is right of b
        a.y + aHeight < b.y || // a is above b
        a.y > b.y + b.height // a is below b
      );
    };
    
    // Handle player collision with obstacle
    const handleCollision = () => {
      const state = gameStateRef.current;
      
      // Only handle collision if not already crashed
      if (playerState !== PlayerState.CRASHED) {
        setPlayerState(PlayerState.CRASHED);
        playSound('crash');
        
        // Game over
        setShowMessage(GAME_MESSAGES[language].gameOver);
        
        // Update high score if needed
        if (state.score > highScore) {
          setHighScore(state.score);
          localStorage.setItem('runnerHighScore', state.score.toString());
        }
        
        // Notify parent component
        onGameOver(state.score);
        
        // Stop animation
        if (state.animationId) {
          cancelAnimationFrame(state.animationId);
        }
        
        // Reset game after delay
        setTimeout(() => {
          setGameActive(false);
        }, 2000);
      }
    };
    
    // Player actions
    const jump = () => {
      const state = gameStateRef.current;
      
      if (!state.player.isJumping && !state.player.isSliding) {
        state.player.isJumping = true;
        state.player.velocityY = JUMP_FORCE;
        setPlayerState(PlayerState.JUMPING);
        playSound('jump');
        
        // Show hint message
        setShowMessage(GAME_MESSAGES[language].jump);
        setTimeout(() => setShowMessage(''), 500);
      }
    };
    
    const slide = () => {
      const state = gameStateRef.current;
      
      if (!state.player.isSliding && !state.player.isJumping) {
        state.player.isSliding = true;
        setPlayerState(PlayerState.SLIDING);
        playSound('slide');
        
        // Show hint message
        setShowMessage(GAME_MESSAGES[language].slide);
        setTimeout(() => setShowMessage(''), 500);
      }
    };
    
    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (playerState === PlayerState.CRASHED) return;
      
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') {
        jump();
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        slide();
      }
    };
    
    // Handle touch controls for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (playerState === PlayerState.CRASHED) return;
      
      const touchY = e.touches[0].clientY;
      const screenHeight = window.innerHeight;
      
      // Upper half of screen: jump, Lower half: slide
      if (touchY < screenHeight / 2) {
        jump();
      } else {
        slide();
      }
    };
    
    // Game loop
    const gameLoop = () => {
      if (playerState !== PlayerState.CRASHED) {
        update();
        draw();
        gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
      }
    };
    
    // Set up event listeners
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart);
    
    // Initial setup and start game loop
    setupGame();
    gameLoop();
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(gameStateRef.current.animationId);
    };
  }, [gameActive, assets, highScore, language, onGameOver, onUpdateScore, playerState, showMessage, soundEnabled]);
  
  // Start the game
  const startGame = () => {
    setGameActive(true);
  };
  
  return (
    <div className="relative w-full flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400} 
        className="border-2 border-gray-300 rounded-lg shadow-xl bg-sky-100 w-full max-h-[80vh] object-contain"
      />
      
      {!gameActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Run to School!
            </h2>
            
            <p className="mb-4">
              Help the girl run to school while avoiding obstacles and collecting school supplies!
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-bold mb-2">Controls:</h3>
              <ul className="list-disc pl-5">
                <li>Press UP or SPACE to jump</li>
                <li>Press DOWN to slide</li>
                <li>On mobile, tap top half to jump</li>
                <li>On mobile, tap bottom half to slide</li>
              </ul>
            </div>
            
            {highScore > 0 && (
              <p className="text-md font-bold mb-4">
                {GAME_MESSAGES[language].highScore} {highScore}
              </p>
            )}
            
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndlessRunner; 