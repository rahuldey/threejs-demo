import * as THREE from "three";

let scene, camera, renderer, cube, sphere;
let ADD = 0.05;

const createCube = () => {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00a1cb });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

const createSphere = () => {
  let geometry = new THREE.SphereGeometry(1, 30, 30);
  let material = new THREE.MeshBasicMaterial({
    color: 0x00a1cb,
    wireframe: true
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

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

  // create the renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createSphere();
  // createCube();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  
  sphere.rotation.y += ADD;
  sphere.rotation.x += ADD;
  sphere.position.x += ADD;

  if (sphere.position.x > 1.5 || sphere.position.x < -1.5) ADD *= -1;

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
