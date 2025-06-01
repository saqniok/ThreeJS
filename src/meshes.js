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
plane.rotation.x = Math.PI / -2;
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
    new THREE.BoxGeometry(3, wallHeight, wallWidth),
    new THREE.MeshStandardMaterial({color: 'red'})
)
walls.position.y = wallHeight / 2;
house.add(walls);

// roof
const roofHeight = 1;
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.5, roofHeight, 4),
    new THREE.MeshStandardMaterial({color: 'blue'})
)
roof.position.y = roofHeight / 2 + wallHeight;
roof.rotation.y = Math.PI / 4
house.add(roof);

// Door
const doorHeight = 1;
const doorWidth = 0.8;
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorWidth, doorHeight),
    new THREE.MeshStandardMaterial({color: 'black'})
)
door.position.z = wallWidth / 2 + 0.01;
door.position.y = doorHeight / 2;
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
const bushMaterial = new THREE.MeshStandardMaterial({color: 'green'});
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


const rockGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.2);
const rockMaterial = new THREE.MeshStandardMaterial({color: 'white'});

for(let i = 0; i < 100; i++) {
    
    const angle = Math.random() * (Math.PI * 2); // выставить камни рандомно по окружностикруга, 
    const radius = 3 + Math.random() * 4; // создает широкую окружность, типа баранки
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    const random = Math.random() - 0.5;
    rock.position.set(x, 0.2 / 2, z);
    rock.rotation.y = random * Math.PI * 2;
    rock.rotation.z = random * Math.PI * 2;
    rock.rotation.x = random * Math.PI * 2;
    rock.scale.set(random * 3, random * 3, random * 3);
    rocks.add(rock);

}


