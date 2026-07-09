#!/bin/bash
# ============================================
# NEXUS SOCIAL MEDIA - VERKEL DEPLOY SCRIPT
# ============================================

echo "🚀 Deploying Nexus Social Media to Vercel..."
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (interactive)
echo "⚠️  Please login to Vercel if prompted..."
vercel login

# Deploy to preview
echo ""
echo "📤 Deploying to Vercel Preview..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy your deployment URL"
echo "2. Update NEXTAUTH_URL environment variable in Vercel Dashboard"
echo "3. Redeploy if needed"
