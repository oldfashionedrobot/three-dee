import React, { useRef } from 'react';
import { Object3D } from 'three';
import { rad } from '../utils';
import { useFrame } from '@react-three/fiber';
import { GltfModel } from './GltfModel';

export enum PlanetFiles {
  toxic = 'toxic_planet',
  earth = 'earth',
  desert = 'desert_planet',
  ice = 'ice_planet',
  crazy = 'crazy_planet',
  candy = 'candy_planet',
  resource = 'resource_planet',
  crystal = 'crystal_planet',
  red = 'red_planet',
  moon = 'moon'
}

export type PlanetModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  fileName?: PlanetFiles;
  spinnerObjectName?: string;
  planetSpeed?: number;
  spinnerSpeed?: number;
  debug?: boolean;
};

export function PlanetModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  spinnerObjectName,
  fileName = PlanetFiles.toxic,
  planetSpeed = -10,
  spinnerSpeed = 30,
  debug = false
}: PlanetModelProps) {
  console.log(spinnerObjectName);
  const planetRef = useRef<THREE.Object3D>(null);
  const childRef = useRef<THREE.Object3D>();

  useFrame(({ clock }) => {
    if (planetRef.current) {
      if (!childRef.current && spinnerObjectName) {
        // init child ref
        childRef.current = planetRef.current.getObjectByName(spinnerObjectName);
      }

      const delta = Math.max(1 / 60, clock.getDelta());

      // rotate planet
      planetRef.current.rotateOnWorldAxis(
        Object3D.DEFAULT_UP,
        rad(planetSpeed) * delta
      );

      // rotate child spinner
      childRef.current &&
        childRef.current.rotateOnWorldAxis(
          Object3D.DEFAULT_UP,
          rad(spinnerSpeed) * delta
        );
    }
  });

  return (
    <>
      <group scale={scale} position={position} rotation={rotation}>
        {debug && <axesHelper args={[5]}></axesHelper>}
        <GltfModel
          debug={debug}
          ref={planetRef}
          fileName={`/planets/${fileName}.glb`}
        />
      </group>
    </>
  );
}
