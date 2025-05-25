import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log(OrbitControls)

// Scene
const scene = new THREE.Scene();

// Cursor coordinates
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
});

// CUBES
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    new THREE.MeshBasicMaterial({color: 'yellow'})
);
cube1.position.set(0, 1, 0);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    new THREE.MeshBasicMaterial({color: 'red'})
);
cube2.position.set(1, 0, 0);
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    new THREE.MeshBasicMaterial({color: 'blue'})
);
cube3.position.set(0, 0, 1);
group.add(cube3);

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
window.addEventListener('dblclick', () => 
{
    if(!document.fullscreenElement) { canvas.requestFullscreen(); } else document.exitFullscreen();
})

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100);

// // ORTHOGRAPIC Camera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

camera.position.set(2, 2, 2);
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
    const currentTime = Date.now();
    
    const deltaTime = currentTime - time;
    time = currentTime;


    // Clock
    const elapsedTime = clock.getElapsedTime();


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