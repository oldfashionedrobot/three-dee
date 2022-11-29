import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default function ThreeDee() {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
  const fpsRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const engine = new BABYLON.Engine(canvasRef.current, true); // Generate the BABYLON 3D engine

    // Add your code here matching the playground format
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvasRef.current, true);

      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      const box = BABYLON.MeshBuilder.CreateBox('box', {}, scene);

      return scene;
    };

    const scene = createScene(); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      fpsRef.current.innerHTML = engine.getFps().toFixed();
      scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener('resize', function () {
      engine.resize();
    });
  }, []);

  return (
    <>
      <div ref={fpsRef}></div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
