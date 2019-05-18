import * as THREE from "three";

const starWarsFontJSON = require("../assets/StarJedi.json");
const starWarsHollowFontJSON = require("../assets/StarJediHollow.json");

let scene, camera, renderer;
let headerText = [];
let scrollText;

let ADD = 0.25;
let SCROLLADD = 0.02;

const createGeometry = (starWarsFontJSON, starWarsHollowFontJSON) => {
  const loader = new THREE.FontLoader();
  const material = new THREE.MeshBasicMaterial({ color: 0xf7e351 });

  const starWarsFont = loader.parse(starWarsFontJSON);
  const starWarsHollowFont = loader.parse(starWarsHollowFontJSON);

  let geometry = new THREE.TextGeometry("STAR", {
    font: starWarsHollowFont,
    size: 3,
    height: 0
  });

  let text = new THREE.Mesh(geometry, material);
  text.position.x -= 7;
  text.position.y += 1.5;
  scene.add(text);
  headerText.push(text);

  geometry = new THREE.TextGeometry("WARS", {
    font: starWarsHollowFont,
    size: 3,
    height: 0
  });
  text = new THREE.Mesh(geometry, material);
  text.position.x -= 8;
  text.position.y -= 1.5;
  scene.add(text);
  headerText.push(text);

  var scroll =
    "It is a period of civil war.\nRebel spaceships, striking\nfrom a hidden base, have\nwon their first victory\nagainst the evil Galactic\nEmpire.\n\nDuring the battle, rebel\nspies managed to steal\nsecret plans to the Empires\nultimate weapon, the\nDEATH STAR, an armored\nspace station with enough\npower to destroy an entire\nplanet.\n\nPursued by the Empires\nsinister agents, Princess\nLeia races home aboard her\nstarship, custodian of the\nstolen plans that can save\nher people and restore\nfreedom to the galaxy….";

  geometry = new THREE.TextGeometry(scroll, {
    font: starWarsFont,
    size: 1,
    height: 0
  });

  scrollText = new THREE.Mesh(geometry, material);
  scrollText.position.x -= 10;
  scrollText.position.y -= 20;
  scrollText.rotation.x = -1;
  scene.add(scrollText);
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
  camera.position.z = 50;

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  createGeometry(starWarsFontJSON, starWarsHollowFontJSON);

  document.body.appendChild(renderer.domElement);
};

const mainloop = () => {
  headerText.forEach(item => {
    if (item.position.z < -150) {
      scene.remove(item);
    }
    item.position.z -= ADD;
  });
  scrollText.position.z -= SCROLLADD;
  scrollText.position.y += SCROLLADD / 2;
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
