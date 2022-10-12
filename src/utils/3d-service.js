import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import checkerImg from "../assets/images/checker.png";
import crystalFbx from "../assets/models/crystals_one_mat.fbx";
import crystalNormalMap from "../assets/images/crystals_Normal.png";
import crystalAlphaMap from "../assets/images/crystals_AlbedoTransparency.png";
import crystalRedTex from "../assets/images/crystals_Emission_red.png";
import crystalGreenTex from "../assets/images/crystals_Emission_green.png";
import crystalBlueTex from "../assets/images/crystals_Emission_blue.png";
import crystalPurpleTex from "../assets/images/crystals_Emission_purple.png";

import Stats from "../lib/stats";

export function init3d(canvasRef, showStats = true) {
  let stats;
  if (showStats) {
    stats = new Stats();
    stats.showPanels(0, 1, 2); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }

  // INIT RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.current,
    alpha: true,
    premultipliedAlpha: false
  });

  // INIT CAMERA
  const fov = 40,
    aspect = 2 /* the canvas default */,
    near = 0.1,
    far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  // INIT CONTROLS
  // const controls = new OrbitControls(camera, canvasRef.current);
  // controls.target.set(0, 5, 0);
  // controls.update();

  // INIT SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // INIT POST PROCESSING
  const composer = new EffectComposer(renderer),
    renderPass = new RenderPass(scene, camera),
    effectPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1, // strength
      2, // radius
      0.6 // threshold
    );
  composer.addPass(renderPass);
  composer.addPass(effectPass);

  const color = 0xffffff,
    ambientLight = new THREE.AmbientLight(color, 0.2),
    light = new THREE.DirectionalLight(color, 1);
  light.position.set(-1, 2, 4);
  light.rotation.set(45, 0, 0);
  scene.add(ambientLight);
  scene.add(light);

  // FBX testing
  const normalTex = new THREE.TextureLoader().load(crystalNormalMap);
  const alphaTex = new THREE.TextureLoader().load(crystalAlphaMap);
  const colorMaps = [
    crystalRedTex,
    crystalBlueTex,
    crystalGreenTex,
    crystalPurpleTex
  ];

  const objs = [];
  new FBXLoader().load(
    crystalFbx,
    (object) => {
      // console.log(object.children)
      // const [wide1, wide2, _, long1, long2] = object.children;

      object.children.splice(2, 1);
      const children = object.children.map((child, index) => {
        child.scale.set(0.1, 0.1, 0.1);
        child.position.set(index * 2 - 3, -1, 0);

        const tex = new THREE.TextureLoader().load(colorMaps[index]);
        child.material = new THREE.MeshPhongMaterial({
          map: tex,
          emissiveMap: tex,
          emissive: index === 2 ? "#777" : "#fff",
          emissiveIntensity: 1.7,
          alphaMap: alphaTex,
          normalMap: normalTex
        });

        return child;
      });

      objs.push(...children);
      scene.add(...children);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  let requestFrameId;
  (function render(time) {
    stats.begin();

    time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer, composer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objs.forEach((obj, idx) => {
      const speed = 1 + idx * 0.1;
      const rot = time * speed;
      // obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    // renderer.render(scene, camera);
    composer.render();

    requestFrameId = requestAnimationFrame(render);

    stats.end();
  })();

  return () => {
    [renderer, normalTex, alphaTex, ambientLight, light, ...objs].forEach(
      (x) => {
        // TODO: not sure if this is correct/enough cleanup
        // console.log(x.material);
        x.material?.map.dispose();
        x.material?.dispose();
        x.dispose();
      }
    );
    document.body.removeChild(stats.dom);
    cancelAnimationFrame(requestFrameId);
  };
}

function resizeRendererToDisplaySize(renderer, composer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  // const width = canvas.clientWidth;
  // const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  }
  return needResize;
}
