import * as THREE from 'three';

let scene, camera, renderer, axes;
let shape;
let ADD = 0.05;

const createAxes = () => {
  axes = new THREE.AxesHelper(5);
  scene.add(axes);
};

const createShape = () => {
  let geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(2, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 4, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 1));
  geometry.vertices.push(new THREE.Vector3(1, 2, -2));

  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(1, 2, 3));
  geometry.faces.push(new THREE.Face3(0, 2, 3));

  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true
  });

  shape = new THREE.Mesh(geometry, material);
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
  camera.position.x = 0.5;

  createAxes();

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createShape();
  scene.add(shape);

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  shape.rotation.y += ADD;
  shape.rotation.x += ADD;

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
