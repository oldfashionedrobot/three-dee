import React, { forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

type GltfModelProps = {
  fileName: string;
  objectName?: string;
  debug?: boolean;
  [rest: string]: any;
};

export const GltfModel = forwardRef(function (
  { fileName, objectName, debug = false, ...rest }: GltfModelProps,
  ref
) {
  const gltf = useLoader(GLTFLoader, fileName);
  let model: Object3D = gltf.scene;

  if (debug) gltf.scene.traverse((obj) => console.log(obj.name));

  if (objectName) model = gltf.scene.getObjectByName(objectName) || model;

  return (
    <primitive
      ref={ref}
      object={model}
      {...rest}
      onClick={(e: any) => console.log(e.object.name)}
    />
  );
});
