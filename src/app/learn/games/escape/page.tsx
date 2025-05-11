"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Lazy load Three.js and GSAP only on client
let THREE: any, gsap: any;
if (typeof window !== 'undefined') {
  // @ts-ignore
  import('three').then(mod => (THREE = mod));
  // @ts-ignore
  import('gsap').then(mod => (gsap = mod));
}

const actions = ['left', 'right', 'jump', 'down', 'run'];

export default function EscapeGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [heard, setHeard] = useState('');
  const [progress, setProgress] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      setHeard(transcript);
      if (transcript.includes('left')) move('left');
      if (transcript.includes('right')) move('right');
      if (transcript.includes('jump')) move('jump');
      if (transcript.includes('down')) move('down');
      if (transcript.match(/run( run)?( run)?/)) move('run');
    };
    recognition.start();
    return () => recognition.stop();
  }, []);

  // Three.js scene setup
  useEffect(() => {
    let scene: any, camera: any, renderer: any, human: any, dog: any, home: any, animId: any;
    let humanPos = 0, dogPos = -5, speed = 0.05, running = false;
    let jumpY = 0, jumping = false;
    let leftRight = 0;
    let finished = false;

    async function init() {
      THREE = (await import('three'));
      gsap = (await import('gsap')).gsap;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
      camera.position.set(0, 2, 8);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(400, 300);
      if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

      // Human (cube)
      const humanGeo = new THREE.BoxGeometry(0.7, 1.2, 0.7);
      const humanMat = new THREE.MeshStandardMaterial({ color: 0x4ade80 });
      human = new THREE.Mesh(humanGeo, humanMat);
      human.position.set(0, 0.6, humanPos);
      scene.add(human);

      // Dog (sphere)
      const dogGeo = new THREE.SphereGeometry(0.6, 32, 32);
      const dogMat = new THREE.MeshStandardMaterial({ color: 0xf87171 });
      dog = new THREE.Mesh(dogGeo, dogMat);
      dog.position.set(0, 0.6, dogPos);
      scene.add(dog);

      // Home (house shape)
      const homeGeo = new THREE.ConeGeometry(1, 1.5, 4);
      const homeMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
      home = new THREE.Mesh(homeGeo, homeMat);
      home.position.set(0, 0.75, 10);
      scene.add(home);

      // Light
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 10, 7.5);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      // Ground
      const groundGeo = new THREE.PlaneGeometry(20, 30);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      scene.add(ground);

      // Animate
      function animate() {
        if (finished) return;
        // Move human forward
        if (!win && !gameOver) {
          humanPos += running ? speed * 2 : speed;
          if (jumping) {
            jumpY += 0.15;
            if (jumpY > 1.5) jumping = false;
          } else if (human.position.y > 0.6) {
            jumpY -= 0.15;
          }
          human.position.y = 0.6 + Math.max(0, jumpY);
          human.position.x = leftRight;
          human.position.z = humanPos;
          // Dog chases
          if (dogPos < humanPos - 1) dogPos += speed * 1.2;
          dog.position.z = dogPos;
          // Progress
          setProgress(Math.min(1, (humanPos + 5) / 15));
          // Win/lose
          if (humanPos >= 10) { setWin(true); finished = true; setTimeout(() => setGameOver(true), 1200); }
          if (dogPos >= humanPos - 0.5) { setWin(false); finished = true; setTimeout(() => setGameOver(true), 1200); }
        }
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      }
      animate();
    }
    init();
    return () => {
      if (renderer) renderer.dispose();
      if (mountRef.current && mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);
      cancelAnimationFrame(animId);
    };
    // eslint-disable-next-line
  }, []);

  // Move handler
  function move(action: string) {
    if (gameOver) return;
    if (action === 'left') leftRight = Math.max(-2, leftRight - 1);
    if (action === 'right') leftRight = Math.min(2, leftRight + 1);
    if (action === 'jump' && !jumping) { jumping = true; jumpY = 0; }
    if (action === 'down') { /* could add duck animation */ }
    if (action === 'run') running = true; setTimeout(() => { running = false; }, 1200);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">Escape the Dog!</h1>
      <p className="text-lg text-muted-foreground mb-2">Say: <b>left</b>, <b>right</b>, <b>jump</b>, <b>down</b>, or <b>run</b> to control the human!</p>
      <div ref={mountRef} className="mx-auto mb-4 border-2 border-primary rounded-lg" style={{ width: 400, height: 300, background: '#e0e7ef' }} />
      <div className="w-full max-w-md mx-auto mb-2">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 transition-all" style={{ width: `${progress * 100}%` }}></div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Progress to Home</div>
      </div>
      <div className="text-md font-semibold mt-2">Heard: <span className="text-primary">{heard}</span></div>
      {gameOver && (
        <div className={`text-2xl font-bold mb-4 animate-bounce ${win ? 'text-green-500' : 'text-red-500'}`}>{win ? 'You reached home! 🏠🎉' : 'The dog caught you! 🐶😱'}</div>
      )}
      <Button asChild className="mt-4">
        <Link href="/learn/games">Back to Games</Link>
      </Button>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 