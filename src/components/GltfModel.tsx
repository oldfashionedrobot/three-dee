import React, { forwardRef, useRef } from 'react';
import { ThreeEvent, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export type GltfModelProps = {
  onClick?: () => void;
  fileName: string;
  objectName?: string;
  emissiveChild?: string | string[];
  emissiveIntensity?: number;
  emissiveColor?: THREE.ColorRepresentation;
  debug?: boolean;
  [rest: string]: any;
};

export const GltfModel = forwardRef(function (
  {
    onClick,
    fileName,
    objectName,
    emissiveChild,
    emissiveIntensity,
    emissiveColor,
    debug = false,
    ...rest
  }: GltfModelProps,
  ref
) {
  const gltf = useLoader(GLTFLoader, fileName);
  let model: THREE.Object3D = gltf.scene;

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    onClick && onClick();
  }

  if (emissiveChild && emissiveIntensity) {
    // wanky, but whatever
    if (Array.isArray(emissiveChild)) {
      emissiveChild.map((child) => setEmissive(child, emissiveIntensity));
    } else {
      setEmissive(emissiveChild, emissiveIntensity);
    }
  }

  if (debug) gltf.scene.traverse((obj) => console.log(obj.name));

  if (objectName) model = gltf.scene.getObjectByName(objectName) || model;

  return <primitive onClick={handleClick} ref={ref} object={model} {...rest} />;

  function setEmissive(childObject: string, intensity: number) {
    const childMesh: THREE.Mesh = gltf.scene.getObjectByName(
      childObject
    ) as THREE.Mesh;

    const materials = childMesh.material;
    // console.log(materials);
    const mat: THREE.MeshStandardMaterial = (
      Array.isArray(materials) ? materials[0].clone() : materials.clone()
    ) as THREE.MeshStandardMaterial;

    childMesh.material = mat;

    mat.emissiveIntensity = intensity;
    mat.emissive = emissiveColor
      ? new THREE.Color(emissiveColor)
      : new THREE.Color(1, 1, 1);
  }
});
