import * as THREE from "three";

let scene, camera, renderer;
let cube, sphere;
let ADD = 0.1;

const createGeometry = () => {
  let material = new THREE.MeshDepthMaterial();

  let geometry = new THREE.BoxGeometry(3, 3, 3);
  cube = new THREE.Mesh(geometry, material);

  geometry = new THREE.SphereGeometry(2, 30, 30);
  sphere = new THREE.Mesh(geometry, material);

  cube.position.z = -5;
  cube.position.x = 3;
  sphere.position.z = 5;
  sphere.position.x = -3;

  scene.add(cube);
  scene.add(sphere);
};

const init = () => {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // create and locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 10;

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createGeometry();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  sphere.position.z -= ADD;
  cube.position.z += ADD;

  if (sphere.position.z > 5 || sphere.position.z < -5) ADD *= -1;

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
mainloop();
