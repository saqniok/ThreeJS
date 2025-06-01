import * as dat from 'lil-gui';
import { material } from './materials.js'
import { meshes } from './meshes.js'
import { lights } from './lights.js'

// /**
//  * Debug
//  */
export const mainGui = new dat.GUI();


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

// --debug controls UI
// --cube rotation
folders.rotation.add(meshes.cube.rotation, 'x').min(-Math.PI / 2).max(Math.PI / 2).name('X rotation');
folders.rotation.add(meshes.cube.rotation, 'y').min(-Math.PI / 2).max(Math.PI / 2).name('Y rotation');
folders.rotation.add(meshes.cube.rotation, 'z').min(-Math.PI / 2).max(Math.PI / 2).name('Z rotation');

// --cube move
folders.move.add(meshes.cube.position, 'x').min(-1).max(1).step(0.01).name('X axis');
folders.move.add(meshes.cube.position, 'y').min(-1).max(1).step(0.01).name('Y axis');
folders.move.add(meshes.cube.position, 'z').min(-1).max(1).step(0.01).name('Z axis');

// --cube scale
folders.scale.add(meshes.cube.scale, 'x', 0.1, 3).step(0.1).name('Scale X');
folders.scale.add(meshes.cube.scale, 'y', 0.1, 3).step(0.1).name('Scale Y');
folders.scale.add(meshes.cube.scale, 'z', 0.1, 3).step(0.1).name('Scale Z');

// --cube color
folders.color.addColor(material, 'color');
folders.color.add(material, 'opacity').min(0).max(1).step(0.01).name('visability');
folders.color.add(material, 'visible'); // make bolean on/off 
folders.color.add(material, 'wireframe');
// folders.color.add(parametrs, 'spin');

// -- Material
folders.material.add(material, 'metalness').min(0).max(1).step(0.001).name('metalness');
folders.material.add(material, 'roughness').min(0).max(1).step(0.001).name('roughness');
folders.material.add(material, 'aoMapIntensity').min(0).max(3).step(0.001).name('aoMapIntensity');
folders.material.add(material, 'displacementScale').min(-1).max(1).step(0.0001).name('discplacement Scale');
folders.material.add(material.normalScale, 'y').min(-10).max(10).step(0.01).name('nomalMap Intensity Y');
folders.material.add(material.normalScale, 'x').min(-10).max(10).step(0.01).name('nomalMap Intensity X');

// // --light
folders.light.add(lights.ambientLight, 'intensity').min(0).max(10).step(0.01).name('ambientLight Intensity');