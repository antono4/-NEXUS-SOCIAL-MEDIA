# ================================================
# NEXUS SOCIAL MEDIA PLATFORM - INSTALLER
# PowerShell Script (Windows)
# ================================================

$ErrorActionPreference = "Stop"

$Green = "`e[0;32m"
$Red = "`e[0;31m"
$Yellow = "`e[1;33m"
$Blue = "`e[0;34m"
$Reset = "`e[0m"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " NEXUS SOCIAL MEDIA PLATFORM - INSTALLER" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================
# STEP 1: Check Node.js
# ============================================
Write-Host "${Blue}[1/7]${Reset} Checking Node.js installation..."

try {
    $nodeVersion = node --version
    Write-Host "${Green}[OK]${Reset} Node.js is installed (Version: $nodeVersion)"
} catch {
    Write-Host "${Red}[ERROR] Node.js is NOT installed!${Reset}"
    Write-Host "${Red}Please install Node.js from: https://nodejs.org/${Reset}"
    Read-Host "Press Enter to exit"
    exit 1
}

# ============================================
# STEP 2: Check PostgreSQL
# ============================================
Write-Host ""
Write-Host "${Blue}[2/7]${Reset} Checking PostgreSQL installation..."

try {
    $pgVersion = psql --version
    Write-Host "${Green}[OK]${Reset} PostgreSQL is installed ($pgVersion)"
    $skipPostgres = $false
} catch {
    Write-Host "${Yellow}[WARNING]${Reset} PostgreSQL is NOT installed!"
    Write-Host "${Yellow}Please install PostgreSQL from: https://www.postgresql.org/download/windows/${Reset}"
    $response = Read-Host "Would you like to continue anyway? (y/n)"
    if ($response -ne "y") {
        Write-Host "Exiting..."
        exit 1
    }
    $skipPostgres = $true
}

# ============================================
# STEP 3: PostgreSQL Setup
# ============================================
if (-not $skipPostgres) {
    Write-Host ""
    Write-Host "${Blue}[3/7]${Reset} PostgreSQL Database Setup..."
    Write-Host ""

    $dbHost = Read-Host "Enter PostgreSQL host (default: localhost)"
    $dbHost = if ($dbHost) { $dbHost } else { "localhost" }
    
    $dbPort = Read-Host "Enter PostgreSQL port (default: 5432)"
    $dbPort = if ($dbPort) { $dbPort } else { "5432" }
    
    $dbUser = Read-Host "Enter PostgreSQL username (default: postgres)"
    $dbUser = if ($dbUser) { $dbUser } else { "postgres" }
    
    $dbPass = Read-Host "Enter PostgreSQL password (default: postgres)"
    $dbPass = if ($dbPass) { $dbPass } else { "postgres" }
    
    $dbName = Read-Host "Enter database name (default: social_media)"
    $dbName = if ($dbName) { $dbName } else { "social_media" }

    Write-Host ""
    Write-Host "Creating database '$dbName'..."

    $env:PGPASSWORD = $dbPass
    try {
        psql -h $dbHost -p $dbPort -U $dbUser -c "CREATE DATABASE $dbName;" 2>$null
        Write-Host "${Green}[OK]${Reset} Database '$dbName' created successfully!"
    } catch {
        Write-Host "${Yellow}[INFO]${Reset} Database '$dbName' might already exist or connection issue"
        Write-Host "${Yellow}[INFO]${Reset} Continuing anyway..."
    }
} else {
    $dbHost = "localhost"
    $dbPort = "5432"
    $dbUser = "postgres"
    $dbPass = "postgres"
    $dbName = "social_media"
}

# ============================================
# STEP 4: NPM Install
# ============================================
Write-Host ""
Write-Host "${Blue}[4/7]${Reset} Installing NPM dependencies..."
Write-Host "This may take a few minutes..."

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}[ERROR]${Reset} Error installing dependencies!"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "${Green}[OK]${Reset} Dependencies installed successfully!"

# ============================================
# STEP 5: Environment Setup
# ============================================
Write-Host ""
Write-Host "${Blue}[5/7]${Reset} Setting up environment file..."

if (Test-Path ".env") {
    Write-Host "${Yellow}[INFO]${Reset} .env file already exists"
    $response = Read-Host "Overwrite? (y/n)"
    if ($response -ne "y") {
        Write-Host "${Yellow}[INFO]${Reset} Keeping existing .env file"
    } else {
        $createEnv = $true
    }
} else {
    $createEnv = $true
}

if ($createEnv) {
    Write-Host "Creating .env file..."
    
    $randomSecret = "nexus-secret-$(Get-Date -Format 'yyyyMMddHHmmss')-$(Get-Random)"
    
    @"
# Database
DATABASE_URL="postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=public"

# NextAuth
NEXTAUTH_SECRET="${randomSecret}"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (optional - for image uploads)
# CLOUDINARY_CLOUD_NAME=""
# CLOUDINARY_API_KEY=""
# CLOUDINARY_API_SECRET=""
"@ | Out-File -FilePath ".env" -Encoding UTF8

    Write-Host "${Green}[OK]${Reset} .env file created!"
}

# ============================================
# STEP 6: Prisma Setup
# ============================================
Write-Host ""
Write-Host "${Blue}[6/7]${Reset} Setting up Prisma ORM..."

Write-Host "Generating Prisma Client..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}[ERROR]${Reset} Error generating Prisma Client!"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "${Green}[OK]${Reset} Prisma Client generated!"

Write-Host "Pushing database schema..."
npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}[ERROR]${Reset} Error pushing database schema!"
    Write-Host "${Red}Make sure PostgreSQL is running and credentials are correct${Reset}"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "${Green}[OK]${Reset} Database schema pushed!"

# ============================================
# STEP 7: Complete
# ============================================
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " INSTALLATION COMPLETE!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Make sure PostgreSQL is running"
Write-Host "2. Run: npm run dev"
Write-Host "3. Open: http://localhost:3000"
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Start development server now? (y/n)"
if ($response -eq "y") {
    Write-Host ""
    Write-Host "Starting server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop"
    Write-Host ""
    npm run dev
}
