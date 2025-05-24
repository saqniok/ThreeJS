import * as THREE from 'three';


// Scene
const scene = new THREE.Scene()
console.log(scene)

// CUBES
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube1.position.set(0, 1, 0)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'blue'})
)
cube2.position.set(1, 0, 0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'yellow'})
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
renderer.render(scene, camera);

// Animations
const tick = () => { console.log(tick);window.requestAnimationFrame(tick) }