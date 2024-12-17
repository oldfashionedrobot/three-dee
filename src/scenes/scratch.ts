import * as THREE from 'three';
import { init } from '../core';
import { GUI } from 'dat.gui';

const { camera, scene, animate } = init({ useControls: true });
camera.position.z = 1.5;

// scene.background = new THREE.TextureLoader().load(
//   'https://sbcode.net/img/grid.png'
// );
scene.background = new THREE.CubeTextureLoader()
  .setPath('https://sbcode.net/img/')
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
// scene.backgroundBlurriness = 0.5;

const geo = new THREE.BoxGeometry();
const mat = new THREE.MeshNormalMaterial({ wireframe: true });
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

const gui = new GUI();

const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.open();

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 20);
cameraFolder.open();

animate(() => {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
});
