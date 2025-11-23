# Blender to Web Viewer - Export Guide

This guide will help you export your Blender model for use in the web viewer.

## Step-by-Step Export Process

### 1. Prepare Your Model in Blender

Before exporting, make sure your model is ready:

- ✅ Apply all modifiers you want to export
- ✅ Check that materials are properly assigned
- ✅ Ensure the model is at the origin (or positioned as desired)
- ✅ Remove any unnecessary objects or hidden geometry

### 2. Export as glTF/GLB

1. **Open your Blender file** (`optics_table.blend`)

2. **Select what to export:**
   - To export everything: Don't select anything (or select all with `A`)
   - To export specific objects: Select only those objects

3. **Go to File > Export > glTF 2.0 (.glb/.gltf)**

4. **Configure export settings:**

   **Include:**
   - ✅ Selected Objects (if you selected specific objects)
   - ✅ Custom Properties
   - ✅ Cameras (optional)
   - ✅ Punctual Lights (optional)

   **Transform:**
   - ✅ +Y Up (important for Three.js)

   **Geometry:**
   - ✅ Apply Modifiers
   - ✅ UVs
   - ✅ Normals
   - ✅ Tangents (if using normal maps)
   - ✅ Vertex Colors
   - Compression: None (or Draco for smaller files)

   **Materials:**
   - ✅ Export: Materials
   - ✅ Images: Automatic (or choose format)

   **Animation:**
   - ✅ Include animations (if your model has them)
   - ✅ Group by NLA Track (if using NLA)

5. **Choose format:**
   - **glTF Binary (.glb)** - Recommended! Single file, easier to manage
   - **glTF Separate (.gltf + .bin + textures)** - Multiple files

6. **Save the file** as `optics_table.glb`

### 3. Add to Web Viewer

1. **Create models directory:**
   ```bash
   cd optics-viewer
   mkdir -p public/models
   ```

2. **Copy your exported file:**
   ```bash
   cp /path/to/optics_table.glb public/models/
   ```

3. **Update main.js:**
   - Open `main.js` in your editor
   - Find the `loadModel()` function (around line 95)
   - Uncomment the GLTFLoader code block
   - Comment out `createPlaceholderScene()`

4. **Test locally:**
   ```bash
   npm run dev
   ```

### 4. Optimize for Web (Optional)

For better performance, you can optimize your model:

#### Reduce Polygon Count
- Use Blender's Decimate modifier
- Aim for < 100k triangles for web

#### Optimize Textures
- Resize textures to reasonable sizes (1024x1024 or 2048x2048)
- Use compressed formats (JPEG for color, PNG for alpha)
- Consider using texture atlases

#### Use Draco Compression
- In Blender export settings, enable Draco compression
- This can reduce file size by 90%!
- Note: Requires Draco decoder in Three.js (already included)

## Troubleshooting

### Model appears too large/small
- Adjust the scale in the GLTFLoader callback in `main.js`
- Or apply scale in Blender before exporting

### Model is rotated incorrectly
- Make sure you selected "+Y Up" in export settings
- Or adjust rotation in the GLTFLoader callback

### Materials look wrong
- Check that materials are using Principled BSDF in Blender
- Ensure textures are properly packed or saved externally
- glTF supports PBR materials best

### Model doesn't load
- Check browser console for errors
- Verify the file path is correct (`/models/optics_table.glb`)
- Make sure the file is in the `public/models/` directory

## Alternative: Using Blender Python Script

You can also export via Python script:

```python
import bpy

# Select all objects
bpy.ops.object.select_all(action='SELECT')

# Export as GLB
bpy.ops.export_scene.gltf(
    filepath='/path/to/optics_table.glb',
    export_format='GLB',
    export_apply=True,
    export_yup=True,
    export_materials='EXPORT',
    export_colors=True,
    export_normals=True,
    export_tangents=True
)

print("Export complete!")
```

Run with:
```bash
blender optics_table.blend --background --python export_script.py
```

## Next Steps

Once your model is loaded:
1. Test all camera angles
2. Try wireframe mode
3. Check on mobile devices
4. Deploy to Vercel!

Need help? Check the main README.md for more information.
