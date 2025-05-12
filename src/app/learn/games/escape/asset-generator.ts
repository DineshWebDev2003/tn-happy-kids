// Asset generator for the School Runner game
// This script provides functions to generate placeholder images when external assets aren't available

/**
 * Generates a player character (girl) image
 */
export function generatePlayerImage(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 60;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Head
  ctx.fillStyle = '#FFDBAC'; // Skin tone
  ctx.beginPath();
  ctx.arc(30, 20, 15, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair
  ctx.fillStyle = '#8B4513'; // Brown hair
  ctx.beginPath();
  ctx.ellipse(30, 15, 17, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFDBAC';
  ctx.beginPath();
  ctx.ellipse(30, 20, 15, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Face
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(25, 18, 2, 0, Math.PI * 2); // Left eye
  ctx.arc(35, 18, 2, 0, Math.PI * 2); // Right eye
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(30, 25, 5, 0.1, Math.PI - 0.1);
  ctx.stroke();
  
  // Body
  ctx.fillStyle = '#FF9AA2'; // Pink dress
  ctx.fillRect(20, 35, 20, 25);
  ctx.fillRect(15, 35, 30, 5);
  
  // Arms
  ctx.fillStyle = '#FFDBAC';
  ctx.fillRect(15, 35, 5, 15); // Left arm
  ctx.fillRect(40, 35, 5, 15); // Right arm
  
  // Legs
  ctx.fillStyle = '#FFDBAC';
  ctx.fillRect(25, 60, 5, 15); // Left leg
  ctx.fillRect(30, 60, 5, 15); // Right leg
  
  // Shoes
  ctx.fillStyle = '#000000';
  ctx.fillRect(23, 75, 7, 5); // Left shoe
  ctx.fillRect(30, 75, 7, 5); // Right shoe
  
  // Backpack
  ctx.fillStyle = '#A0C4FF'; // Blue backpack
  ctx.fillRect(20, 35, 20, 7);
  ctx.fillRect(15, 35, 30, 3);
  
  return canvas.toDataURL();
}

/**
 * Generates a dog image
 */
export function generateDogImage(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 70;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Body
  ctx.fillStyle = '#C68642'; // Brown
  ctx.fillRect(20, 15, 30, 20);
  
  // Head
  ctx.fillStyle = '#8B4513'; // Darker brown for head
  ctx.beginPath();
  ctx.ellipse(45, 15, 15, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Tail
  ctx.fillStyle = '#C68642';
  ctx.beginPath();
  ctx.moveTo(20, 25);
  ctx.lineTo(10, 15);
  ctx.lineTo(15, 25);
  ctx.closePath();
  ctx.fill();
  
  // Ears
  ctx.fillStyle = '#8B4513';
  ctx.beginPath();
  ctx.moveTo(45, 5);
  ctx.lineTo(40, 15);
  ctx.lineTo(50, 15);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(55, 5);
  ctx.lineTo(50, 15);
  ctx.lineTo(60, 15);
  ctx.closePath();
  ctx.fill();
  
  // Legs
  ctx.fillStyle = '#C68642';
  ctx.fillRect(25, 35, 5, 10); // Front leg
  ctx.fillRect(40, 35, 5, 10); // Back leg
  ctx.fillRect(30, 35, 5, 10); // Middle leg
  ctx.fillRect(45, 35, 5, 10); // Last leg
  
  // Eyes
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(40, 13, 2, 0, Math.PI * 2);
  ctx.arc(50, 13, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Nose
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(55, 15, 3, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas.toDataURL();
}

/**
 * Generates a background image for the endless runner
 */
export function generateBackgroundImage(width = 800, height = 400): string {
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
  
  // Ground/Road
  ctx.fillStyle = '#8B4513'; // Brown dirt
  ctx.fillRect(0, height - 30, width, 30);
  
  // Road
  ctx.fillStyle = '#A9A9A9'; // Gray road
  ctx.fillRect(0, height - 30, width, 20);
  
  // Road markings
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < width; i += 50) {
    ctx.fillRect(i, height - 20, 30, 5);
  }
  
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
  
  // Distant buildings (school)
  ctx.fillStyle = '#FF9AA2'; // Pink building
  ctx.fillRect(width - 300, height - 150, 200, 120);
  
  // School roof
  ctx.fillStyle = '#A0C4FF'; // Blue roof
  ctx.beginPath();
  ctx.moveTo(width - 320, height - 150);
  ctx.lineTo(width - 200, height - 200);
  ctx.lineTo(width - 80, height - 150);
  ctx.closePath();
  ctx.fill();
  
  // School windows
  ctx.fillStyle = '#FFC6FF'; // Light purple
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillRect(width - 280 + i * 70, height - 140 + j * 50, 50, 40);
    }
  }
  
  // School door
  ctx.fillStyle = '#BDB2FF'; // Light purple
  ctx.fillRect(width - 230, height - 60, 60, 50);
  ctx.fillStyle = '#000000';
  ctx.fillRect(width - 225, height - 55, 25, 45);
  ctx.fillRect(width - 200, height - 55, 25, 45);
  
  // School flag
  ctx.fillStyle = '#000000';
  ctx.fillRect(width - 200, height - 210, 5, 30);
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(width - 195, height - 210, 20, 15);
  
  // Sidewalk
  ctx.fillStyle = '#D3D3D3';
  ctx.fillRect(0, height - 10, width, 10);
  
  return canvas.toDataURL();
}

/**
 * Generates images for the obstacles
 */
export function generateObstacleImage(type: 'puddle' | 'bike' | 'vendor' | 'trash_can'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 70;
  canvas.height = 70;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  switch (type) {
    case 'puddle':
      // Puddle
      ctx.fillStyle = '#4682B4'; // Steel blue
      ctx.beginPath();
      ctx.ellipse(35, 50, 30, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Water ripples
      ctx.strokeStyle = '#ADD8E6';
      ctx.beginPath();
      ctx.ellipse(35, 50, 20, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(35, 50, 10, 5, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 'bike':
      // Bike frame
      ctx.strokeStyle = '#FF0000'; // Red
      ctx.lineWidth = 3;
      
      // Wheels
      ctx.beginPath();
      ctx.arc(20, 50, 15, 0, Math.PI * 2); // Front wheel
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(50, 50, 15, 0, Math.PI * 2); // Back wheel
      ctx.stroke();
      
      // Frame
      ctx.beginPath();
      ctx.moveTo(20, 50); // Front wheel center
      ctx.lineTo(35, 30); // Handlebar joint
      ctx.lineTo(50, 50); // Back wheel center
      ctx.lineTo(35, 50); // Bottom bracket
      ctx.closePath();
      ctx.stroke();
      
      // Handlebar
      ctx.beginPath();
      ctx.moveTo(35, 30);
      ctx.lineTo(30, 25);
      ctx.stroke();
      
      // Seat
      ctx.fillStyle = 'black';
      ctx.fillRect(42, 30, 10, 3);
      break;
      
    case 'vendor':
      // Cart base
      ctx.fillStyle = '#FF7F50'; // Coral color
      ctx.fillRect(10, 40, 50, 25);
      
      // Wheels
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(15, 65, 5, 0, Math.PI * 2);
      ctx.arc(55, 65, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Cart top/awning
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.fillRect(5, 30, 60, 10);
      
      // Items on cart
      ctx.fillStyle = '#FF6347'; // Tomato
      ctx.beginPath();
      ctx.arc(20, 35, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.beginPath();
      ctx.arc(30, 35, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#7CFC00'; // Lawn Green
      ctx.beginPath();
      ctx.arc(40, 35, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#9370DB'; // Medium Purple
      ctx.beginPath();
      ctx.arc(50, 35, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'trash_can':
      // Trash can body
      ctx.fillStyle = '#808080'; // Gray
      ctx.fillRect(20, 20, 30, 40);
      
      // Lid
      ctx.fillStyle = '#A9A9A9'; // Dark Gray
      ctx.fillRect(15, 15, 40, 5);
      
      // Details
      ctx.strokeStyle = 'black';
      ctx.strokeRect(20, 20, 30, 40);
      ctx.beginPath();
      ctx.moveTo(30, 25);
      ctx.lineTo(30, 55);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(40, 25);
      ctx.lineTo(40, 55);
      ctx.stroke();
      break;
  }
  
  return canvas.toDataURL();
}

/**
 * Generates images for the collectibles
 */
export function generateCollectibleImage(type: 'pencil' | 'book' | 'notebook' | 'apple'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  switch (type) {
    case 'pencil':
      // Pencil body
      ctx.fillStyle = '#FFFF00'; // Yellow
      ctx.fillRect(5, 5, 30, 5);
      
      // Pencil point
      ctx.fillStyle = '#FFA500'; // Orange
      ctx.beginPath();
      ctx.moveTo(5, 5);
      ctx.lineTo(5, 10);
      ctx.lineTo(0, 7.5);
      ctx.closePath();
      ctx.fill();
      
      // Eraser
      ctx.fillStyle = '#FFC0CB'; // Pink
      ctx.fillRect(35, 5, 5, 5);
      
      // Pencil band
      ctx.fillStyle = '#000000';
      ctx.fillRect(30, 5, 5, 5);
      
      // Rotate to make it diagonal
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(Math.PI / 4);
      ctx.translate(-canvas.width/2, -canvas.height/2);
      break;
      
    case 'book':
      // Book cover
      ctx.fillStyle = '#0000FF'; // Blue
      ctx.fillRect(5, 5, 30, 30);
      
      // Book binding
      ctx.fillStyle = '#000000';
      ctx.fillRect(5, 5, 5, 30);
      
      // Book pages
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(10, 7, 23, 26);
      
      // Book details - lines of text
      ctx.fillStyle = '#000000';
      ctx.fillRect(15, 12, 15, 1);
      ctx.fillRect(15, 15, 15, 1);
      ctx.fillRect(15, 18, 15, 1);
      ctx.fillRect(15, 21, 10, 1);
      break;
      
    case 'notebook':
      // Notebook cover
      ctx.fillStyle = '#FF0000'; // Red
      ctx.fillRect(5, 5, 30, 35);
      
      // Spiral binding
      ctx.fillStyle = '#C0C0C0'; // Silver
      for (let i = 10; i <= 35; i += 5) {
        ctx.fillRect(5, i, 5, 2);
      }
      
      // Notebook pages
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(10, 7, 23, 31);
      
      // Notebook lines
      ctx.strokeStyle = '#ADD8E6'; // Light blue
      ctx.beginPath();
      for (let i = 12; i <= 35; i += 4) {
        ctx.moveTo(12, i);
        ctx.lineTo(30, i);
      }
      ctx.stroke();
      
      // Red margin
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.moveTo(15, 7);
      ctx.lineTo(15, 38);
      ctx.stroke();
      break;
      
    case 'apple':
      // Apple body
      ctx.fillStyle = '#FF0000'; // Red
      ctx.beginPath();
      ctx.arc(20, 25, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Apple stem
      ctx.fillStyle = '#8B4513'; // Brown
      ctx.fillRect(20, 5, 3, 10);
      
      // Apple leaf
      ctx.fillStyle = '#008000'; // Green
      ctx.beginPath();
      ctx.ellipse(25, 10, 7, 5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Apple highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(15, 20, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
  
  return canvas.toDataURL();
}

/**
 * Generates an image of a school (finish line)
 */
export function generateSchoolImage(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Main building
  ctx.fillStyle = '#FF9AA2'; // Pink
  ctx.fillRect(10, 30, 80, 70);
  
  // Roof
  ctx.fillStyle = '#A0C4FF'; // Blue
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.lineTo(50, 10);
  ctx.lineTo(100, 30);
  ctx.closePath();
  ctx.fill();
  
  // Windows
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(20, 40, 15, 15); // Top left
  ctx.fillRect(65, 40, 15, 15); // Top right
  ctx.fillRect(20, 65, 15, 15); // Bottom left
  ctx.fillRect(65, 65, 15, 15); // Bottom right
  
  // Window frames
  ctx.strokeStyle = '#0000FF';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 40, 15, 15);
  ctx.strokeRect(65, 40, 15, 15);
  ctx.strokeRect(20, 65, 15, 15);
  ctx.strokeRect(65, 65, 15, 15);
  
  // Door
  ctx.fillStyle = '#8B4513'; // Brown
  ctx.fillRect(40, 70, 20, 30);
  
  // Door knob
  ctx.fillStyle = '#FFD700'; // Gold
  ctx.beginPath();
  ctx.arc(55, 85, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // School sign
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(35, 50, 30, 10);
  ctx.fillStyle = '#000000';
  ctx.font = '8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SCHOOL', 50, 57);
  
  // Flag on top
  ctx.fillStyle = '#000000';
  ctx.fillRect(50, 9, 2, 15);
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.moveTo(52, 9);
  ctx.lineTo(65, 14);
  ctx.lineTo(52, 19);
  ctx.closePath();
  ctx.fill();
  
  // Steps
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(35, 100, 30, -5);
  ctx.fillRect(30, 95, 40, -5);
  
  return canvas.toDataURL();
} 