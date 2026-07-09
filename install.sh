#!/bin/bash

# ================================================
# NEXUS SOCIAL MEDIA PLATFORM - INSTALLER
# For Linux and macOS
# ================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "================================================"
echo " NEXUS SOCIAL MEDIA PLATFORM - INSTALLER"
echo "================================================"
echo ""

# ============================================
# STEP 1: Check Node.js
# ============================================
echo -e "${BLUE}[1/7]${NC} Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js is NOT installed!${NC}"
    echo -e "${RED}Please install Node.js from: https://nodejs.org/${NC}"
    echo -e "${RED}Then run this script again.${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}[OK]${NC} Node.js is installed (Version: $NODE_VERSION)"

# ============================================
# STEP 2: Check PostgreSQL
# ============================================
echo ""
echo -e "${BLUE}[2/7]${NC} Checking PostgreSQL installation..."
if ! command -v psql &> /dev/null; then
    echo -e "${RED}[ERROR] PostgreSQL is NOT installed!${NC}"
    echo -e "${RED}Please install PostgreSQL from: https://www.postgresql.org/download/${NC}"
    read -p "Would you like to continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting..."
        exit 1
    fi
    SKIP_POSTGRES=1
else
    PG_VERSION=$(psql --version)
    echo -e "${GREEN}[OK]${NC} PostgreSQL is installed ($PG_VERSION)"
fi

# ============================================
# STEP 3: PostgreSQL Setup
# ============================================
if [ -z "$SKIP_POSTGRES" ]; then
    echo ""
    echo -e "${BLUE}[3/7]${NC} PostgreSQL Database Setup..."
    echo ""

    read -p "Enter PostgreSQL host (default: localhost): " DB_HOST
    DB_HOST=${DB_HOST:-localhost}
    
    read -p "Enter PostgreSQL port (default: 5432): " DB_PORT
    DB_PORT=${DB_PORT:-5432}
    
    read -p "Enter PostgreSQL username (default: postgres): " DB_USER
    DB_USER=${DB_USER:-postgres}
    
    read -sp "Enter PostgreSQL password (default: postgres): " DB_PASS
    echo ""
    DB_PASS=${DB_PASS:-postgres}
    
    read -p "Enter database name (default: social_media): " DB_NAME
    DB_NAME=${DB_NAME:-social_media}

    echo ""
    echo "Creating database '$DB_NAME'..."
    
    # Try to create database
    if PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;" > /dev/null 2>&1; then
        echo -e "${GREEN}[OK]${NC} Database '$DB_NAME' created successfully!"
    else
        echo -e "${YELLOW}[INFO]${NC} Database '$DB_NAME' might already exist or connection issue"
        echo -e "${YELLOW}[INFO]${NC} Continuing anyway..."
    fi
else
    DB_HOST="localhost"
    DB_PORT="5432"
    DB_USER="postgres"
    DB_PASS="postgres"
    DB_NAME="social_media"
fi

# ============================================
# STEP 4: NPM Install
# ============================================
echo ""
echo -e "${BLUE}[4/7]${NC} Installing NPM dependencies..."
echo "This may take a few minutes..."

npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} Error installing dependencies!"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Dependencies installed successfully!"

# ============================================
# STEP 5: Environment Setup
# ============================================
echo ""
echo -e "${BLUE}[5/7]${NC} Setting up environment file..."

if [ -f ".env" ]; then
    echo -e "${YELLOW}[INFO]${NC} .env file already exists"
    read -p "Overwrite? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}[INFO]${NC} Keeping existing .env file"
    else
        CREATE_ENV=1
    fi
else
    CREATE_ENV=1
fi

if [ "$CREATE_ENV" = "1" ]; then
    echo "Creating .env file..."
    
    RANDOM_SECRET="nexus-secret-$(date +%s)-$RANDOM"
    
    cat > .env << EOF
# Database
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

# NextAuth
NEXTAUTH_SECRET="${RANDOM_SECRET}"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (optional - for image uploads)
# CLOUDINARY_CLOUD_NAME=""
# CLOUDINARY_API_KEY=""
# CLOUDINARY_API_SECRET=""
EOF

    echo -e "${GREEN}[OK]${NC} .env file created!"
fi

# ============================================
# STEP 6: Prisma Setup
# ============================================
echo ""
echo -e "${BLUE}[6/7]${NC} Setting up Prisma ORM..."

echo "Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} Error generating Prisma Client!"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Prisma Client generated!"

echo "Pushing database schema..."
npx prisma db push
if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} Error pushing database schema!"
    echo -e "${RED}Make sure PostgreSQL is running and credentials are correct${NC}"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Database schema pushed!"

# ============================================
# STEP 7: Complete
# ============================================
echo ""
echo "================================================"
echo " INSTALLATION COMPLETE!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "================================================"
echo ""

read -p "Start development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting server..."
    echo "Press Ctrl+C to stop"
    echo ""
    npm run dev
fi
