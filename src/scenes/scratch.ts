import * as THREE from 'three';
import { init } from '../lib/core';
import GUI from 'lil-gui';

export default function () {
  const { camera, scene, animate } = init({
    useControls: true,
    useStats: true
  });
  scene.environment = new THREE.CubeTextureLoader()
    .setPath('https://sbcode.net/img/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper();
  gridHelper.position.y = -1;
  scene.add(gridHelper);

  camera.position.set(0, 2, 7);

  const boxGeometry = new THREE.BoxGeometry();

  const sphereGeometry = new THREE.SphereGeometry();

  const icosahedronGeometry = new THREE.IcosahedronGeometry();

  const planeGeometry = new THREE.PlaneGeometry();

  const torusKnotGeometry = new THREE.TorusKnotGeometry();

  const material = new THREE.MeshStandardMaterial();

  const cube = new THREE.Mesh(boxGeometry, material);
  cube.position.set(5, 0, 0);
  scene.add(cube);

  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(3, 0, 0);
  scene.add(sphere);

  const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
  icosahedron.position.set(0, 0, 0);
  scene.add(icosahedron);

  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.set(-2, 0, 0);
  scene.add(plane);

  const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
  torusKnot.position.set(-5, 0, 0);
  scene.add(torusKnot);

  const options = {
    side: {
      FrontSide: THREE.FrontSide,
      BackSide: THREE.BackSide,
      DoubleSide: THREE.DoubleSide
    }
  };

  const gui = new GUI();

  const materialFolder = gui.addFolder('THREE.Material');
  materialFolder
    .add(material, 'transparent')
    .onChange(() => (material.needsUpdate = true));
  materialFolder.add(material, 'opacity', 0, 1, 0.01);
  materialFolder
    .add(material, 'alphaTest', 0, 1, 0.01)
    .onChange(() => updateMaterial());
  materialFolder.add(material, 'visible');
  materialFolder
    .add(material, 'side', options.side)
    .onChange(() => updateMaterial());
  materialFolder.open();

  function updateMaterial() {
    material.side = Number(material.side) as THREE.Side;
    material.needsUpdate = true;
  }

  animate(() => {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
  });
}
