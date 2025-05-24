import * as THREE from 'three';
import gsap from 'gsap';


// Scene
const scene = new THREE.Scene()
console.log(scene)

// CUBES
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'yellow'})
)
cube1.position.set(0, 1, 0)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube2.position.set(1, 0, 0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'blue'})
)
cube3.position.set(0, 0, 1.5)
group.add(cube3)

// Posistion

// Scale

// Rotation


// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)



// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 1, 4)
scene.add(camera);


// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);


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


    // Update Objects
    cube1.rotation.y += 0.001 * deltaTime;
    cube1.position.x = Math.sin(elapsedTime);

    cube2.rotation.y = elapsedTime;
    cube2.position.z = Math.sin(elapsedTime);

    cube3.rotation.y += 0.001 * deltaTime;
    cube3.position.y = Math.cos(elapsedTime);

    camera.lookAt(axesHelper.position);

    // Update Renderer
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick); }

tick();