import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Options = { useControls?: boolean; useComposer?: boolean };

type Output = {
  scene: THREE.Scene;
  camera: THREE.Camera;
  animate: (frameCallback: (t: number) => void) => void;
};

type OutputWithComposer = Output & { composer: EffectComposer };

type InitReturn<T extends Options> = T['useComposer'] extends true
  ? OutputWithComposer
  : Output;

export function init<T extends Options>(options: T): InitReturn<T> {
  const { useControls, useComposer } = options;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  initResizer(camera, renderer);

  let controls: OrbitControls;
  if (useControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
  }

  let composer: EffectComposer;
  if (useComposer === true) {
    composer = new EffectComposer(renderer);
    return {
      scene,
      camera,
      animate,
      composer
    } as InitReturn<T>;
  }

  return { scene, camera, animate } as unknown as InitReturn<T>;

  function animate(frameCallback: (t: number) => void) {
    const animateFrame = (t: number = 0) => {
      requestAnimationFrame(animateFrame);
      frameCallback(t);
      render(t);
    };

    animateFrame();
  }

  function render(t: number) {
    if (useComposer) {
      composer.render(t);
    } else {
      renderer.render(scene, camera);
    }
  }
}

function initResizer(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.Renderer
) {
  window.addEventListener('resize', handleWindowResize, false);

  function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
