# 🚀 Quick Deployment Guide

This guide will help you deploy your 3D viewer to Vercel without needing to install dependencies locally.

## Option 1: Deploy Directly to Vercel (Recommended)

Vercel will automatically install dependencies and build your project in the cloud!

### Step 1: Push to GitHub

```bash
# Navigate to the optics-viewer directory
cd /Users/englund/.gemini/antigravity/scratch/optics-viewer

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: 3D viewer app"

# Create a new repository on GitHub (https://github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/optics-viewer.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository:**
   - Select `optics-viewer` from your GitHub repos
   - Click "Import"
5. **Configure (auto-detected):**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **Click "Deploy"**

That's it! Vercel will:
- ✅ Install all dependencies
- ✅ Build your project
- ✅ Deploy to a live URL
- ✅ Give you a shareable link like `https://optics-viewer.vercel.app`

### Step 3: Add Your 3D Model

After deployment:

1. **Export your Blender model** (see EXPORT_GUIDE.md)
2. **Add to your repo:**
   ```bash
   mkdir -p public/models
   cp /path/to/optics_table.glb public/models/
   git add public/models/optics_table.glb
   git commit -m "Add 3D model"
   git push
   ```
3. **Update main.js** (uncomment the GLTFLoader code)
4. **Push changes** - Vercel auto-deploys!

---

## Option 2: Deploy to Bolt.new

Bolt.new is even easier if you have an account!

1. **Go to [bolt.new](https://bolt.new)**
2. **Create new project**
3. **Upload your files** or connect to GitHub
4. **Click Deploy**

Bolt.new handles everything automatically and connects to StackBlitz for hosting.

---

## Option 3: Fix Local npm Issues (Optional)

If you want to run locally, fix npm permissions:

```bash
# Option A: Fix npm cache permissions
sudo chown -R $(whoami) ~/.npm

# Then try again
cd /Users/englund/.gemini/antigravity/scratch/optics-viewer
npm install
npm run dev
```

Or use a different package manager:

```bash
# Use yarn instead
npm install -g yarn
yarn install
yarn dev

# Or use pnpm
npm install -g pnpm
pnpm install
pnpm dev
```

---

## 🎯 Next Steps After Deployment

1. ✅ Share the Vercel URL with your collaborators
2. ✅ Export your Blender model as .glb
3. ✅ Upload the model and update the code
4. ✅ Test on mobile devices
5. ✅ Customize colors and branding

## 📱 Sharing with Collaborators

Once deployed, your collaborators can:
- View the 3D model in any browser
- Rotate, zoom, and explore interactively
- No software installation required!
- Works on desktop, tablet, and mobile

## 🔧 Troubleshooting

**"Model not loading"**
- Make sure the .glb file is in `public/models/`
- Check that you uncommented the GLTFLoader code in main.js
- Verify the file path matches: `/models/optics_table.glb`

**"Vercel build failed"**
- Check the build logs in Vercel dashboard
- Ensure package.json is valid
- Make sure all imports are correct

**"Site is slow"**
- Optimize your 3D model (see EXPORT_GUIDE.md)
- Use Draco compression
- Reduce texture sizes

---

Need help? Check README.md for more details!
