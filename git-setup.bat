@echo off
echo Configuring Git user...
git config --global user.name "DineshWebDev2003"
git config --global user.email "dineshmahi02@gmail.com"

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: TN Happy Kids Learning Platform"

echo Adding GitHub remote...
git remote add origin https://github.com/DineshWebDev2003/tn-happy-kids.git

echo.
echo Before pushing to GitHub, please:
echo 1. Create a repository named 'tn-happy-kids' at https://github.com/new
echo 2. Generate a Personal Access Token at https://github.com/settings/tokens
echo   - Click "Generate new token (classic)"
echo   - Note: "TN Happy Kids Development"
echo   - Select "repo" scope
echo   - Click "Generate token"
echo   - Copy the token for use when pushing
echo.
echo Then run: git push -u origin main
echo.
echo When prompted for password, use your GitHub Personal Access Token
echo.
pause 