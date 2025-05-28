import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'lil-gui';

/**
 * Debug
 */
const mainGui = new dat.GUI();
const folders = {
    scale: mainGui.addFolder('Scale'),
    rotation: mainGui.addFolder('Rotation'),
    move: mainGui.addFolder('Move'),
    color: mainGui.addFolder('Color')
}

// Object for gui
const parametrs = {
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
    }
}

// Scene
const scene = new THREE.Scene();

// Texture
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => { console.log('onStart') };
loadingManager.onProgress = () => { console.log('onProgress') };
loadingManager.onLoad = () => { console.log('onLoad') };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('static/textures/door/color.jpg');
const alphaTexture = textureLoader.load('static/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('static/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('static/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('static/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('static/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('static/textures/matcaps/1.png');
const gradientTexture = textureLoader.load('static/textures/gradients/3.png');


// colorTexture.repeat.set(3, 2);
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.set(0.5, 0.5); // change pivot center
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Material and object
 */
const material = new THREE.MeshNormalMaterial({map: colorTexture});

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 1, 1),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.05),
    material
)
torus.position.x = 1.5;
sphere.position.x = -1.5;
scene.add(sphere);
scene.add(plane);
scene.add(torus);


// Cursor coordinates
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
});



// CONUS XYZ
const group = new THREE.Group();
scene.add(group);

const conusZ = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'yellow'})
);
conusZ.position.set(0, 1, 0);
group.add(conusZ);

const conusX = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'red'})
);
conusX.position.set(1, 0, 0);
conusX.rotation.z = Math.PI * - 0.5;
group.add(conusX);

const conusY = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'blue'})
);
conusY.position.set(0, 0, 1);
conusY.rotation.x = Math.PI * 0.5;
group.add(conusY);

// CUBE

        // //  // float32Array
        // // const positionsArray = new Float32Array([
        // //     0, 0, 0,    // 1st vertex XYZ
        // //     0, 1, 0,    // 2nd vertex XYZ
        // //     1, 0, 0     // 3rd vertex XYZ
        // // ]);

        // const geometry = new THREE.BufferGeometry();
        // const count = 50;
        // const positionsArray = new Float32Array(count * 3 * 3)

        // for(let i = 0; i < count * 3 * 3; i++){
        //     positionsArray[i] = Math.random();
        // }

        // const positionAttribute = new THREE.BufferAttribute(positionsArray, 3); // Number 3 says, how much indexes from array goes to vertex like XYZ

        // geometry.setAttribute('position', positionAttribute);
        // const cube = new THREE.Mesh(
        //     geometry,
        //     new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true})
        // );
        // cube.scale.set(0.1, 0.1, 0.1);
        // cube.position.set(0.5, 0, 0.5);
        // scene.add(cube);

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    material
);
mesh.scale.set(0.3, 0.3, 0.3);
mesh.position.set(1, 1, 0.5);
scene.add(mesh);

// --debug controls UI
// --cube rotation
folders.rotation.add(mesh.rotation, 'x').min(-Math.PI / 2).max(Math.PI / 2).name('X rotation');
folders.rotation.add(mesh.rotation, 'y').min(-Math.PI / 2).max(Math.PI / 2).name('Y rotation');
folders.rotation.add(mesh.rotation, 'z').min(-Math.PI / 2).max(Math.PI / 2).name('Z rotation');

// --cube move
folders.move.add(mesh.position, 'x').min(-1).max(1).step(0.01).name('X axis');
folders.move.add(mesh.position, 'y').min(-1).max(1).step(0.01).name('Y axis');
folders.move.add(mesh.position, 'z').min(-1).max(1).step(0.01).name('Z axis');

// --cube scale
folders.scale.add(mesh.scale, 'x', 0.1, 3).step(0.1).name('Scale X');
folders.scale.add(mesh.scale, 'y', 0.1, 3).step(0.1).name('Scale Y');
folders.scale.add(mesh.scale, 'z', 0.1, 3).step(0.1).name('Scale Z');

// --cube color
// folders.color.addColor(mesh.material, 'color');
folders.color.add(mesh.material, 'opacity').min(0).max(1).step(0.01).name('visability');
mesh.material.transparent = true;
folders.color.add(mesh, 'visible'); // make bolean on/off 
folders.color.add(mesh.material, 'wireframe');
folders.color.add(parametrs, 'spin');


// --light

// Posistion

// Scale

// Rotation


// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


// Sizes - Resize ( Native JS )
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

})

// Fullscreen
window.addEventListener('dblclick', (event) => 
{
    if (!event.ctrlKey) return;
    if(!document.fullscreenElement) { canvas.requestFullscreen(); } else document.exitFullscreen();
});

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100);

// // ORTHOGRAPIC Camera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

camera.position.set(3, 3, 3);
scene.add(camera);



// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // make less pixel renderind quality, because ratio:3 is too high for GPU, but our eyes will never see the difference

// Controls
const controls = new OrbitControls(camera, canvas);
// Controls - Damping
controls.enableDamping = true;



// FPS 
let time = Date.now();
const clock = new THREE.Clock();

// // GSAP
// gsap.to(cube1.position, { duration: 1, delay: 1, x: 2});

// Animations
const tick = () => { 

        // Time
        // const currentTime = Date.now();
        
        // const deltaTime = currentTime - time;
        // time = currentTime;


    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.4 * elapsedTime;
    plane.rotation.z = 0.4 * elapsedTime;
    torus.rotation.y = 0.4 * elapsedTime;

    // Update controls
    controls.update(); // for damping

    // Canvas update


    // Update Objects animation
            // cube1.rotation.y += 0.001 * deltaTime;
            // cube1.position.x = Math.sin(elapsedTime);

            // cube2.rotation.y = elapsedTime;
            // cube2.position.z = Math.sin(elapsedTime);

            // cube3.rotation.y += 0.001 * deltaTime;
            // cube3.position.y = Math.cos(elapsedTime);
        // camera.position.x = Math.sin(cursor.x * Math.PI * 4) * 3;
        // camera.position.z = Math.cos(cursor.x * Math.PI * 4) * 3;

        // camera.position.y = cursor.y * 5;


    // camera.lookAt(axesHelper.position);

    // Update Renderer
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick); 
};

tick();