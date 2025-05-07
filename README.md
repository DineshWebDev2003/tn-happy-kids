# TN Happy Kids Learning Platform

An interactive educational platform for children featuring games, storytelling, and safety lessons with a friendly robot teacher.

## Features

- Interactive learning games with a robot teacher
- Alphabet learning with animations
- Math games with visual aids
- Safety education (good touch, bad touch) in a child-friendly way
- Interactive storytelling
- Progress tracking with points system
- User authentication with Firebase
- Beautiful, kid-friendly UI design

## Tech Stack

- React 18
- TypeScript
- Material-UI
- Framer Motion for animations
- Firebase Authentication
- React Router for navigation
- Three.js for 3D animations

## Getting Started

### Option 1: Using Node.js Command Prompt (Recommended)
1. Open "Node.js Command Prompt" from your Start Menu
2. Navigate to the project directory:
```bash
cd path/to/tn-happy-kids
```
3. Install dependencies:
```bash
npm install
```

### Option 2: Using Command Prompt (cmd.exe)
1. Double-click `setup.bat` in the project directory
   OR
2. Open Command Prompt and run:
```bash
cd path/to/tn-happy-kids
setup.bat
```

### Option 3: Using PowerShell (Requires Admin Rights)
1. Open PowerShell as Administrator
2. Run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```
3. Then in your project directory:
```powershell
.\setup.ps1
```

### After Setup
1. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Email/Password authentication
   - Copy your Firebase configuration
   - Update the configuration in `src/config/firebase.ts`

2. Add required images in `public/images/`:
   - alphabet-game.png
   - math-game.png
   - safety-game.png
   - story-game.png
   - robo-teacher.png
   - apple.png
   - ball.png
   - cat.png
   - dog.png
   - elephant.png

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
  ├── components/        # Reusable components
  │   ├── games/        # Game components
  │   └── Navbar.tsx    # Navigation bar
  ├── contexts/         # React contexts
  │   └── AuthContext.tsx
  ├── config/           # Configuration files
  │   └── firebase.ts
  ├── pages/           # Page components
  │   ├── Home.tsx
  │   ├── Games.tsx
  │   └── Login.tsx
  └── App.tsx         # Main app component
```

## Troubleshooting

### PowerShell Execution Policy Error
If you see an error about scripts being disabled:
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force`
3. Try the command again

### Missing Images
The application will show placeholders for missing images. Add the required images to the `public/images` directory to see the actual content.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 