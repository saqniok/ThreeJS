import * as THREE from "three";

/**
 * Material and object
 */
// const material = new THREE.MeshBasicMaterial({map: colorTexture});
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;

// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

export const material = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.normalMap = normalTexture;
// material.alphaMap = alphaTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightTexture
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.transparent = true;
material.metalness = 0;
material.roughness = 0.2;
// material.envMap = environmentMapTexture;