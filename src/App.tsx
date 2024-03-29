import React, {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as Planets from './components/Planets';
import { Orbit } from './components/Orbit';

import styles from './App.module.css';

const orbits = [
  { radius: 30, children: <Planets.DesertPlanet /> },
  {
    radius: 45,
    offset: -45,
    children: <Planets.ToxicPlanet />
  },
  { radius: 60, offset: -90, children: <Planets.Earth /> },
  {
    radius: 75,
    offset: -90,
    children: <Planets.CandyPlanet />
  },
  {
    radius: 90,
    offset: -135,
    children: <Planets.RedPlanet />
  },
  {
    radius: 105,
    offset: -180,
    children: <Planets.CrystalPlanet />
  },
  {
    radius: 120,
    offset: -225,
    children: <Planets.IcePlanet />
  }
];

const perfOpts = {
  matrixUpdate: true
};

export const AppContext = React.createContext({
  selectPlanet: (planet: THREE.Object3D) => {}
});

function App() {
  const camCtrlRef = useRef<CamContrllerHandle>(null);

  function selectPlanet(planet: THREE.Object3D) {
    console.log('click recieved');
    camCtrlRef.current && camCtrlRef.current.setTarget(planet);
  }

  return (
    <div className={styles.app}>
      <AppContext.Provider value={{ selectPlanet }}>
        <Canvas camera={{ position: camStartPos }}>
          <Fragment key="debug">
            {/* <axesHelper args={[20]} /> */}
            <Perf {...perfOpts} />
            {/* <Stats /> */}
          </Fragment>

          <Fragment key="interaction">
            <CamController ref={camCtrlRef} />
          </Fragment>

          <Fragment key="lighting">
            <ambientLight intensity={0.1} />
          </Fragment>

          <Fragment key="scene">
            <Planets.Sun />
            {orbits.map((orbit, index) => (
              <Orbit key={index} {...orbit}></Orbit>
            ))}
            {/* <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={2}
            /> */}
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
      </AppContext.Provider>
    </div>
  );
}

const animateTime = 5;
const camStartPos = new THREE.Vector3(0, 50, -200);
const camEndPos = new THREE.Vector3(-100, 20, 0);
const zeroVector = new THREE.Vector3(0, 0, 0);
const ease = 1;
const camTargetVector = new THREE.Vector3();

type CamContrllerHandle = {
  setTarget(tgt: THREE.Object3D): void;
  clearTarget(): void;
};

const CamController = forwardRef<CamContrllerHandle>((_props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        setTarget(tgt: THREE.Object3D) {
          camTarget.current = tgt;
        },
        clearTarget() {
          camTarget.current = undefined;
        }
      };
    },
    []
  );

  const camera = useThree((state) => state.camera);
  const camTarget = useRef<THREE.Object3D>();
  const controlsRef = useRef<any>(null);
  const shouldAnimate = useRef(true);

  useFrame(({ clock }) => {
    if (shouldAnimate.current === true) {
      const t = Math.min(1, clock.getElapsedTime() / animateTime);
      const f = -ease * t * t + (1 + ease) * t;
      camera.position.lerpVectors(camStartPos, camEndPos, f);
      camera.lookAt(zeroVector);

      if (t >= 1) {
        enableControls();
        shouldAnimate.current = false;
      }
    } else if (camTarget.current) {
      controlsRef.current.target =
        camTarget.current.getWorldPosition(camTargetVector);
    }
  });

  function enableControls() {
    if (controlsRef.current) controlsRef.current.enabled = true;
  }

  return <OrbitControls ref={controlsRef} enabled={false} enablePan={false} />;
});

export default App;
