import React from 'react';
import { PlanetModel, PlanetFiles } from './PlanetModel';
import { rad } from '../utils';

type PlanetProps = {
  position?: [number, number, number];
};

export function DesertPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      glowColor="#fac9ac"
      fileName={PlanetFiles.desert}
    />
  );
}

export function IcePlanet({ position }: PlanetProps) {
  return <PlanetModel position={position} fileName={PlanetFiles.ice} />;
}

export function CrystalPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      glowColor="#dea8f7"
      position={position}
      fileName={PlanetFiles.crystal}
    />
  );
}

export function CandyPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      glowColor="#f7c8a8"
      fileName={PlanetFiles.candy}
    />
  );
}

export function RedPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.red}
      glowColor="#fab1ac"
      spinnerObjectName="Rings"
      spinnerSpeed={50}
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
      glowColor="#f5e89f"
      glowLight={2}
      scale={3}
      glowScale={1.1}
    />
  );
}

export function Earth({ position }: PlanetProps) {
  return (
    <PlanetModel
      planetSpeed={-25}
      position={position}
      rotation={[0, 0, rad(15)]}
      fileName={PlanetFiles.earth}
    >
      <PlanetModel
        position={[3, 0, 0]}
        fileName={PlanetFiles.moon}
        scale={0.1}
        planetSpeed={25}
        glowColor="white"
        glowScale={3.5}
      ></PlanetModel>
    </PlanetModel>
  );
}
