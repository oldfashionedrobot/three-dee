import React, { useRef } from 'react';
import { Vector3 } from 'three';
import { rad } from '../utils';
import { useFrame } from '@react-three/fiber';

import { GltfModel } from './GltfModel';

const WorldAxis = new Vector3(0, 0, 1);
const planetSpeed = -10;

const parentRot: [number, number, number] = [rad(90), 0, 0];
const planetPos = [0, 0, 0];
const planetRot = [rad(-100), rad(-13), 0];

type ContinentPlanetProps = {
  position?: [number, number, number];
};

export function ContinentPlanet({
  position = [0, 0, 0]
}: ContinentPlanetProps) {
  const planetRef = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const delta = Math.max(1 / 60, clock.getDelta());
      planetRef.current.rotateOnWorldAxis(WorldAxis, rad(planetSpeed) * delta);
    }
  });

  return (
    <>
      <group position={position} rotation={parentRot}>
        <GltfModel
          ref={planetRef}
          fileName="/continent-planet/scene.gltf"
          // objectName="planet001_1"
          position={planetPos}
          rotation={planetRot}
        ></GltfModel>
      </group>
    </>
  );
}
