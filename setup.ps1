# Food Website - Quick Start Script for Windows PowerShell

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Food Website - Installation Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit
}
Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green

# Check .env file
Write-Host ""
Write-Host "Checking .env configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Update .env with your MongoDB connection details:" -ForegroundColor Cyan
    Write-Host "1. For MongoDB Atlas:" -ForegroundColor White
    Write-Host "   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodDB" -ForegroundColor Gray
    Write-Host "2. For Local MongoDB:" -ForegroundColor White
    Write-Host "   MONGODB_URI=mongodb://localhost:27017/foodDB" -ForegroundColor Gray
} else {
    Write-Host "✗ .env file not found. Creating .env..." -ForegroundColor Yellow
    @"
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/foodDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
"@ | Out-File -Encoding UTF8 ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env with your MongoDB URI and JWT_SECRET" -ForegroundColor White
Write-Host "2. Run: npm start" -ForegroundColor Yellow
Write-Host "3. Open: http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ready to start? Run: npm start" -ForegroundColor Green
Write-Host ""
