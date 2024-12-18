import * as THREE from 'three';
import { init } from '../lib/core';

export default function () {
  const { scene, camera, animate } = init({
    useControls: true,
    useStats: true
  });
  camera.position.z = 5;

  const loader = new THREE.TextureLoader();
  const geo = new THREE.IcosahedronGeometry(1, 12);
  const mat = new THREE.MeshStandardMaterial({
    map: loader.load('./textures/00_earthmap1k.jpg')
  });
  const earthMesh = new THREE.Mesh(geo, mat);

  const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load('./textures/03_earthLights1k.jpg'),
    blending: THREE.AdditiveBlending
  });
  const lightsMesh = new THREE.Mesh(geo, lightsMat);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load('./textures/04_earthcloudmap.jpg'),
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  const cloudsMesh = new THREE.Mesh(geo, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);

  const stars = getStarfield(20000);

  const sunLight = new THREE.DirectionalLight(0xffffff);
  sunLight.position.set(-2, 0.5, 1.5);

  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geo, fresnelMat);
  glowMesh.scale.setScalar(1.01);

  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = (-23.4 * Math.PI) / 180;

  earthGroup.add(earthMesh);
  earthGroup.add(lightsMesh);
  earthGroup.add(cloudsMesh);
  earthGroup.add(glowMesh);

  scene.add(earthGroup);
  scene.add(sunLight);
  scene.add(stars);

  animate(() => {
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0025;
    glowMesh.rotation.y += 0.002;
  });
}

function getStarfield(numStars = 500) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius
    };
  }
  const verts: number[] = [];
  const colors: number[] = [];
  const positions: {
    pos: THREE.Vector3;
    hue: number;
    minDist: number;
  }[] = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load('./textures/stars/circle.png')
  });
  const points = new THREE.Points(geo, mat);
  return points;
}

function getFresnelMat({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 }
  };
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;
  const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending
    // wireframe: true,
  });
  return fresnelMat;
}
