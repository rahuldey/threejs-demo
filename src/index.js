import * as THREE from 'three';

let scene, camera, renderer, axes;
let ADD = 0.01;

const createAxes = () => {
  axes = new THREE.AxesHelper(5);
  scene.add(axes);
};

const createGeometry = () => {};

const init = () => {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // create and locate the camera
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 10;
  camera.position.x = 0.5;

  createAxes();

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
