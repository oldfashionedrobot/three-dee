import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const CAM_Z = 5;

export function initScene(
  buildFn: (scene: THREE.Scene) => void,
  animateFn: () => void
) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = CAM_Z;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  buildFn(scene);
  animate();

  window.addEventListener(
    'resize',
    () => handleWindowResize(camera, renderer),
    false
  );

  function animate() {
    requestAnimationFrame(animate);

    animateFn();

    controls.update();
    renderer.render(scene, camera);
  }
}

export function handleWindowResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.Renderer
) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
