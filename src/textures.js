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

const doorColorTexture = textureLoader.load('../static/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('static/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('../static/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('../static/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('../static/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('../static/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('../static/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('../static/textures/matcaps/3.png');
const gradientTexture = textureLoader.load('../static/textures/gradients/5.jpg');

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

/**
 * Wall textures
 */
const wallColorTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k/stone_bricks_wall_07_baseColor_1k.png');
const wallNormalTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k/stone_bricks_wall_07_normal_gl_1k.png');
const wallRoughnessTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k/stone_bricks_wall_07_roughness_1k.png')
const wallMetallicTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k//stone_bricks_wall_07_metallic_1k.png');
const wallHeightTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k/stone_bricks_wall_07_height_1k.png');
const wallaoMapTexture = textureLoader.load(
    '/static/textures/stone_bricks_wall_07_1k/stone_bricks_wall_07_ambientOcclusion_1k.png');

/**
 * grass textures
 */
const grassColorTexture = textureLoader.load(
    '/static/textures/grass_with_rocks_01_1k/grass_with_rocks_01_color_1k.png');
const grassNormalTexture = textureLoader.load(
    '/static/textures/grass_with_rocks_01_1k/grass_with_rocks_01_normal_gl_1k.png');
const grassRoughnessTexture = textureLoader.load(
    '/static/textures/grass_with_rocks_01_1k/grass_with_rocks_01_roughness_1k.png')
const grassHeightTexture = textureLoader.load(
    '/static/textures/grass_with_rocks_01_1k/grass_with_rocks_01_height_1k.png');
const grassaoMapTexture = textureLoader.load(
    '/static/textures/grass_with_rocks_01_1k/grass_with_rocks_01_ambientocclusion_1k.png');


/**
 * Rocks textures
 */
const rockColorTexture = textureLoader.load(
    '/static/textures/ground_06_1k/ground_06_baseColor_1k.png');
const rockNormalTexture = textureLoader.load(
    '/static/textures/ground_06_1k/ground_06_normal_dx_1k.png');
const rockRoughnesTexture = textureLoader.load(
    '/static/textures/ground_06_1k/ground_06_roughness_1k.png');
const rockHeightTexture = textureLoader.load(
    '/static/textures/ground_06_1k/ground_06_height_1k.png');
const rockaoMapTexture = textureLoader.load(
    '/static/textures/ground_06_1k/ground_06_ambientOcclusion_1k.png');

/**
 * Roof textures
 */
const roofColorTexture = textureLoader.load(
    '/static/textures/wood_planks_09_1k/wood_planks_09_color_1k.png');
const roofNormalTexture = textureLoader.load(
    '/static/textures/wood_planks_09_1k/wood_planks_09_normal_dx_1k.png');
const roofRoughnesTexture = textureLoader.load(
    '/static/textures/wood_planks_09_1k/wood_planks_09_roughness_1k.png');
const roofHeightTexture = textureLoader.load(
    '/static/textures/wood_planks_09_1k/wood_planks_09_height_1k.png');
const roofaoMapTexture = textureLoader.load(
    '/static/textures/wood_planks_09_1k/wood_planks_09_ambient_occlusion_1k.png');

/**
 * Bush textures
 */
const bushColorTexture = textureLoader.load(
    '/static/textures/moss_ground_02_1k/moss_groud_02_Base_Color_1k.png');
const bushNormalTexture = textureLoader.load(
    '/static/textures/moss_ground_02_1k/moss_groud_02_Normal_dx_1k.png');
const bushRoughnesTexture = textureLoader.load(
    '/static/textures/moss_ground_02_1k/moss_groud_02_Roughness_1k.png');
const bushHeightTexture = textureLoader.load(
    '/static/textures/moss_ground_02_1k/moss_groud_02_Height_1k.png');
const bushaoMapTexture = textureLoader.load(
    '/static/textures/moss_ground_02_1k/moss_groud_02_Ambient_Occlusion_1k.png');


export const bushTextures = {
    bushColorTexture,
    bushNormalTexture,
    bushRoughnesTexture,
    bushHeightTexture,
    bushaoMapTexture
}

export const roofTextures = {
    roofColorTexture,
    roofNormalTexture,
    roofRoughnesTexture,
    roofHeightTexture,
    roofaoMapTexture
}

export const textures = {
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorMetalnessTexture,
    doorNormalTexture,
    doorRoughnessTexture,
    matcapTexture,
    gradientTexture,
    backedShadow,
    simpleSphereShadow,
    environmentMapTexture
}

export const wallTextures = {
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
    wallMetallicTexture,
    wallHeightTexture,
    wallaoMapTexture
}

export const grassTextures = {
    grassColorTexture,
    grassNormalTexture,
    grassHeightTexture,
    grassRoughnessTexture,
    grassaoMapTexture
}

export const rocksTextures = {
    rockColorTexture,
    rockNormalTexture,
    rockHeightTexture,
    rockRoughnesTexture,
    rockaoMapTexture
}

