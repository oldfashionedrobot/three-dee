import React, { useRef } from 'react';
import { Vector3 } from 'three';
import { rad } from '../utils';
import { useFrame } from '@react-three/fiber';

import { GltfModel } from './GltfModel';

const WorldUp = new Vector3(0, 1, 0);
const ringsSpeed = 20;
const planetSpeed = 5;

const parentRot: [number, number, number] = [0, 0, rad(25)];
const planetPos = [0, 0, 0];
const planetRot = [rad(-100), rad(-13), 0];

type RocketPlanetProps = {
  position?: [number, number, number];
};

export function RocketPlanet({ position = [0, 0, 0] }: RocketPlanetProps) {
  const planetRef = useRef<THREE.Object3D>(null);
  const ringsRef = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (ringsRef.current && planetRef.current) {
      const delta = Math.max(1 / 60, clock.getDelta());

      ringsRef.current.rotateOnWorldAxis(WorldUp, rad(ringsSpeed) * delta);
      planetRef.current.rotateOnWorldAxis(WorldUp, rad(planetSpeed) * delta);
    }
  });

  return (
    <>
      <group position={position} rotation={parentRot}>
        <GltfModel
          ref={ringsRef}
          fileName="/rocket-planet/scene.gltf"
          objectName="planet001_2"
          scale={[1.1, 1.1, 1.1]}
          position={planetPos}
          rotation={planetRot}
        ></GltfModel>

        <GltfModel
          ref={planetRef}
          fileName="/rocket-planet/scene.gltf"
          objectName="planet001_1"
          position={planetPos}
          rotation={planetRot}
        ></GltfModel>
      </group>
    </>
  );
}
