import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, mixer, clock;
let cube, sphere;
let ADD = 0.1;

const createGeometry = () => {
  var loader = new GLTFLoader();
  loader.load(
    "../assets/DS.glb",
    function (gltf) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      var action = mixer.clipAction(gltf.animations[0]);
      action.play();
      scene.add(gltf.scene);
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened!!!!!");
    }
  );
};

const init = () => {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  clock = new THREE.Clock();

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // create the renderer
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;
  controls.update();

  createGeometry();

  document.body.appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
};

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();
