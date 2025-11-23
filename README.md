# Optics Table - Interactive 3D Viewer

A beautiful, interactive web-based 3D viewer for exploring Blender models in the browser. Built with Three.js and modern web technologies.

![Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=Interactive+3D+Viewer)

## ✨ Features

- 🎨 **Premium Design** - Modern UI with dark/light theme support
- 🎮 **Interactive Controls** - Smooth orbit, pan, and zoom controls
- 📷 **Camera Presets** - Quick access to top, front, side, and default views
- 🔍 **Display Options** - Toggle wireframe, grid, and axes helpers
- 📱 **Responsive** - Works beautifully on desktop, tablet, and mobile
- ⚡ **Fast Loading** - Optimized performance with WebGL rendering

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Adding Your Model

1. **Export from Blender:**
   - Open your `.blend` file in Blender
   - Go to `File > Export > glTF 2.0 (.glb/.gltf)`
   - Choose **glTF Binary (.glb)** format
   - Enable these options:
     - ✅ Include: Selected Objects (or all)
     - ✅ Transform: +Y Up
     - ✅ Geometry: Apply Modifiers
     - ✅ Geometry: UVs, Normals, Vertex Colors
     - ✅ Materials: Export
   - Save as `optics_table.glb`

2. **Add model to project:**
   ```bash
   mkdir -p public/models
   mv optics_table.glb public/models/
   ```

3. **Update the code:**
   - Open `main.js`
   - Find the `loadModel()` function
   - Uncomment the GLTFLoader code (lines ~110-135)
   - Comment out the `createPlaceholderScene()` call

4. **Refresh the browser** - Your model should now load!

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add 3D viewer"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

Your app will be live at `https://your-project.vercel.app`!

### Deploy to Other Platforms

- **Netlify:** Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages:** Use `vite-plugin-github-pages`
- **Bolt.new:** Import the project and deploy with one click

## 🎮 Controls

| Action | Control |
|--------|---------|
| **Rotate** | Left click + drag |
| **Pan** | Right click + drag |
| **Zoom** | Scroll wheel |
| **Reset View** | Click camera presets |

## 🛠️ Tech Stack

- **Three.js** - 3D graphics library
- **Vite** - Fast build tool and dev server
- **Vanilla JS** - No framework overhead
- **CSS3** - Modern styling with CSS variables

## 📝 Customization

### Change Colors

Edit CSS variables in `style.css`:

```css
:root {
    --accent-primary: #6366f1;  /* Primary accent color */
    --accent-secondary: #8b5cf6; /* Secondary accent color */
}
```

### Adjust Lighting

Modify lighting in `main.js` in the `setupLights()` function.

### Add Animations

If your model has animations, they'll automatically play. Control them in the GLTFLoader callback.

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

Built with ❤️ using Three.js
