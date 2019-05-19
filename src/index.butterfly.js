import * as THREE from "three";

let scene, camera, renderer, axes;
let butterfly;
let ADD = 0.15;

const createAxes = () => {
  axes = new THREE.AxesHelper(5);
  scene.add(axes);
};

const createShape = () => {
  let geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(2, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0.75, 1.5, -2));
  geometry.vertices.push(new THREE.Vector3(1, 1.5, 2));

  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(0, 1, 3));

  let material = new THREE.MeshBasicMaterial({
    color: 0xff460d,
    side: THREE.DoubleSide
  });

  butterfly = new THREE.Mesh(geometry, material);
  scene.add(butterfly);
};

const init = () => {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // create and locate the camera
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 20;

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createShape();
  butterfly.rotation.z += 0.5;
  butterfly.rotation.x += 0.125;

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  butterfly.geometry.vertices[2].y -= ADD;
  butterfly.geometry.vertices[3].y -= ADD;
  butterfly.geometry.verticesNeedUpdate = true;

  if (
    butterfly.geometry.vertices[2].y < -1.5 ||
    butterfly.geometry.vertices[2].y > 1.5
  )
    ADD *= -1;

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
mainloop();
