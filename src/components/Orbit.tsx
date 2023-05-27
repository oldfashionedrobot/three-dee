import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import { rad } from '../utils';
import { DoubleSide, Group } from 'three';

const torusRotation: [number, number, number] = [rad(-90), 0, 0];

export type OrbitProps = {
  radius?: number;
  offset?: number;
  speed?: number;
  children?: React.ReactNode;
};

export const Orbit: React.FC<OrbitProps> = React.memo(
  ({
    radius = 12,
    offset = Math.random() * 360,
    speed = -Math.random() * 15 - 5,
    children
  }) => {
    const ref = useRef<Group>(null);
    const torusArgs = useMemo(() => [radius, 0.03, 4, 80], [radius]);
    const orbitOffset: [number, number, number] = useMemo(
      () => [0, offset ? rad(offset) : 0, 0],
      [offset]
    );
    const radSpeed = useMemo(() => rad(speed), [speed]);
    const childrenWithPosition = useMemo(
      () =>
        React.Children.map(children, (child) => {
          // Checking isValidElement is the safe way and avoids a
          // typescript error too.
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // @ts-expect-error
              position: [radius, 0, 0] as any
            });
          }
          return child;
        }),
      [children, radius]
    );

    useFrame((_, delta) => {
      ref.current && ref.current.rotateY(radSpeed * delta);
    });

    return (
      <>
        <Torus args={torusArgs as any} rotation={torusRotation}>
          <meshBasicMaterial color="white" side={DoubleSide} />
        </Torus>
        <group ref={ref} rotation={orbitOffset}>
          {childrenWithPosition}
        </group>
      </>
    );
  }
);
