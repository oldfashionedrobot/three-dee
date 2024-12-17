import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

type AnimationFrameCallback = (t: number) => void;

type Options = {
  backgroundColor?: THREE.ColorRepresentation;
  useControls?: boolean;
  useComposer?: boolean;
  useStats?: boolean;
};

type Output = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  animate: (cb: AnimationFrameCallback) => void;
};

type OutputWithComposer = Output & { composer: EffectComposer };

type InitReturn<T extends Options> = T['useComposer'] extends true
  ? OutputWithComposer
  : Output;

export function init<T extends Options>(options: T): InitReturn<T> {
  const {
    useControls,
    useComposer,
    useStats,
    backgroundColor = 0x000000
  } = options;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setClearColor(backgroundColor);
  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30
  );

  initResizer(camera, renderer);

  let controls: OrbitControls;
  if (useControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
  }

  let stats: Stats;
  if (useStats) {
    stats = new Stats();
    document.body.appendChild(stats.dom);
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

  function animate(cb: AnimationFrameCallback) {
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      cb(t);

      controls?.update();
      stats?.update();
      if (useComposer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    });
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
