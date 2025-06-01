import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { mainGui } from '/src/controlUI.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { lights, lightHelpers, shadowHelpers } from '/src/lights.js'
import { meshes } from '/src/meshes.js'
import { axiHelper, axiArrows } from '/src/axiHelpers.js'
// import { alphaT } from 'three/tsl';
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
// import { material } from '/src/materials.js'

// Scene
const scene = new THREE.Scene();

// TODO: Refactor
// Loaders
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => { console.log('onStart') };
loadingManager.onProgress = () => { console.log('onProgress') };
loadingManager.onLoad = () => { console.log('onLoad') };

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();
const fontLoader = new FontLoader();

// TODO: Refactor
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

// TODO: Refactor
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

const backedShadow = textureLoader.load('/static/textures/bakedShadow.jpg');
const simpleSphereShadow = textureLoader.load('/static/textures/simpleShadow.jpg')

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


// -- UV
// plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

// Objects
scene.add(meshes.sphere);
scene.add(meshes.plane);
scene.add(meshes.torus);
scene.add(meshes.cube)

// Create sphere shadow using new plane mesh with shadow texture
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true, // if you want use alpga channel
        alphaMap: simpleSphereShadow
    })
)
sphereShadow.rotation.x = -Math.PI / 2;
sphereShadow.position.y = meshes.plane.position.y + 0.01;
scene.add(sphereShadow);

/**
 * Light
 */
// minimal cost
scene.add(lights.ambientLight);
scene.add(lights.hemisphereLight);

// middle cost
// pointLight.lookAt(new THREE.Vector3());
scene.add(lights.pointLight);
scene.add(lights.directionalLight);

// hight cost)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight);

lights.spotLight.target = meshes.torus;
scene.add(lights.spotLight);
scene.add(lights.spotLight.target);


// Cursor coordinates
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
});




// TODO: Refactor
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

// Render shadows
renderer.shadowMap.enabled = false;

// shadow casts
lights.directionalLight.castShadow = true;
lights.pointLight.castShadow = true;
lights.spotLight.castShadow = true;
meshes.torus.castShadow = true;
meshes.cube.castShadow = true;
meshes.plane.receiveShadow = true;

/**
 * Axis Helper
 */
// scene.add(axiHelper);
// scene.add(axiArrows);


/**
 * Light Helpers
 */
// scene.add(lightHelpers.hemisphereLightHelper);
// scene.add(lightHelpers.directionalLightHelper);
// scene.add(lightHelpers.pointLightHelper);
// scene.add(lightHelpers.spotLightHelper);
// scene.add(lightHelpers.rectAreaLightHelper);

/**
 * Shadow Helpers
 */
// scene.add(shadowHelpers.directionalLightShadowHelper);
// scene.add(shadowHelpers.spotLightShadowHelper);
// scene.add(shadowHelpers.pointLightShadowHelper)


// Controls
const controls = new OrbitControls(camera, canvas);

// Controls - Damping
controls.enableDamping = true;

// FPS 
let time = Date.now();
const clock = new THREE.Clock();

// GSAP
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
    meshes.sphere.position.z = Math.cos(elapsedTime);
    meshes.sphere.position.x = Math.sin(elapsedTime);
    meshes.sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)); // absolut value- always positive, so 
    meshes.torus.rotation.x = 0.2 * elapsedTime;
    meshes.torus.rotation.y = 0.4 * elapsedTime;

    // Update simple shadow for sphere
    sphereShadow.position.x = meshes.sphere.position.x;
    sphereShadow.position.z = meshes.sphere.position.z;
    sphereShadow.material.opacity = (1 - meshes.sphere.position.y) * 1.3;

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