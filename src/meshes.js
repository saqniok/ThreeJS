import * as THREE from 'three';
import { material } from './materials'

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = 0;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 32, 32),
    // new THREE.MeshBasicMaterial({map: backedShadow})
    // new THREE.MeshStandardMaterial({map: simpleSphereShadow})
    material
)
plane.position.y = -0.5;
plane.rotation.x = Math.PI / -2;
plane.scale.set(5, 5, 5);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.1, 64, 128),
    material
)
torus.position.x = 1.5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    material
);
cube.scale.set(0.6, 0.6, 0.6);
cube.position.set(-1.5, 0, 0);

export const meshes = {
    sphere,
    plane,
    torus,
    cube
}

