import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
let scene, camera, renderer, controls;
let model, gridHelper, axesHelper;
let loadingScreen, loadingProgress;

// Camera presets
const cameraPresets = {
    default: { position: [5, 5, 5], target: [0, 0, 0] },
    top: { position: [0, 10, 0], target: [0, 0, 0] },
    front: { position: [0, 2, 8], target: [0, 0, 0] },
    side: { position: [8, 2, 0], target: [0, 0, 0] }
};

// Initialize the scene
function init() {
    // Get DOM elements
    loadingScreen = document.getElementById('loading-screen');
    loadingProgress = document.getElementById('loading-progress');
    const canvas = document.getElementById('three-canvas');
    const container = document.getElementById('canvas-container');

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-primary').trim());

    // Create camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(...cameraPresets.default.position);

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Add lights
    setupLights();

    // Add grid and axes helpers
    gridHelper = new THREE.GridHelper(20, 20, 0x6366f1, 0x334155);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Setup controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.target.set(...cameraPresets.default.target);
    controls.update();

    // Load model
    loadModel();

    // Setup event listeners
    setupEventListeners();

    // Start animation loop
    animate();
}

// Setup lighting
function setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0x6366f1, 0.3);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Hemisphere light for better color
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(hemiLight);
}

// Load 3D model
function loadModel() {
    const loader = new GLTFLoader();

    // For now, we'll create a placeholder since the actual model needs to be exported
    // Users will replace 'model.glb' with their actual exported file

    // Create a placeholder scene with some geometry
    createPlaceholderScene();

    // Uncomment this when you have your actual .glb file:
    /*
    loader.load(
        '/models/optics_table.glb',
        (gltf) => {
            model = gltf.scene;
            
            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Scale if needed
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDim;
            model.scale.multiplyScalar(scale);
            
            scene.add(model);
            hideLoadingScreen();
        },
        (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            loadingProgress.textContent = `${percent}%`;
        },
        (error) => {
            console.error('Error loading model:', error);
            loadingProgress.textContent = 'Error loading model';
        }
    );
    */
}

// Create placeholder scene (remove when actual model is loaded)
function createPlaceholderScene() {
    const group = new THREE.Group();

    // Create a table-like structure
    const tableMaterial = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.3,
        roughness: 0.4
    });

    const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.1, 2),
        tableMaterial
    );
    tableTop.position.y = 1;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    group.add(tableTop);

    // Table legs
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    const legPositions = [
        [-1.8, 0.5, -0.8],
        [1.8, 0.5, -0.8],
        [-1.8, 0.5, 0.8],
        [1.8, 0.5, 0.8]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, tableMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        group.add(leg);
    });

    // Add some robot-like structures
    const robotMaterial = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.6,
        roughness: 0.3
    });

    // Robot bases
    const robotPositions = [
        [-1.5, 1.15, 0],
        [0, 1.15, 0],
        [1.5, 1.15, 0]
    ];

    robotPositions.forEach(pos => {
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16),
            robotMaterial
        );
        base.position.set(...pos);
        base.castShadow = true;
        group.add(base);

        // Robot arm segment
        const arm = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.5, 0.08),
            robotMaterial
        );
        arm.position.set(pos[0], pos[1] + 0.35, pos[2]);
        arm.castShadow = true;
        group.add(arm);
    });

    // Add a ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    model = group;
    scene.add(model);

    hideLoadingScreen();
}

// Hide loading screen
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

        // Update scene background
        const bgColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-primary').trim();
        scene.background = new THREE.Color(bgColor);
    });

    // Info panel toggle
    const infoBtn = document.getElementById('info-btn');
    const infoPanel = document.getElementById('info-panel');
    const closeInfo = document.getElementById('close-info');

    infoBtn.addEventListener('click', () => {
        infoPanel.classList.remove('hidden');
    });

    closeInfo.addEventListener('click', () => {
        infoPanel.classList.add('hidden');
    });

    // Camera presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            setCameraPreset(preset);

            // Update active state
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Display options
    document.getElementById('wireframe-toggle').addEventListener('change', (e) => {
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material.wireframe = e.target.checked;
                }
            });
        }
    });

    document.getElementById('grid-toggle').addEventListener('change', (e) => {
        gridHelper.visible = e.target.checked;
    });

    document.getElementById('axes-toggle').addEventListener('change', (e) => {
        axesHelper.visible = e.target.checked;
    });
}

// Set camera to preset position
function setCameraPreset(presetName) {
    const preset = cameraPresets[presetName];
    if (!preset) return;

    // Animate camera movement
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(...preset.position);
    const startTarget = controls.target.clone();
    const endTarget = new THREE.Vector3(...preset.target);

    const duration = 1000; // ms
    const startTime = Date.now();

    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out)
        const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        camera.position.lerpVectors(startPos, endPos, eased);
        controls.target.lerpVectors(startTarget, endTarget, eased);
        controls.update();

        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }

    animateCamera();
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
