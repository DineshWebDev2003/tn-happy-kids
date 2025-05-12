// Helper functions to generate placeholder images for the 2D escape game
// These can be used directly within Canvas to create images when external assets fail to load

export function generatePlayerImage(width = 50, height = 50): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Body
  ctx.fillStyle = '#4a9eff'; // Blue
  ctx.fillRect(15, 20, 20, 20);
  
  // Head
  ctx.fillStyle = '#ffc83d'; // Yellow
  ctx.beginPath();
  ctx.arc(25, 15, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(22, 13, 2, 0, Math.PI * 2);
  ctx.arc(28, 13, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(25, 18, 4, 0, Math.PI);
  ctx.stroke();
  
  // Legs
  ctx.fillStyle = '#4a9eff';
  ctx.fillRect(18, 40, 5, 10);
  ctx.fillRect(27, 40, 5, 10);
  
  return canvas.toDataURL();
}

export function generateDogImage(width = 70, height = 50): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Body
  ctx.fillStyle = '#8B4513'; // Brown
  ctx.fillRect(20, 15, 30, 20);
  
  // Head
  ctx.fillStyle = '#A0522D'; // Darker brown
  ctx.beginPath();
  ctx.ellipse(45, 15, 15, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Tail
  ctx.fillStyle = '#8B4513';
  ctx.beginPath();
  ctx.moveTo(20, 25);
  ctx.lineTo(10, 15);
  ctx.lineTo(15, 25);
  ctx.closePath();
  ctx.fill();
  
  // Ears
  ctx.fillStyle = '#A0522D';
  ctx.beginPath();
  ctx.moveTo(45, 5);
  ctx.lineTo(40, 15);
  ctx.lineTo(50, 15);
  ctx.closePath();
  ctx.fill();
  
  // Legs
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(25, 35, 5, 10);
  ctx.fillRect(40, 35, 5, 10);
  
  // Eyes
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(50, 13, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Nose
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(55, 15, 3, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas.toDataURL();
}

export function generateTreeImage(width = 60, height = 80): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Trunk
  ctx.fillStyle = '#8B4513'; // Brown
  ctx.fillRect(25, 50, 10, 30);
  
  // Leaves
  ctx.fillStyle = '#228B22'; // Forest Green
  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(10, 50);
  ctx.lineTo(50, 50);
  ctx.closePath();
  ctx.fill();
  
  // More leaves
  ctx.fillStyle = '#006400'; // Darker green
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.lineTo(15, 45);
  ctx.lineTo(45, 45);
  ctx.closePath();
  ctx.fill();
  
  return canvas.toDataURL();
}

export function generateBackgroundImage(width = 800, height = 500): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#87CEEB'); // Sky blue
  gradient.addColorStop(1, '#E6F7FF'); // Lighter blue
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Grass
  ctx.fillStyle = '#7CFC00'; // Lawn Green
  ctx.fillRect(0, 350, width, 150);
  
  // Path
  ctx.fillStyle = '#DEB887'; // Burly Wood
  ctx.fillRect(width/2 - 50, 0, 100, height);
  ctx.fillStyle = '#D2B48C'; // Tan
  ctx.fillRect(width/2 - 40, 0, 80, height);
  
  // Sun
  ctx.fillStyle = '#FFD700'; // Gold
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Clouds
  ctx.fillStyle = 'white';
  for (let i = 0; i < 5; i++) {
    const x = 150 + i * 140;
    const y = 80 + (i % 2) * 50;
    const size = 30 + (i % 3) * 10;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x - size, y, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x, y - size/2, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Distant houses
  for (let i = 0; i < 3; i++) {
    const x = 200 + i * 200;
    const y = 300;
    
    // House base
    ctx.fillStyle = ['#FFB6C1', '#AFEEEE', '#FAFAD2'][i % 3]; // Pastel colors
    ctx.fillRect(x, y, 80, 50);
    
    // Roof
    ctx.fillStyle = '#8B0000'; // Dark Red
    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 40, y - 30);
    ctx.lineTo(x + 90, y);
    ctx.closePath();
    ctx.fill();
    
    // Door
    ctx.fillStyle = '#8B4513'; // Brown
    ctx.fillRect(x + 30, y + 20, 20, 30);
    
    // Windows
    ctx.fillStyle = '#ADD8E6'; // Light blue
    ctx.fillRect(x + 10, y + 10, 15, 15);
    ctx.fillRect(x + 55, y + 10, 15, 15);
  }
  
  return canvas.toDataURL();
}

export function generateHouseImage(width = 100, height = 100): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // House base
  ctx.fillStyle = '#f8f9fa'; // Light gray
  ctx.fillRect(10, 40, 80, 60);
  
  // Roof
  ctx.fillStyle = '#dc3545'; // Red
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.lineTo(50, 10);
  ctx.lineTo(100, 40);
  ctx.closePath();
  ctx.fill();
  
  // Door
  ctx.fillStyle = '#6c757d'; // Gray
  ctx.fillRect(40, 70, 20, 30);
  
  // Door knob
  ctx.fillStyle = '#ffc107'; // Yellow
  ctx.beginPath();
  ctx.arc(55, 85, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Windows
  ctx.fillStyle = '#add8e6'; // Light blue
  ctx.fillRect(20, 50, 15, 15);
  ctx.fillRect(65, 50, 15, 15);
  
  // Flag at the top
  ctx.fillStyle = '#28a745'; // Green
  ctx.fillRect(48, 11, 2, 15);
  ctx.fillStyle = '#007bff'; // Blue
  ctx.beginPath();
  ctx.moveTo(50, 11);
  ctx.lineTo(60, 14);
  ctx.lineTo(50, 17);
  ctx.closePath();
  ctx.fill();
  
  return canvas.toDataURL();
}

export function generatePowerupImage(type: 'speed' | 'shield', width = 30, height = 30): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Background circle
  ctx.fillStyle = type === 'speed' ? '#FF9500' : '#00BFFF';
  ctx.beginPath();
  ctx.arc(width/2, height/2, width/2 - 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width/2, height/2, width/2 - 3, 0, Math.PI * 2);
  ctx.stroke();
  
  if (type === 'speed') {
    // Lightning bolt
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(width/2 - 3, 7);
    ctx.lineTo(width/2 + 5, 15);
    ctx.lineTo(width/2 - 2, 16);
    ctx.lineTo(width/2 + 3, 23);
    ctx.lineTo(width/2 + 8, 14);
    ctx.lineTo(width/2, 14);
    ctx.lineTo(width/2 + 3, 7);
    ctx.closePath();
    ctx.fill();
  } else {
    // Shield
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(width/2, 7);
    ctx.lineTo(width/2 - 8, 10);
    ctx.lineTo(width/2 - 8, 18);
    ctx.lineTo(width/2, 23);
    ctx.lineTo(width/2 + 8, 18);
    ctx.lineTo(width/2 + 8, 10);
    ctx.closePath();
    ctx.fill();
  }
  
  return canvas.toDataURL();
} 