import React, { Fragment } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Stars, Environment } from '@react-three/drei';
import {
  PlanetModel,
  PlanetFiles,
  PlanetModelProps
} from './components/PlanetModel';
import { rad } from './utils';

import styles from './App.module.css';

const planetProps: { [key in PlanetFiles]?: Partial<PlanetModelProps> } = {
  [PlanetFiles.red]: {
    spinnerObjectName: 'Circle006',
    rotation: [rad(-20), 0, rad(20)],
    planetSpeed: -20
  },
  [PlanetFiles.resource]: {
    spinnerObjectName: 'ROCKET',
    rotation: [0, 0, rad(45)],
    spinnerSpeed: 60
  }
};

function App() {
  const planetsElems = Object.values(PlanetFiles).map(
    (file: PlanetFiles, index: number) => {
      return (
        <PlanetModel
          key={file}
          position={[12 - index * 3, 0, 0]}
          fileName={file}
          {...planetProps[file]}
        />
      );
    }
  );

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
          {planetsElems}
          <Sun position={[0, 0, 20]} />
          <Earth position={[0, 5, 0]} />
          <ToxicPlanet position={[-4, 5, 0]} />
          <RedPlanet position={[4, 5, 0]} />
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

function RedPlanet({ position }: { position: [number, number, number] }) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.red}
      glowColor="#fac9ac"
      spinnerObjectName="Circle006"
      rotation={[rad(-20), 0, rad(20)]}
      planetSpeed={-20}
    />
  );
}

function ToxicPlanet({ position }: { position: [number, number, number] }) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.toxic}
      glowColor="#d1f59f"
    />
  );
}

function Sun({ position }: { position?: [number, number, number] }) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.sun}
      glowColor="#d1f59f"
      glowLight={true}
      scale={5}
      glowScale={2}
      gltfProps={{
        emissiveChild: 'sun_sun_0',
        emissiveIntensity: 6
      }}
    />
  );
}

function Earth({ position }: { position: [number, number, number] }) {
  return (
    <PlanetModel
      planetSpeed={-15}
      position={position}
      rotation={[0, 0, rad(15)]}
      fileName={PlanetFiles.earth}
    >
      <PlanetModel
        position={[3, 0, 0]}
        fileName={PlanetFiles.moon}
        scale={0.5}
        planetSpeed={25}
        showGlow={false}
      ></PlanetModel>
    </PlanetModel>
  );
}

export default App;
