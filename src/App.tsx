import React, { Fragment, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stats, OrbitControls, Stars, Environment } from '@react-three/drei';
import * as Planets from './components/Planets';
import { Orbit } from './components/Orbit';

import styles from './App.module.css';

const orbits = [
  { radius: 15, children: <Planets.DesertPlanet /> },
  {
    radius: 25,
    offset: 45,
    children: <Planets.ToxicPlanet />
  },
  { radius: 35, offset: 90, children: <Planets.RedPlanet /> },
  {
    radius: 45,
    offset: 135,
    children: <Planets.Earth />
  },
  {
    radius: 55,
    offset: 180,
    children: <Planets.GreenPlanet />
  },
  {
    radius: 65,
    offset: 225,
    children: <Planets.ResourcePlanet />
  },
  {
    radius: 75,
    offset: 270,
    children: <Planets.IcePlanet />
  },
  {
    radius: 85,
    offset: 315,
    children: <Planets.CrystalPlanet />
  },
  {
    radius: 95,
    children: <Planets.CandyPlanet />
  }
];

const animateTime = 5;
const camStartPos = new THREE.Vector3(0, 0, -100);
const camEndPos = new THREE.Vector3(0, 20, -50);
const zeroVector = new THREE.Vector3(0, 0, 0);
const ease = 1;

function CamAnimator({
  onAnimationComplete
}: {
  onAnimationComplete: () => void;
}) {
  const camera = useThree((state) => state.camera);
  const shouldAnimate = useRef(true);

  useFrame(({ clock }) => {
    if (shouldAnimate.current === false) return;
    const t = Math.min(1, clock.getElapsedTime() / animateTime);
    const f = -ease * t * t + (1 + ease) * t;
    camera.position.lerpVectors(camStartPos, camEndPos, f);
    camera.lookAt(zeroVector);

    if (t >= 1) {
      onAnimationComplete();
      shouldAnimate.current = false;
    }
  });

  return <></>;
}

function App() {
  const controlsRef = useRef<any>(null);

  function enableControls() {
    console.log(controlsRef.current);
    if (controlsRef.current) controlsRef.current.enabled = true;
  }

  return (
    <div className={styles.app}>
      <Canvas camera={{ position: camStartPos }}>
        <CamAnimator onAnimationComplete={() => enableControls()} />
        <Fragment key="debug">
          {/* <axesHelper args={[20]} /> */}
          <Stats />
        </Fragment>

        <Fragment key="interaction">
          <OrbitControls ref={controlsRef} enabled={false} enablePan={false} />
        </Fragment>

        <Fragment key="lighting">
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 5, -2]} />
        </Fragment>

        <Fragment key="scene">
          <Planets.Sun />
          {orbits.map((orbit, index) => (
            <Orbit key={index} {...orbit}></Orbit>
          ))}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={2}
          />
          <Environment
            background
            files={[
              '/sky/right.png',
              '/sky/left.png',
              '/sky/top.png',
              '/sky/bottom.png',
              '/sky/front.png',
              '/sky/back.png'
            ]}
          />
        </Fragment>
      </Canvas>
    </div>
  );
}

export default App;
