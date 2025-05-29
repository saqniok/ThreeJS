import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
// import { alphaT } from 'three/tsl';
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json';


/**
 * Debug
 */
const mainGui = new dat.GUI();


const folders = {
    scale: mainGui.addFolder('Scale'),
    rotation: mainGui.addFolder('Rotation'),
    move: mainGui.addFolder('Move'),
    color: mainGui.addFolder('Color'),
    material: mainGui.addFolder('Material'),
    light: mainGui.addFolder('Light')
}

for (const key in folders) {
    folders[key].close();
};

// Object for gui
const parametrs = {
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
    }
}

// Scene
const scene = new THREE.Scene();

// Loaders
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => { console.log('onStart') };
loadingManager.onProgress = () => { console.log('onProgress') };
loadingManager.onLoad = () => { console.log('onLoad') };

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();
const fontLoader = new FontLoader();

// Font
// fontLoader.load('static/font/helvetiker_regular.typeface.json',
//     (font) => {
//         console.log(font);
//         const textGeometry = new TextGeometry(
//             'Hello 3D World!',
//             {
//                 font: font,
//                 size: 0.5,
//                 height: 1,
//                 curveSegments: 5,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize:0.01,
//                 bevelOffset: 0,
//                 bevelSegments: 5
//             }
//         )

//         const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
//         const text = new THREE.Mesh(textGeometry, textMaterial);
//         textGeometry.center();
//         text.position.set(0, 2, 0);
//         text.scale.set(1, 1, 0.003); // ← убрать искажение
//         scene.add(text);

//         const donutGeometry = new THREE.TorusGeometry(0.2, 0.1, 64, 128);
//         const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

//         for(let i = 1; i < 100; i++) {
//             const donut = new THREE.Mesh(donutGeometry, donutMaterial);
//             const rotation = Math.random() * Math.PI;

//             donut.rotation.set(rotation, rotation, rotation)
//             donut.position.set(
//             (Math.random() - 0.5) * 10, 
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 10
//         );
//             scene.add(donut);

//         }
//     }
// );

// Texture
const colorTexture = textureLoader.load('static/textures/door/color.jpg');
const alphaTexture = textureLoader.load('static/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('static/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('static/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('static/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('static/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/static/textures/matcaps/3.png');
const gradientTexture = textureLoader.load('/static/textures/gradients/5.jpg');

// const environmentMapTexture = cubeTextureLoader.load([
//     'static/textures/environmentMaps/1/px.jpg',
//     'static/textures/environmentMaps/1/nx.jpg',
//     'static/textures/environmentMaps/1/py.jpg',
//     'static/textures/environmentMaps/1/ny.jpg',
//     'static/textures/environmentMaps/1/pz.jpg',
//     'static/textures/environmentMaps/1/nz.jpg'
// ])


// colorTexture.repeat.set(3, 2);
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.set(0.5, 0.5); // change pivot center
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

/**
 * Material and object
 */
// const material = new THREE.MeshBasicMaterial({map: colorTexture});
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;

// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.normalMap = normalTexture;
// material.alphaMap = alphaTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.transparent = true;
material.metalness = 0;
material.roughness = 0.2;
// material.envMap = environmentMapTexture;



// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 32, 32),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.1, 64, 128),
    material
)
// -- UV
// plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))


torus.position.x = 1.5;
sphere.position.x = -1.5;
plane.rotation.x = Math.PI / -2;
plane.position.y = -0.5;
plane.scale.set(5, 5, 5);
scene.add(sphere);
scene.add(plane);
scene.add(torus);

/**
 * Light
 */
// minimal cost
const ambientLight = new THREE.AmbientLight(); // light comes from everywhere
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0;
scene.add(ambientLight);

// minimal cost
const hemisphereLight = new THREE.HemisphereLight('red', 'blue', 0.1);
scene.add(hemisphereLight);

// middle cost
const pointLight = new THREE.PointLight(0xffffff, 2, 10);
pointLight.position.set(0, 0.5, 1);
//scene.add(pointLight);

// middle cost
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set(1, 0.25, 0.5);
scene.add(directionalLight);

// hight cost
const rectAreaLight = new THREE.RectAreaLight('yellow', 3, 1, 1);
rectAreaLight.position.set(-1, 0, 1)
rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight);

// hight cost
const spotLight = new THREE.SpotLight('purple', 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3)
spotLight.target = torus;
scene.add(spotLight);

/**
 * Light Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

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
// const group = new THREE.Group();
// scene.add(group);

// const conusZ = new THREE.Mesh(
//     new THREE.ConeGeometry(0.01, 0.1, 4),
//     new THREE.MeshBasicMaterial({color: 'yellow'})
// );
// conusZ.position.set(0, 1, 0);
// group.add(conusZ);

// const conusX = new THREE.Mesh(
//     new THREE.ConeGeometry(0.01, 0.1, 4),
//     new THREE.MeshBasicMaterial({color: 'red'})
// );
// conusX.position.set(1, 0, 0);
// conusX.rotation.z = Math.PI * - 0.5;
// group.add(conusX);

// const conusY = new THREE.Mesh(
//     new THREE.ConeGeometry(0.01, 0.1, 4),
//     new THREE.MeshBasicMaterial({color: 'blue'})
// );
// conusY.position.set(0, 0, 1);
// conusY.rotation.x = Math.PI * 0.5;
// group.add(conusY);

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
mesh.scale.set(0.6, 0.6, 0.6);
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
folders.color.addColor(material, 'color');
folders.color.add(material, 'opacity').min(0).max(1).step(0.01).name('visability');
folders.color.add(material, 'visible'); // make bolean on/off 
folders.color.add(material, 'wireframe');
folders.color.add(parametrs, 'spin');

// -- Material
folders.material.add(material, 'metalness').min(0).max(1).step(0.001).name('metalness');
folders.material.add(material, 'roughness').min(0).max(1).step(0.001).name('roughness');
folders.material.add(material, 'aoMapIntensity').min(0).max(3).step(0.001).name('aoMapIntensity');
folders.material.add(material, 'displacementScale').min(-1).max(1).step(0.0001).name('discplacement Scale');
folders.material.add(material.normalScale, 'y').min(-10).max(10).step(0.01).name('nomalMap Intensity Y');
folders.material.add(material.normalScale, 'x').min(-10).max(10).step(0.01).name('nomalMap Intensity X');

// --light
folders.light.add(ambientLight, 'intensity').min(0).max(10).step(0.01).name('ambientLight Intensity');

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

camera.position.set(0, 0.5, 4);
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
    torus.rotation.x = 0.2 * elapsedTime;
    // plane.rotation.z = 0.4 * elapsedTime;
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