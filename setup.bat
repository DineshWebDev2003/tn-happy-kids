@echo off
echo Installing dependencies...
call npm install

echo Creating necessary directories...
mkdir "public\images" 2>nul

echo Setup complete! You can now run 'npm start' to start the development server.
pause 