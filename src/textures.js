import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';



// Loader
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => { console.log('onStart') };
loadingManager.onProgress = () => { console.log('onProgress') };
loadingManager.onLoad = () => { console.log('onLoad') };

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();
export const fontLoader = new FontLoader();

/**
 * Textures
 */

const colorTexture = textureLoader.load('static/textures/door/color.jpg');
const alphaTexture = textureLoader.load('static/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('static/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('static/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('static/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('static/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/static/textures/matcaps/3.png');
const gradientTexture = textureLoader.load('/static/textures/gradients/5.jpg');

// colorTexture.repeat.set(3, 2);
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.set(0.5, 0.5); // change pivot center
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

// Shadow Texture static
const backedShadow = textureLoader.load('/static/textures/bakedShadow.jpg');
const simpleSphereShadow = textureLoader.load('/static/textures/simpleShadow.jpg')

// Environment Texture
const environmentMapTexture = cubeTextureLoader.load([
    'static/textures/environmentMaps/1/px.jpg',
    'static/textures/environmentMaps/1/nx.jpg',
    'static/textures/environmentMaps/1/py.jpg',
    'static/textures/environmentMaps/1/ny.jpg',
    'static/textures/environmentMaps/1/pz.jpg',
    'static/textures/environmentMaps/1/nz.jpg'
])

export const textures = {
    colorTexture,
    alphaTexture,
    ambientOcclusionTexture,
    heightTexture,
    metalnessTexture,
    normalTexture,
    roughnessTexture,
    matcapTexture,
    gradientTexture,
    backedShadow,
    simpleSphereShadow,
    environmentMapTexture
}

