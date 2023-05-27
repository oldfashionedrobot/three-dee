import React, { useRef, useMemo } from 'react';
import { Object3D } from 'three';
import { rad } from '../utils';
import { Glow } from './Glow';
import { useFrame } from '@react-three/fiber';
import { GltfModel, GltfModelProps } from './GltfModel';

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
  moon = '/planets/moon.glb',
  sun = '/planets/sun.glb'
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
  glowLight?: number;
  glowColor?: string;
  glowScale?: number;
  gltfProps?: Partial<GltfModelProps>;
  debug?: boolean;
  children?: React.ReactNode;
};

const SCALE_UPPER = 5;
const GLOW_SCALE = 1.5;

export const PlanetModel: React.FC<PlanetModelProps> = React.memo(
  ({
    position = [0, 0, 0] as const,
    rotation = [0, 0, 0] as const,
    scale = 1,
    spinnerObjectName,
    fileName = PlanetFiles.toxic,
    planetSpeed = -20,
    spinnerSpeed = 30,
    showGlow = true,
    glowLight,
    glowColor = '#c4f1ff',
    glowScale = 1,
    gltfProps,
    debug = false,
    children
  }) => {
    const planetRef = useRef<THREE.Group>(null);
    const childRef = useRef<THREE.Object3D>();
    const radSpeed = useMemo(() => rad(planetSpeed), [planetSpeed]);
    const radSpinnerSpeed = useMemo(() => rad(spinnerSpeed), [spinnerSpeed]);
    const groupScaleVal = useMemo(() => scale * SCALE_UPPER, [scale]);
    const glowScaleVal = useMemo(
      () => scale * SCALE_UPPER * GLOW_SCALE * glowScale,
      [scale, glowScale]
    );

    useFrame((_, delta) => {
      if (planetRef.current) {
        if (!childRef.current && spinnerObjectName) {
          // init child ref
          childRef.current =
            planetRef.current.getObjectByName(spinnerObjectName);
        }

        // rotate planet
        planetRef.current.rotateY(radSpeed * delta);

        // rotate child spinner
        childRef.current &&
          childRef.current.rotateOnWorldAxis(
            Object3D.DEFAULT_UP,
            radSpinnerSpeed * delta
          );
      }
    });

    return (
      <group scale={groupScaleVal} position={position}>
        <group ref={planetRef} rotation={rotation as any}>
          {debug && <axesHelper args={[5]}></axesHelper>}
          <GltfModel debug={debug} fileName={fileName} {...gltfProps} />
          {children}
        </group>
        {showGlow && <Glow scale={glowScaleVal} near={-25} color={glowColor} />}
        {glowLight && <pointLight color={glowColor} intensity={glowLight} />}
      </group>
    );
  }
);
