import * as THREE from 'three';
import { init } from '../lib/core';
import { GUI } from 'dat.gui';

export default function () {
  const { camera, scene, animate } = init({
    useControls: true
  });

  scene.add(new THREE.GridHelper());
  scene.add(new THREE.AxesHelper(5));

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshNormalMaterial({ wireframe: true });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const gui = new GUI();

  const cubeFolder = gui.addFolder('Cube');
  cubeFolder.add(cube, 'visible');
  cubeFolder.open();

  const positionFolder = cubeFolder.addFolder('Position');
  positionFolder.add(cube.position, 'x', -5, 5);
  positionFolder.add(cube.position, 'y', -5, 5);
  positionFolder.add(cube.position, 'z', -5, 5);
  positionFolder.open();

  const rotationFolder = cubeFolder.addFolder('Rotation');
  rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
  rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
  rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
  rotationFolder.open();

  const scaleFolder = cubeFolder.addFolder('Scale');
  scaleFolder.add(cube.scale, 'x', -5, 5);
  scaleFolder.add(cube.scale, 'y', -5, 5);
  scaleFolder.add(cube.scale, 'z', -5, 5);
  scaleFolder.open();

  animate(() => {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
  });
}
