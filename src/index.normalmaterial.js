import * as THREE from "three";

let scene, camera, renderer;
let cube, normals;
let ADD = 0.05;

const createGeometry = () => {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshNormalMaterial();

  cube = new THREE.Mesh(geometry, material);
  normals = new THREE.FaceNormalsHelper(cube, 3);

  scene.add(cube);
  scene.add(normals);
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
  camera.position.z = 20;

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createGeometry();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  cube.rotation.x += ADD;
  normals.update();

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
mainloop();
