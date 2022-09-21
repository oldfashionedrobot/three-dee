import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import THREE from "three";

import { Spinner } from "./components/spinner";

import "./styles.css";

function App() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    const fov = 40;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 120;

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    scene.background = new THREE.Color(0xaaaaaa);

    const cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2)
    ];
    scene.add(...cubes);

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    (function render(time) {
      time *= 0.001; // convert time to seconds

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube, idx) => {
        const speed = 1 + idx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera);

      animRef.current = requestAnimationFrame(render);
    })();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div>
      <h1>Look at the 3D!</h1>
      <canvas ref={canvasRef} id="c"></canvas>
      <Spinner></Spinner>
    </div>
  );

  // METHODS
  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = x;

    return cube;
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    // const pixelRatio = window.devicePixelRatio;
    // const width = (canvas.clientWidth * pixelRatio) | 0;
    // const height = (canvas.clientHeight * pixelRatio) | 0;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App name="testoo"></App>);
