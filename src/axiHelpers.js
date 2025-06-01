import * as THREE from 'three';

export const axiHelper = new THREE.AxesHelper();

// XYZ Arrows
export const axiArrows = new THREE.Group();

const conusZ = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'yellow'})
);
conusZ.position.set(0, 1, 0);
axiArrows.add(conusZ);

const conusX = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'red'})
);
conusX.position.set(1, 0, 0);
conusX.rotation.z = Math.PI * - 0.5;
axiArrows.add(conusX);

const conusY = new THREE.Mesh(
    new THREE.ConeGeometry(0.01, 0.1, 4),
    new THREE.MeshBasicMaterial({color: 'blue'})
);
conusY.position.set(0, 0, 1);
conusY.rotation.x = Math.PI * 0.5;
axiArrows.add(conusY);