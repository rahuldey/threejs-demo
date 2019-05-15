import * as THREE from "three";

let scene, camera, renderer, torus1, torus2, torus3;
let ADD = 0.05;

const createTorus = (x, y, color) => {
  let geometry = new THREE.TorusGeometry(x, y, 2, 50, 2 * Math.PI);
  let material = new THREE.MeshBasicMaterial({
    color: color
  });
  let torus = new THREE.Mesh(geometry, material);
  torus.rotation.x += 1;
  torus.rotation.y += 0.5;
  return torus;
};

const addTorus = () => {
  torus1 = createTorus(1, 0.225, 0xe9d687);
  torus2 = createTorus(1.5, 0.225, 0xebc93e);
  torus3 = createTorus(2, 0.225, 0xe9d687);

  scene.add(torus1);
  scene.add(torus2);
  scene.add(torus3);
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

  addTorus();

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
