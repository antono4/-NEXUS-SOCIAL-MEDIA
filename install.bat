@echo off
chcp 65001 >nul
title Nexus Social Media - Installer
color 0A

echo.
echo  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ ███████╗██████╗ 
echo  ██╔══██╗██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
echo  ██████╔╝██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██████╔╝█████╗  ██████╔╝
echo  ██╔═══╝ ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██╗██╔══╝  ██╔══██╗
echo  ██║     ╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║
echo  ╚═╝      ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
echo.
echo  ═══════════════════════════════════════════════════════════════════════════════════
echo                           SOCIAL MEDIA PLATFORM INSTALLER
echo  ═══════════════════════════════════════════════════════════════════════════════════
echo.

:: ============================================
:: CHECK ADMINISTRATOR PRIVILEGES
:: ============================================
echo [INFO] Checking administrator privileges...
net session >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Running as administrator
) else (
    echo [INFO] Not running as administrator - some features may be limited
)
echo.

:: ============================================
:: STEP 1: CHECK NODE.JS
:: ============================================
echo ═══════════════════════════════════════════════════════════════════════════════════
echo STEP 1: Checking Node.js Installation
echo ═══════════════════════════════════════════════════════════════════════════════════

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js is NOT installed!
    echo.
    echo  Please install Node.js first:
    echo  1. Go to https://nodejs.org/
    echo  2. Download and install the LTS version
    echo  3. Restart your computer
    echo  4. Run this installer again
    echo.
    pause
    exit /b 1
)

for /f "delims=" %%i in ('node --version') do set NODE_VERSION=%%i
echo  [OK] Node.js is installed
echo  [INFO] Version: %NODE_VERSION%

for /f "delims=" %%i in ('npm --version') do set NPM_VERSION=%%i
echo  [INFO] NPM Version: %NPM_VERSION%
echo.

:: ============================================
:: STEP 2: CHECK POSTGRESQL
:: ============================================
echo ═══════════════════════════════════════════════════════════════════════════════════
echo STEP 2: Checking PostgreSQL Installation
echo ═══════════════════════════════════════════════════════════════════════════════════

where psql >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [WARNING] PostgreSQL command-line tools not found in PATH
    echo.
    echo  This may mean:
    echo  - PostgreSQL is not installed
    echo  - psql is not added to system PATH
    echo.
    echo  To install PostgreSQL:
    echo  1. Download from: https://www.postgresql.org/download/windows/
    echo  2. During installation, make sure to check "Add to PATH"
    echo.
    
    set /p SKIP_PG="  Continue without PostgreSQL setup? (y/n): "
    if /i not "%SKIP_PG%"=="y" (
        echo.
        echo  Exiting installer...
        pause
        exit /b 1
    )
    
    set POSTGRES_SKIP=1
    echo.
    echo  [INFO] Continuing without PostgreSQL...
) else (
    for /f "delims=" %%i in ('psql --version') do set PG_VERSION=%%i
    echo  [OK] PostgreSQL is installed
    echo  [INFO] Version: %PG_VERSION%
    set POSTGRES_SKIP=0
)
echo.

:: ============================================
:: STEP 3: POSTGRESQL CONFIGURATION
:: ============================================
if "%POSTGRES_SKIP%"=="0" (
    echo ═══════════════════════════════════════════════════════════════════════════════════
    echo STEP 3: PostgreSQL Database Configuration
    echo ═══════════════════════════════════════════════════════════════════════════════════
    echo.
    echo  Please enter your PostgreSQL credentials:
    echo  (Press Enter to use default values in brackets)
    echo.

    set /p DB_HOST="  Host [localhost]: " 
    if "%DB_HOST%"=="" set "DB_HOST=localhost"
    
    set /p DB_PORT="  Port [5432]: " 
    if "%DB_PORT%"=="" set "DB_PORT=5432"
    
    set /p DB_USER="  Username [postgres]: " 
    if "%DB_USER%"=="" set "DB_USER=postgres"
    
    :get_password
    set /p DB_PASS="  Password [postgres]: " 
    if "%DB_PASS%"=="" set "DB_PASS=postgres"
    
    set /p DB_NAME="  Database Name [social_media]: " 
    if "%DB_NAME%"=="" set "DB_NAME=social_media"

    echo.
    echo  Testing database connection...
    
    PGPASSWORD=%DB_PASS% psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "SELECT 1;" >nul 2>&1
    if %errorlevel% neq 0 (
        echo.
        echo  [ERROR] Cannot connect to PostgreSQL!
        echo.
        echo  Possible reasons:
        echo  - Wrong username or password
        echo  - PostgreSQL service is not running
        echo  - Host/Port is incorrect
        echo.
        echo  To start PostgreSQL service:
        echo  - Press Win+R, type services.msc
        echo  - Find "postgresql-x64-??"
        echo  - Right-click, Start
        echo.
        
        set /p RETRY="  Try again? (y/n): "
        if /i "%RETRY%"=="y" goto :get_password
        if /i "%RETRY%"=="n" (
            echo.
            echo  [INFO] Continuing without PostgreSQL setup...
            set POSTGRES_SKIP=1
        )
    ) else (
        echo  [OK] Database connection successful!
        
        echo.
        echo  Creating database '%DB_NAME%'...
        PGPASSWORD=%DB_PASS% psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "CREATE DATABASE %DB_NAME%;" >nul 2>&1
        if %errorlevel% equ 0 (
            echo  [OK] Database '%DB_NAME%' created!
        ) else (
            echo  [INFO] Database might already exist, continuing...
        )
    )
    echo.
)

:: ============================================
:: STEP 4: NPM INSTALL
:: ============================================
echo ═══════════════════════════════════════════════════════════════════════════════════
echo STEP 4: Installing NPM Dependencies
echo ═══════════════════════════════════════════════════════════════════════════════════
echo.
echo  [INFO] Installing dependencies...
echo  [INFO] This may take 5-10 minutes depending on your internet connection...
echo.

cd /d "%~dp0"

call npm install
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Failed to install npm dependencies!
    echo.
    echo  Try these solutions:
    echo  1. Delete node_modules folder and package-lock.json
    echo  2. Run: npm cache clean --force
    echo  3. Run this installer again
    echo.
    pause
    exit /b 1
)

echo.
echo  [OK] Dependencies installed successfully!
echo.

:: ============================================
:: STEP 5: ENVIRONMENT SETUP
:: ============================================
echo ═══════════════════════════════════════════════════════════════════════════════════
echo STEP 5: Environment Configuration
echo ═══════════════════════════════════════════════════════════════════════════════════
echo.

if exist ".env" (
    echo  [INFO] .env file already exists
    set /p OVERWRITE="  Overwrite existing .env file? (y/n): "
    if /i not "%OVERWRITE%"=="y" (
        echo  [INFO] Keeping existing .env file
        goto :prisma_setup
    )
)

echo  [INFO] Creating .env configuration file...

:: Generate random secret
set RANDOM_NUM=%RANDOM%
set TIMESTAMP=%DATE:~-4%%DATE:~4,2%%DATE:~7,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
set RANDOM_SECRET=nexus-secret-%TIMESTAMP%-%RANDOM_NUM%

(
echo # ============================================================
echo # Nexus Social Media Platform - Environment Configuration
echo # Generated by install.bat
echo # ============================================================
echo.
echo # Database Configuration
echo DATABASE_URL="postgresql://%DB_USER%:%DB_PASS%@%DB_HOST%:%DB_PORT%/%DB_NAME%?schema=public"
echo.
echo # NextAuth Configuration
echo NEXTAUTH_SECRET="%RANDOM_SECRET%"
echo NEXTAUTH_URL="http://localhost:3000"
echo.
echo # Optional: Cloudinary for Image Uploads
echo # Get your credentials from: https://cloudinary.com/
echo # CLOUDINARY_CLOUD_NAME=""
echo # CLOUDINARY_API_KEY=""
echo # CLOUDINARY_API_SECRET=""
) > .env

echo  [OK] .env file created!
echo.

:: ============================================
:: STEP 6: PRISMA SETUP
:: ============================================
:prisma_setup
echo ═══════════════════════════════════════════════════════════════════════════════════
echo STEP 6: Prisma ORM Setup
echo ═══════════════════════════════════════════════════════════════════════════════════
echo.

echo  [INFO] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Failed to generate Prisma Client!
    echo.
    pause
    exit /b 1
)
echo  [OK] Prisma Client generated!
echo.

if "%POSTGRES_SKIP%"=="0" (
    echo  [INFO] Pushing database schema...
    call npx prisma db push
    if %errorlevel% neq 0 (
        echo.
        echo  [WARNING] Failed to push database schema!
        echo  [INFO] Make sure PostgreSQL is running and credentials are correct
        echo.
        
        set /p CONTINUE="  Continue anyway? (y/n): "
        if /i not "%CONTINUE%"=="y" (
            pause
            exit /b 1
        )
    ) else (
        echo  [OK] Database schema pushed successfully!
    )
) else (
    echo  [INFO] Skipping database push (PostgreSQL not configured)
)
echo.

:: ============================================
:: STEP 7: COMPLETION
:: ============================================
echo ═══════════════════════════════════════════════════════════════════════════════════
echo                           INSTALLATION COMPLETE!
echo ═══════════════════════════════════════════════════════════════════════════════════
echo.
echo  [OK] Node.js installed (v%NODE_VERSION%)
if "%POSTGRES_SKIP%"=="0" (
    echo  [OK] PostgreSQL configured
    echo  [OK] Database '%DB_NAME%' ready
)
echo  [OK] NPM dependencies installed
echo  [OK] Prisma ORM configured
echo  [OK] Environment file created
echo.
echo  ═══════════════════════════════════════════════════════════════════════════════════
echo  NEXT STEPS:
echo  ═══════════════════════════════════════════════════════════════════════════════════
echo.
echo  1. Make sure PostgreSQL is running (if configured)
echo.
echo  2. Start the development server:
echo     - Double-click: start.bat
echo     - OR run: npm run dev
echo.
echo  3. Open your browser and go to:
echo     http://localhost:3000
echo.
echo  4. Create an account and start using Nexus!
echo.
echo  ═══════════════════════════════════════════════════════════════════════════════════
echo.

set /p START_SERVER="  Start development server now? (y/n): "
if /i "%START_SERVER%"=="y" (
    echo.
    echo  [INFO] Starting development server...
    echo  [INFO] Press Ctrl+C to stop
    echo.
    call npm run dev
)

echo.
echo  Thank you for installing Nexus Social Media Platform!
echo.
pause
