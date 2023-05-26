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
      scale={0.6}
      fileName={PlanetFiles.desert}
    />
  );
}

export function IcePlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      gltfProps={{
        emissiveChild: 'Circle006',
        emissiveIntensity: 8,
        emissiveColor: '#eff7b2'
      }}
      position={position}
      scale={1.2}
      fileName={PlanetFiles.ice}
    />
  );
}

export function CrystalPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      gltfProps={{
        emissiveChild: 'Gem',
        emissiveIntensity: 0.1,
        emissiveColor: '#a8eaf7'
      }}
      glowColor="#dea8f7"
      position={position}
      scale={1.2}
      fileName={PlanetFiles.crystal}
    />
  );
}

export function CandyPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      scale={2}
      glowColor="#f7c8a8"
      fileName={PlanetFiles.candy}
    />
  );
}

export function ResourcePlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      position={position}
      fileName={PlanetFiles.resource}
      glowColor="#9ff5bc"
      spinnerObjectName="ROCKET"
      spinnerSpeed={100}
      rotation={[0, 0, rad(45)]}
      planetSpeed={-20}
    />
  );
}

export function RedPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      gltfProps={{
        emissiveChild: 'Circle006',
        emissiveIntensity: 0.3,
        emissiveColor: '#faf1ac'
      }}
      position={position}
      fileName={PlanetFiles.red}
      glowColor="#fab1ac"
      spinnerObjectName="Circle006"
      scale={1.5}
      rotation={[rad(-20), 0, rad(20)]}
      planetSpeed={-20}
    />
  );
}

export function ToxicPlanet({ position }: PlanetProps) {
  return (
    <PlanetModel
      gltfProps={{
        emissiveChild: ['TOXIC_SLUG', 'TOXIC_RIVER'],
        emissiveIntensity: 1,
        emissiveColor: 'rgb(62,170,10)'
      }}
      scale={0.8}
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
