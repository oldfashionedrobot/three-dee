import * as THREE from 'three';
import { init } from '../core';
import spline from '../lib/spline';
import { RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const COLORS = {
  green: 0x00ff00,
  red: 0xff321a,
  orange: 0xff611b,
  yellow: 0xffbb1c,
  pink: 0xf14185,
  magenta: 0xe200f7,
  purple: 0x9407fb,
  blue: 0x450eff,
  darkBlue: 0x3407b8,
  navyBlue: 0x220070,
  white: 0xffffff
} as const;

const BG_COLOR = COLORS.navyBlue;
const FOG_COLOR = COLORS.yellow;
const LINES_COLOR = COLORS.red;
const WALL_COLOR = COLORS.navyBlue;

const { composer, scene, camera, animate } = init({
  useComposer: true,
  backgroundColor: BG_COLOR
});
scene.fog = new THREE.FogExp2(FOG_COLOR, 0.08);

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  100
);
bloomPass.threshold = 0.02;
bloomPass.strength = 2.5;
bloomPass.radius = 0;

composer.addPass(renderScene);
composer.addPass(bloomPass);

const tubeGeo = new THREE.TubeGeometry(spline, 300, 0.65, 16, true);
const tubeWallGeo = new THREE.TubeGeometry(spline, 300, 0.66, 16, true);
const wallMat = new THREE.MeshBasicMaterial({
  color: WALL_COLOR,
  side: THREE.DoubleSide
});
const wallMesh = new THREE.Mesh(tubeWallGeo, wallMat);
scene.add(wallMesh);
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: LINES_COLOR });
const lineMesh = new THREE.LineSegments(edges, lineMat);
scene.add(lineMesh);

const numBoxes = 60;
const size = 0.08;
const boxGeo = new THREE.EdgesGeometry(
  new THREE.BoxGeometry(size, size, size),
  0.2
);

const boxes = new Array<THREE.LineSegments>(numBoxes);
const boxColors = Object.values(COLORS).slice(0, 8);
for (let i = 0; i < numBoxes; i++) {
  const clr = boxColors[i % boxColors.length];
  const lineMat = new THREE.MeshStandardMaterial({
    color: clr,
    emissive: clr,
    emissiveIntensity: 2
  });

  const edgesMesh = new THREE.LineSegments(boxGeo, lineMat);

  const p = (i / numBoxes + Math.random() * 0.1) % 1;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;
  edgesMesh.position.copy(pos);

  const rotation = new THREE.Vector3(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  edgesMesh.rotation.setFromVector3(rotation);

  boxes[i] = edgesMesh;
  scene.add(edgesMesh);
}

animate((t: number) => {
  const time = t * 100;
  const looptime = 8 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);

  for (const box of boxes) {
    box.rotation.x += Math.random() * 0.02;
    box.rotation.y += Math.random() * 0.01;
  }
});

function getRandomDirection() {
  const randomVector = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  );

  return randomVector.normalize();
}
