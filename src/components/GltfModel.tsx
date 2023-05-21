import React, { forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D, Mesh, MeshStandardMaterial } from 'three';

export type GltfModelProps = {
  fileName: string;
  objectName?: string;
  emissiveChild?: string;
  emissiveIntensity?: number;
  debug?: boolean;
  [rest: string]: any;
};

export const GltfModel = forwardRef(function (
  {
    fileName,
    objectName,
    emissiveChild,
    emissiveIntensity,
    debug = false,
    ...rest
  }: GltfModelProps,
  ref
) {
  const gltf = useLoader(GLTFLoader, fileName);
  let model: Object3D = gltf.scene;

  if (emissiveChild && emissiveIntensity) {
    // wanky, but whatever
    const sunMesh: Mesh = gltf.scene.getObjectByName(emissiveChild) as Mesh;
    const mat: MeshStandardMaterial = sunMesh.material as MeshStandardMaterial;
    mat.emissiveIntensity = emissiveIntensity;
  }

  if (debug) gltf.scene.traverse((obj) => console.log(obj.name));

  if (objectName) model = gltf.scene.getObjectByName(objectName) || model;

  return (
    <primitive
      ref={ref}
      object={model}
      {...rest}
      // onClick={(e: any) => console.log(e.object.name)}
    />
  );
});
