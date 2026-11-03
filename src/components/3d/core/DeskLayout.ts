import * as THREE from 'three';

export const DESK_DIMS = {
  w: 12.4,
  d: 6.2,
  top: 0.3,
  legs: 7.2,
};

export interface DeskItemTransform {
  position: [number, number, number];
  rotY?: number;
  scale?: number;
  size?: number;
}

export const DESK_LAYOUT = {
  laptop: { position: [0.5, 0, 0.1] as [number, number, number], rotY: 0.1 },
  tablet: { position: [-3, 0, 0.75] as [number, number, number], rotY: 0.38 },
  printer: { position: [-5.25, 0, 0.35] as [number, number, number], rotY: 0.3 },
  phone: { position: [3.3, 0, 1] as [number, number, number], rotY: -0.2 },
  mug: { position: [4.55, 0, -0.75] as [number, number, number] },
  plant: { position: [5.45, 0, -2.2] as [number, number, number] },
  lamp: {
    base: [4.85, 0, 1.15] as [number, number, number],
    target: [4.2, 0, 1.25] as [number, number, number],
  },
  notebook: { position: [2.2, 0, 2] as [number, number, number], rotY: 0.4 },
  zoro: { position: [-4.35, 0, -2] as [number, number, number], rotY: 0.25 },
  cards: { position: [2.82, 0, -0.4] as [number, number, number], rotY: -0.45 },
  cat: { position: [-1.45, 0, 2.38] as [number, number, number], rotY: 0.05, size: 0.92 },
  photo: { position: [3, 0, -1.8] as [number, number, number], rotY: -0.32, scale: 0.75 },
  speaker: { position: [-5.2, 0, 2.6] as [number, number, number] },
  record: { position: [5.1, 0, 2.5] as [number, number, number], rotY: -0.35, scale: 0.4 },
  parcel: { position: [0.85, 0, 2.7] as [number, number, number], rotY: -0.28, scale: 1 },
  glasses: { position: [-3.35, 0, 2.3] as [number, number, number], rotY: 0.22 },
};

export const CAMERA_PRESETS = {
  wide: { pos: new THREE.Vector3(-4.5, 10.5, 17.5), look: new THREE.Vector3(0.2, 1.25, 0.3) },
  tall: { pos: new THREE.Vector3(-13, 17, 15), look: new THREE.Vector3(0, 0.6, 0) },
  intro: { pos: new THREE.Vector3(3.5, 15, 27), look: new THREE.Vector3(0, 0, 0) },
  laptop: { pos: new THREE.Vector3(0.5, 3.0, 3.6), look: new THREE.Vector3(0.5, 0.8, 0.1) },
  tablet: { pos: new THREE.Vector3(-3, 3.8, 3.8), look: new THREE.Vector3(-3, 0.5, 0.75) },
  printer: { pos: new THREE.Vector3(-4.2, 3.4, 4.0), look: new THREE.Vector3(-4.8, 0.8, 0.4) },
  phone: { pos: new THREE.Vector3(3.3, 2.8, 3.2), look: new THREE.Vector3(3.3, 0.5, 1.0) },
  diary: { pos: new THREE.Vector3(2.5, 6.4, 5.6), look: new THREE.Vector3(2.2, 0.1, 2) },
  card: { pos: new THREE.Vector3(2.8, 3.0, 2.0), look: new THREE.Vector3(2.82, 0.3, -0.4) },
};
