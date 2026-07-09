@echo off
title Nexus Social Media - Development Server
color 0A

echo.
echo  ================================================
echo   NEXUS SOCIAL MEDIA - START SERVER
echo  ================================================
echo.

echo [INFO] Checking environment setup...
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed!
    echo [INFO] Please run 'install.bat' first
    pause
    exit /b 1
)

:: Check if .env exists
if not exist ".env" (
    echo [ERROR] Environment file not found!
    echo [INFO] Please run 'install.bat' first
    pause
    exit /b 1
)

:: Check PostgreSQL connection
echo [INFO] Checking database connection...
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:5432' -TimeoutSec 2 -UseBasicParsing | Out-Null; Write-Host '[OK] PostgreSQL might be running' } catch { Write-Host '[WARNING] Cannot verify PostgreSQL status' }" >nul 2>&1

echo.
echo  Starting development server...
echo  URL: http://localhost:3000
echo  Press Ctrl+C to stop
echo.
echo  ================================================
echo.

npm run dev

pause
