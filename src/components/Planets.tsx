import React from 'react';
import { PlanetModel, PlanetFiles } from './PlanetModel';
import { rad } from '../utils';

type PlanetProps = {
  position?: [number, number, number];
};

export function GreenPlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.green} />;
}

export function DesertPlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.desert} />;
}

export function IcePlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.ice} />;
}

export function CrystalPlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.crystal} />;
}

export function CandyPlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.candy} />;
}

export function ResourcePlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.resource}
      glowColor="#94f4ff"
      spinnerObjectName="ROCKET"
      spinnerSpeed={60}
      rotation={[0, 0, rad(45)]}
      planetSpeed={-20}
    />
  );
}

export function RedPlanet({ position }: PlanetProps) {
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

export function ToxicPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.toxic}
      glowColor="#d1f59f"
    />
  );
}

export function Sun({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.sun}
      glowColor="#d1f59f"
      glowLight={2}
      scale={2.5}
      glowScale={2}
      gltfProps={{
        emissiveChild: 'sun_sun_0',
        emissiveIntensity: 6
      }}
    />
  );
}

export function Earth({ position }: PlanetProps) {
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
        scale={0.25}
        planetSpeed={25}
        glowColor="white"
        glowScale={2}
      ></PlanetModel>
    </PlanetModel>
  );
}
