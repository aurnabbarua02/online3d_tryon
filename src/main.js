import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

var bag = null;
loader.load('Model/bag.glb', function (gltf) {
  bag = gltf.scene;
  bag.scale.set(1.4, 1.4, 1.4);
  bag.position.x = -2;
  bag.position.z = 2.2;
  bag.position.y = 0.3;
  // bag2.position(-2, 1, 0);
  bag.translateY(1);
  // bag.rotation.y = -1;
  scene.add(bag);
}, undefined, function (error) {
  console.error(error);
});
var scalePlane = null;
loader.load('Model/scale plane.glb', function (gltf) {
  scalePlane = gltf.scene;
  scalePlane.scale.set(1.4, 1.4, 1.4);
  scalePlane.position.x = -2;
  scalePlane.position.z = 2;
  scalePlane.position.y = 0.3;
  // bag2.position(-2, 1, 0);
  scalePlane.translateY(1);
  // bag.rotation.y = -1;
  scene.add(scalePlane);
}, undefined, function (error) {
  console.error(error);
});
var environment = null;
loader.load('Model/environment.glb', function (gltf) {
  environment = gltf.scene;
  environment.scale.set(1.3, 1.3, 1.3);
  // environment.position.x = -2;
  // environment2.position(-2, 1, 0);
  environment.translateY(1);
  environment.rotation.y = -90;
  scene.add(environment);
}, undefined, function (error) {
  console.error(error);
});


// Four directional lights for each direction (front, back, left, right)
const directionalLightFront = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLightFront.position.set(0, 3, 5);
scene.add(directionalLightFront);

const directionalLightBack = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLightBack.position.set(0, 3, -5);
scene.add(directionalLightBack);

const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLightLeft.position.set(-5, 3, 0);
scene.add(directionalLightLeft);

const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLightRight.position.set(5, 3, 0);
scene.add(directionalLightRight);
const keyboardState = {};
document.addEventListener('keydown', (event) => {
  keyboardState[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keyboardState[event.code] = false;
});

function animate() {
  requestAnimationFrame(animate);
  if (keyboardState['KeyA']) {
    camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * 0.1;
    camera.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * 0.1;
  }
  if (keyboardState['KeyD']) {
    camera.position.z += Math.cos(camera.rotation.y + Math.PI / 2) * 0.1;
    camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * 0.1;
  }
  if (keyboardState['KeyQ']) {
    camera.rotation.y += 0.01;
  }
  if (keyboardState['KeyE']) {
    camera.rotation.y -= 0.01;
  }
  if (keyboardState['KeyW']) {
    camera.position.z -= Math.cos(camera.rotation.y) * 0.1;
    camera.position.x -= Math.sin(camera.rotation.y) * 0.1;
  }
  if (keyboardState['KeyS']) {
    camera.position.z += Math.cos(camera.rotation.y) * 0.1;
    camera.position.x += Math.sin(camera.rotation.y) * 0.1;
  }
  if (keyboardState['KeyZ']) {
    camera.position.y += 0.1;
  }
  if (keyboardState['KeyX']) {
    camera.position.y -= 0.1;
  }

  renderer.render(scene, camera);
}
animate();
