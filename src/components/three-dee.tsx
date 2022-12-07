import React, { useEffect, useRef } from 'react';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder
} from '@babylonjs/core';
// import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export default function ThreeDee() {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
  const fpsRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

  const engineRef: React.MutableRefObject<Engine> = useRef(null);
  const sceneRef: React.MutableRefObject<Scene> = useRef(null);

  useEffect(() => {
    engineRef.current = new Engine(canvasRef.current, true); // Generate the BABYLON 3D engine
    sceneRef.current = createScene(engineRef.current); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engineRef.current.runRenderLoop(handleRender);

    window.addEventListener('resize', handleResize);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      // engineRef.current.stopRenderLoop(handleRender);
      engineRef.current.dispose();
      engineRef.current = undefined;
      sceneRef.current.dispose();
      sceneRef.current = undefined;

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <>
      <div ref={fpsRef}></div>
      <canvas ref={canvasRef}></canvas>
    </>
  );

  function handleRender() {
    fpsRef.current.innerHTML = engineRef.current.getFps().toFixed();
    sceneRef.current.render();
  }

  function handleKeyup(ev) {
    // hide/show the Inspector
    // Shift+I
    if (ev.shiftKey && ev.key === 'I') {
      console.log(sceneRef.current.debugLayer.isVisible());
      if (sceneRef.current.debugLayer.isVisible()) {
        sceneRef.current.debugLayer.hide();
      } else {
        sceneRef.current.debugLayer.show();
      }
    }
  }

  function handleResize() {
    // Watch for browser/canvas resize events
    engineRef.current.resize();
  }

  function createScene(engine) {
    const scene = new Scene(engine);

    const camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(1, 1, 0),
      scene
    );
    const box: Mesh = MeshBuilder.CreateBox('box', {}, scene);

    return scene;
  }
}
