import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import { rad } from '../utils';
import { DoubleSide, Group } from 'three';

export type OrbitProps = {
  radius?: number;
  offset?: number;
  speed?: number;
  children?: React.ReactNode;
};

export function Orbit({
  radius = 12,
  offset = Math.random() * 360,
  speed = Math.random() * 15 + 5,
  children
}: OrbitProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    const delta = Math.max(1 / 60, clock.getDelta());
    ref.current && ref.current.rotateY(rad(speed) * delta);
  });

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      // @ts-expect-error
      return React.cloneElement(child, { position: [radius, 0, 0] as any });
    }
    return child;
  });

  return (
    <group ref={ref} rotation={[0, offset ? rad(offset) : 0, 0]}>
      <Torus args={[radius, 0.03, 4, 80]} rotation={[rad(-90), 0, 0]}>
        <meshBasicMaterial color="white" side={DoubleSide} />
      </Torus>
      {childrenWithProps}
    </group>
  );
}
