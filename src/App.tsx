import React, { Fragment } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Stars, Environment } from '@react-three/drei';
import * as Planets from './components/Planets';
import { Orbit } from './components/Orbit';

import styles from './App.module.css';

const orbits = [
  { radius: 15, children: <Planets.DesertPlanet /> },
  {
    radius: 25,
    offset: Math.random() * 360,
    children: <Planets.ToxicPlanet />
  },
  { radius: 35, offset: Math.random() * 360, children: <Planets.RedPlanet /> },
  {
    radius: 45,
    offset: Math.random() * 360,
    children: <Planets.Earth />
  },
  {
    radius: 55,
    offset: Math.random() * 360,
    children: <Planets.GreenPlanet />
  },
  {
    radius: 65,
    offset: Math.random() * 360,
    children: <Planets.ResourcePlanet />
  },
  {
    radius: 75,
    offset: Math.random() * 360,
    children: <Planets.IcePlanet />
  },
  {
    radius: 85,
    offset: Math.random() * 360,
    children: <Planets.CrystalPlanet />
  },
  {
    radius: 95,
    offset: Math.random() * 360,
    children: <Planets.CandyPlanet />
  }
];

function App() {
  return (
    <div className={styles.app}>
      <Canvas camera={{ position: [0, 0, -20] }}>
        <Fragment key="debug">
          {/* <axesHelper args={[20]} /> */}
          <Stats />
        </Fragment>

        <Fragment key="interaction">
          <OrbitControls />
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
