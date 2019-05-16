import * as THREE from "three";

const torusArray = [];
let ADD = 0.05;

const randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return from + x;
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

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  if (Math.random() < 0.2) createTorusRain();

  torusArray.forEach(item => {
    item.position.y -= ADD;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
