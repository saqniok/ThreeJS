import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

// minimal cost
const ambientLight = new THREE.AmbientLight(); // light comes from everywhere
ambientLight.color = new THREE.Color(0xc240c4);
ambientLight.intensity = 1;

 // minimal cost
const hemisphereLight = new THREE.HemisphereLight('red', 'blue', 0.1);

// // middle cost
const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(0, 2, -1);
pointLight.intensity = 4;

// middle cost
const directionalLight = new THREE.DirectionalLight('red', 0.2);
directionalLight.position.set(1, 2, 0.5);
directionalLight.intensity = 0.8;

// hight cost
const rectAreaLight = new THREE.RectAreaLight('yellow', 3, 1, 1);
rectAreaLight.position.set(-1, -0, 1)

// // hight cost
const spotLight = new THREE.SpotLight('white', 2, 10, Math.PI* 0.3);
spotLight.position.set(3, 2, 0);

const doorLight = new THREE.PointLight('white', 1, 7);
doorLight.position.set(0, 1.2, 1.2);

export const lights = {
    directionalLight,
    pointLight,
    rectAreaLight,
    spotLight,
    ambientLight,
    hemisphereLight,
    doorLight
}
/**
 *  Shadows
 *  only three types of light support shadows: Point, Direction, Spot
 */ 

/**
 * THREE.BasicShadowMap - Very performant but lousy quality
 * THREE.PCFShadowMap - Less performant but smoother edges(default)
 * THREE.PCFSoftShadowMap - Less performant but even smoother edges
 * THREE.VSMShadowMap - Less performant, more constraints, but better edges
 */

// directional light shadows
directionalLight.shadow.type = THREE.BasicShadowMap;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = - 2;
directionalLight.shadow.camera.left = - 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 4;
directionalLight.shadow.radius = 2;

// SpotLight
spotLight.shadow.camera.fov = 30;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.top = 2;
spotLight.shadow.camera.bottom = - 2;
spotLight.shadow.camera.left = - 2;
spotLight.shadow.camera.right = 2;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 5;

// PointLigh shadows
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 3;
// Point light don't work with .shadow.camera.fov because it's nor a perspective camera, it's render in 6 cube ways.

/**
 * Light Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);

export const lightHelpers = {
    hemisphereLightHelper,
    directionalLightHelper,
    pointLightHelper,
    spotLightHelper,
    rectAreaLightHelper
}

/**
 * Shadow Helpers
 */

const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionalLightShadowHelper.visible = true;

const spotLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightShadowHelper.visible = true;

const pointLightShadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightShadowHelper.visible = true;
 
export const shadowHelpers = {
    directionalLightShadowHelper,
    spotLightShadowHelper,
    pointLightShadowHelper
}

/**
 * Ghosts
 */
export const ghost1 = new THREE.PointLight('#ff00ff', 3, 4);
ghost1.position.set(0, 1, 4);

export const ghost2 = new THREE.PointLight('#00ffff', 3, 4);
ghost2.position.set(-4, 1, -2);

export const ghost3 = new THREE.PointLight('#ffff00', 3, 4);
ghost3.position.set(4, 1, -2);

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;


ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;
