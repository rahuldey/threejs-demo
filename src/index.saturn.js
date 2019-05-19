import * as THREE from "three";

let scene, camera, renderer, sphere, axes;
let torus = [];
let ADD = 0.01;

const createTorus = (x, y, color) => {
  let geometry = new THREE.TorusGeometry(x, y, 20, 50, 2 * Math.PI);
  let material = new THREE.MeshBasicMaterial({
    color: color
  });
  let torus = new THREE.Mesh(geometry, material);
  torus.rotation.x += 2;
  torus.rotation.y += 0.25;
  return torus;
};

const addPlanet = () => {
  let geometry = new THREE.SphereGeometry(0.7, 30, 30);
  let material = new THREE.MeshBasicMaterial({
    color: 0xaf6119
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

const addRings = () => {
  torus.push(createTorus(1, 0.225, 0xe9d687));
  torus.push(createTorus(1.5, 0.225, 0xebc93e));
  torus.push(createTorus(2, 0.225, 0xe9d687));

  torus.forEach(item => {
    scene.add(item);
  });
};

const createAxes = () => {
  axes = new THREE.AxesHelper(5);
  scene.add(axes);
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

  // populate the scene
  // createAxes();
  addRings();
  addPlanet();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  camera.position.y += ADD;

  if (camera.position.y > 1.75 || camera.position.y < -1.75) ADD *= -1;

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
mainloop();
