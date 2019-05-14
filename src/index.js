import * as THREE from "three";

let scene, camera, renderer, cube, sphere;
const torusArray = [];
let ADD = 0.05;

const randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return from + x;
};

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

const createTorusRain = () => {
  let geometry = new THREE.TorusGeometry(0.25, 0.125, 30, 50, 2 * Math.PI);
  let material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
    wireframe: true
  });
  let torus = new THREE.Mesh(geometry, material);
  torus.position.x = randomInRange(-3, 3);
  torus.position.z = randomInRange(-4.5, 4.5);
  torus.position.y = 1.5;
  scene.add(torus);
  torusArray.push(torus);
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

  // createSphere();
  // createTorus();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  /*
  sphere.rotation.y += ADD;
  sphere.rotation.x += ADD;
  sphere.position.x += ADD;

  if (sphere.position.x > 1.5 || sphere.position.x < -1.5) ADD *= -1;
  */
  if (Math.random() < 0.2) createTorusRain();

  torusArray.forEach(item => {
    item.position.y -= ADD;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
