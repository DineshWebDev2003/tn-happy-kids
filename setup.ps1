# Run this script as administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "Installing dependencies..."
npm install

Write-Host "Creating necessary directories..."
New-Item -ItemType Directory -Force -Path "public/images"

Write-Host "Setup complete! You can now run 'npm start' to start the development server." 