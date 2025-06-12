import * as THREE from 'three';
import { material } from './materials'
import { lights } from './lights.js'
import { 
    textures,
    wallTextures, 
    grassTextures, 
    rocksTextures, 
    roofTextures,
    bushTextures,
    particlesTextures
 } from './textures.js'

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = 0;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    new THREE.MeshStandardMaterial({
        map: grassTextures.grassColorTexture,
        normalMap: grassTextures.grassNormalTexture,
        roughnessMap: grassTextures.grassRoughnessTexture,
        aoMap: grassTextures.grassaoMapTexture,
        transparent: true,
        displacementMap: grassTextures.grassHeightTexture,
        displacementScale: 0.024
    })
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2)
 )
plane.rotation.x = Math.PI / -2;
plane.position.y = -0.1;
plane.scale.set(15, 15, 15);

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


// TODO: Refactor
// CUBE

        // //  // float32Array
        // // const positionsArray = new Float32Array([
        // //     0, 0, 0,    // 1st vertex XYZ
        // //     0, 1, 0,    // 2nd vertex XYZ
        // //     1, 0, 0     // 3rd vertex XYZ
        // // ]);

        // const geometry = new THREE.BufferGeometry();
        // const count = 50;
        // const positionsArray = new Float32Array(count * 3 * 3)

        // for(let i = 0; i < count * 3 * 3; i++){
        //     positionsArray[i] = Math.random();
        // }

        // const positionAttribute = new THREE.BufferAttribute(positionsArray, 3); // Number 3 says, how much indexes from array goes to vertex like XYZ

        // geometry.setAttribute('position', positionAttribute);
        // const cube = new THREE.Mesh(
        //     geometry,
        //     new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true})
        // );
        // cube.scale.set(0.1, 0.1, 0.1);
        // cube.position.set(0.5, 0, 0.5);
        // scene.add(cube);

/**
 * House 3D meshes
 */
// Group
export const house = new THREE.Group();


// Walls
const wallHeight = 1.3;
const wallWidth = 2.5;
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(3, wallHeight, wallWidth, 100, 100, 100),
    new THREE.MeshStandardMaterial({
        map: wallTextures.wallColorTexture,
        normalMap: wallTextures.wallNormalTexture,
        transparent: true,
        roughnessMap: wallTextures.wallRoughnessTexture,
        metalnessMap: wallTextures.wallMetallicTexture,
        aoMap: wallTextures.wallaoMapTexture,
        // displacementMap: wallTextures.wallHeightTexture, for box geometry it's not working, we need import 3D model with siuted corners
        // displacementScale: 0.051, // or create 4 plane textures and use them as walls
    })
)
walls.position.y = wallHeight / 2;
walls.castShadow = true;
house.add(walls);
const repeatX = 4;
const repeatY = 2;
const wallTextureList = [
    wallTextures.wallColorTexture,
    wallTextures.wallHeightTexture,
    wallTextures.wallMetallicTexture,
    wallTextures.wallNormalTexture,
    wallTextures.wallRoughnessTexture,
    wallTextures.wallaoMapTexture
];

const grassTextureList = [
    grassTextures.grassColorTexture,
    grassTextures.grassNormalTexture,
    grassTextures.grassRoughnessTexture,
    grassTextures.grassHeightTexture,
    grassTextures.grassaoMapTexture
]



wallTextureList.forEach(texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
})

grassTextureList.forEach(texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
})



// roof
const roofHeight = 1;
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.5, roofHeight, 4),
    new THREE.MeshStandardMaterial({
        map: roofTextures.roofColorTexture,
        normalMap: roofTextures.roofNormalTexture,
        roughnessMap: roofTextures.roofRoughnesTexture,
        aoMap: roofTextures.roofHeightTexture
    })
)

roof.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
 )
roof.position.y = roofHeight / 2 + wallHeight;
roof.rotation.y = Math.PI / 4
roofTextures.roofColorTexture.wrapS = THREE.RepeatWrapping;
roofTextures.roofColorTexture.wrapT = THREE.RepeatWrapping;
roofTextures.roofColorTexture.repeat.set(5, 5);
house.add(roof);

const roofTextureList = [
    roofTextures.roofColorTexture,
    roofTextures.roofNormalTexture,
    roofTextures.roofRoughnesTexture,
    roofTextures.roofHeightTexture,
    roofTextures.roofaoMapTexture
]

roofTextureList.forEach(texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
})

// Door
const doorVertexCount = 100;
const doorHeight = 1;
const doorWidth = 0.8;
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorWidth, doorHeight, doorVertexCount, doorVertexCount),
    new THREE.MeshStandardMaterial({
        map: textures.doorColorTexture,
        transparent: true,
        alphaMap: textures.doorAlphaTexture,
        normalMap: textures.doorNormalTexture,
        aoMap: textures.doorAmbientOcclusionTexture,
        roughnessMap: textures.doorRoughnessTexture,
        metalnessMap: textures.doorMetalnessTexture,
        displacementMap: textures.doorHeightTexture,
        displacementScale: 0.05 // too see result we must have more poligons in mesh, because it plays with vertex
    })
)
// we need to add a uv2 attribute to the door geometry for Ambient Occlusion 
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
 )
door.position.z = wallWidth / 2;
door.position.y = doorHeight / 1.8;
door.scale.set(1.5, 1.2, 1.5)
house.add(door);

// Shapes/Hearts
// const heart = new THREE.Shape();
// const geometry = new THREE.ShapeGeometry( heart, curveSegments );
// geometry.position.set(2, 2, 2)
// house.add(geometry)

const shape = new THREE.Shape();
const shapeX = - 2.5;
const shapeY = - 5;
shape.moveTo( shapeX + 2.5, shapeY + 2.5 );
shape.bezierCurveTo( shapeX + 2.5, shapeY + 2.5, shapeX + 2, shapeY, shapeX, shapeY );
shape.bezierCurveTo( shapeX - 3, shapeY, shapeX - 3, shapeY + 3.5, shapeX - 3, shapeY + 3.5 );
shape.bezierCurveTo( shapeX - 3, shapeY + 5.5, shapeX - 1.5, shapeY + 7.7, shapeX + 2.5, shapeY + 9.5 );
shape.bezierCurveTo( shapeX + 6, shapeY + 7.7, shapeX + 8, shapeY + 4.5, shapeX + 8, shapeY + 3.5 );
shape.bezierCurveTo( shapeX + 8, shapeY + 3.5, shapeX + 8, shapeY, shapeX + 5, shapeY );
shape.bezierCurveTo( shapeX + 3.5, shapeY, shapeX + 2.5, shapeY + 2.5, shapeX + 2.5, shapeY + 2.5 );


const heart = new THREE.Mesh(
    new THREE.ShapeGeometry( shape, 6 ), 
    new THREE.MeshStandardMaterial({ 
        color: 'pink',
        side: THREE.DoubleSide })
    );
heart.scale.set(0.05, 0.05, 0.05);
heart.rotation.x = Math.PI;
heart.position.set(0, 1, 3)
house.add(heart);

// Bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushTextures.bushColorTexture,
    normalMap: bushTextures.bushNormalTexture,
    aoMap: bushTextures.bushaoMapTexture,
    roughnessMap: bushTextures.bushRoughnesTexture,
    // displacementMap: bushTextures.bushHeightTexture,
    // displacementScale: 0.05,
    transparent: true,
    

});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.set(0.2, 0.5, 0.2);
bush1.position.set(0.8, 0.4, 1.5);

bush2.position.set(1.1, 0.3, 1.9);
bush2.scale.set(0.3, 0.3, 0.3);

bush3.position.set(-0.9, 0.5, 2);
bush3.scale.set(0.3, 0.6, 0.3);

bush4.position.set(-0.5, 0.15, 1.8);
bush4.scale.set(0.2, 0.2, 0.2);
house.add(bush1, bush2, bush3, bush4);

// Rocks
export const rocks = new THREE.Group();


const rockGeometry = new THREE.SphereGeometry(0.2, 4, 4);
const rockMaterial = new THREE.MeshStandardMaterial({
    map: rocksTextures.rockColorTexture,
    normalMap: rocksTextures.rockNormalTexture,
    roughnessMap: rocksTextures.rockRoughnesTexture,
    aoMap: rocksTextures.rockaoMapTexture, // for aoMap we need uv
    transparent: true,
    displacementMap: rocksTextures.rockHeightTexture,
    displacementScale: 0.06
});


for(let i = 0; i < 150; i++) {
    
    const angle = Math.random() * (Math.PI * 2); // выставить камни рандомно по окружностикруга, 
    const radius = 3 + Math.random() * 4; // создает широкую окружность, типа баранки
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    const random = Math.random() - 0.5;
    rock.position.set(x, 0.2 / 2, z);
    rock.rotation.y = random * Math.PI * 4;
    rock.rotation.z = random * Math.PI * 4;
    rock.rotation.x = random * Math.PI * 4;
    rock.scale.set(random * 4, random * 4, random * 4);
    rock.castShadow = true;
    rocks.add(rock);
}


/**
 * Lights for house
 */
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
plane.receiveShadow = true;
house.add(lights.doorLight)


/**
 * Particles
 */

// Geometry
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
// // const positionAttr = particlesGeometry.getAttribute('position');
// // const positions = positionAttr.array;
// // const newPositions = [];

// // for (let i = 0; i < positions.length; i += 3) {
// //     const x = positions[i];
// //     const y = positions[i + 1];
// //     const z = positions[i + 2];

// //     if (y > 0) {
// //         newPositions.push(x, y, z);
// //     }
// // }

// // const filteredGeometry = new THREE.BufferGeometry();
// // filteredGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));

// // Material
// const particlesMaterial = new THREE.PointsMaterial({
//     color: 'black',
//     size: 0.1,
//     sizeAttenuation: true // if Particle is far away it's size is become smaller
// })

// // Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// particles.scale.set(8, 3, 8);
// house.add(particles);
export const particlesGeometry = new THREE.BufferGeometry();
export const particlesCount = 20000;

const position = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for( let i = 0; i < particlesCount * 3; i++) {
    position[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 1;
particlesMaterial.sizeAttenuation = true;

// particlesMaterial.color = new THREE.Color('yellow');
particlesMaterial.alphaMap = particlesTextures.particlesColorTexture;
particlesMaterial.transparent = true;
// particlesMaterial.depthTest = false; // прикольный эффект, надо оставить для CV
particlesMaterial.depthWrite = false;
// particlesMaterial.alphaTest = 0.001;
particlesMaterial.blending = THREE.AdditiveBlending; // если приксель рисуется на пикселе, то он становится ярче
particlesMaterial.vertexColors = true;

// Color


// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
particles.renderOrder = 1;
particles.scale.set(8, 8, 8);
house.add(particles);