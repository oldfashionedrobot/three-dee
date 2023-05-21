import React, { useRef } from 'react';
import { Object3D } from 'three';
import { rad } from '../utils';
import { Glow } from './Glow';
import { useFrame } from '@react-three/fiber';
import { GltfModel } from './GltfModel';

export enum PlanetFiles {
  toxic = '/planets/toxic_planet.glb',
  earth = '/planets/earth.glb',
  green = '/planets/green_planet.glb',
  desert = '/planets/desert_planet.glb',
  ice = '/planets/ice_planet.glb',
  crazy = '/planets/crazy_planet.glb',
  candy = '/planets/candy_planet.glb',
  resource = '/planets/resource_planet.glb',
  crystal = '/planets/crystal_planet.glb',
  red = '/planets/red_planet.glb',
  moon = '/planets/moon.glb'
}

export type PlanetModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  fileName?: PlanetFiles;
  spinnerObjectName?: string;
  planetSpeed?: number;
  spinnerSpeed?: number;
  showGlow?: boolean;
  glowColor?: string;
  debug?: boolean;
  children?: React.ReactNode;
};

export function PlanetModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  spinnerObjectName,
  fileName = PlanetFiles.toxic,
  planetSpeed = -10,
  spinnerSpeed = 30,
  showGlow = true,
  glowColor = '#c4f1ff',
  debug = false,
  children
}: PlanetModelProps) {
  const planetRef = useRef<THREE.Group>(null);
  const childRef = useRef<THREE.Object3D>();

  useFrame(({ clock }) => {
    if (planetRef.current) {
      if (!childRef.current && spinnerObjectName) {
        // init child ref
        childRef.current = planetRef.current.getObjectByName(spinnerObjectName);
      }

      const delta = Math.max(1 / 60, clock.getDelta());

      // rotate planet
      planetRef.current.rotateY(rad(planetSpeed) * delta);

      // rotate child spinner
      childRef.current &&
        childRef.current.rotateOnWorldAxis(
          Object3D.DEFAULT_UP,
          rad(spinnerSpeed) * delta
        );
    }
  });

  return (
    <group scale={scale} position={position}>
      <group ref={planetRef} rotation={rotation}>
        {debug && <axesHelper args={[5]}></axesHelper>}
        <GltfModel debug={debug} fileName={fileName} />
        {children}
      </group>
      {showGlow && <Glow scale={scale * 1.1} near={-25} color={glowColor} />}
    </group>
  );
}
