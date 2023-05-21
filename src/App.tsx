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
    debug: true,
    rotation: [rad(-20), 0, rad(20)],
    planetSpeed: -20
  },
  [PlanetFiles.resource]: {
    spinnerObjectName: 'ROCKET',
    debug: true,
    rotation: [0, 0, rad(45)],
    spinnerSpeed: 60
  },
  [PlanetFiles.moon]: {
    scale: 0.5
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
