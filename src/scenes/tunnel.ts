import * as THREE from 'three';
import { init } from '../core';
import spline from '../lib/spline';
import { RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const { composer, scene, camera, animate } = init({ useComposer: true });
scene.fog = new THREE.FogExp2(0x0000000, 0.4);

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  100
);
bloomPass.threshold = 0.002;
bloomPass.strength = 3.5;
bloomPass.radius = 0;
composer.addPass(renderScene);
composer.addPass(bloomPass);

const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
const lineMesh = new THREE.LineSegments(edges, lineMat);
scene.add(lineMesh);

const numBoxes = 55;
const size = 0.075;
const boxGeo = new THREE.EdgesGeometry(
  new THREE.BoxGeometry(size, size, size),
  0.2
);
const boxes = new Array<THREE.LineSegments>(numBoxes);
for (let i = 0; i < numBoxes; i++) {
  const lineMat = new THREE.LineBasicMaterial({ color: 0xfff000 });
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
  const time = t * 0.1;
  const looptime = 8 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);

  for (const box of boxes) {
    box.rotation.x += Math.random() * 0.01;
    box.rotation.y += Math.random() * 0.005;
  }
});
