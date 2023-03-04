import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

//RESPONSIVENESS


//SCENE SETUP - https://threejs.org/docs/index.html?q=images#manual/en/introduction/Creating-a-scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.AmbientLight('white', 3); // soft white light
scene.add(light);

const canvas = document.querySelector("canvas.three-canvas");


const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
scene.background = null;

const width = window.innerWidth;
const height = window.innerHeight;

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

//https://www.youtube.com/watch?v=r4bepZ2PEUw
//https://discoverthreejs.com/book/first-steps/world-app/#systems-the-resizer-module-1
function resizeScene() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height); //reset the dimensions to the current width and height
  camera.aspect = width / height; //changes the camera's aspect ratio to match the viewport
  camera.updateProjectionMatrix(); //updates the object that the camera stores its frustrum in (Blue, 2019)
};

window.addEventListener('resize', resizeScene);


camera.position.x = 3;
camera.position.y = 0;
camera.position.z = 0;


const navigate = $('.navigate');
const next = $('#next');
const prev = $('#prev');

var transitioning = false;

prev.click(() => {
  if (!gsap.isTweening(camera.position)) {
    gsap.to(camera.position, {
      duration: 2,
      x: 3,
      y: 0,
      z: 0,
      ease: "power3.inOut"
    });
    gsap.to(garden.position, {
      duration: 3,
      y: -5,
      ease: "power3.inOut"
    });
    gsap.to(".container", {
      duration: 2.5,
      backgroundSize: 150,
      ease: "power2.inOut"
    });
    gsap.to(rose.position, {
      duration: 3,
      y: -0.5,
      ease: "power3.inOut"
    });
    gsap.to(".elements", {
      duration: 2.5,
      translateY: 0,
      ease: "power2.inOut"
    });
    gsap.to(".title", {
      duration: 3,
      opacity: 1,
      ease: "power3.inOut"
    });
    gsap.to(".story-text", {
      duration: 2,
      translateY: 0,
      ease: "power3.inOut"
    });
    story_text[0].innerHTML = "Explore the attraction";
    transitioning = !transitioning;
  }
})



next.click(() => {
  if (!gsap.isTweening(camera.position)) {
    gsap.to(camera.position, {
      duration: 2,
      z: -6,
      y: -2,
      x: 5,
      ease: "power3.inOut"
    });
    gsap.to(garden.position, {
      duration: 3,
      y: -2.5,
      z: -6.5,
      ease: "power3.inOut"
    });
    gsap.to(rose.position, {
      duration: 3,
      y: 2,
      ease: "power3.inOut"
    });
    gsap.to(".container", {
      duration: 2.5,
      backgroundSize: 100,
      ease: "power2.inOut"
    });
    gsap.to(".elements", {
      duration: 2.5,
      translateY: -1000,
      ease: "power2.inOut"
    });
    gsap.to(".title", {
      duration: 1,
      opacity: 0,
      ease: "power3.inOut"
    });
    gsap.to(".story-text", {
      duration: 2,
      translateY: -360,
      ease: "power3.inOut"
    });
    story_text[0].innerHTML = '"I remember my first day in the park like it was yesterday. <br> The sun shone strongly, and the wind blew gently."';


    transitioning = !transitioning;
  }
})


const loadingManager = new THREE.LoadingManager();

const story_text = $('.story-text');

const loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.6, 1000),
  box: new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'dodgerblue' })
  )
};

var loaded = false;

loadingScreen.box.position.set(0, 0, 5);
loadingScreen.camera.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);
loadingScreen.scene.background = new THREE.Color('black');

loadingManager.onLoad = function () {
  console.log("loaded all resources");
  loaded = true;
  gsap.to(rose.position, {
    duration: 3,
    y: -0.5,
    ease: "power3.inOut"
  });
  gsap.to(".story-text", {
    duration: 1,
    delay: 2,
    opacity: 1,
    y: -15,
    ease: "power2.inOut"
  });
  gsap.to(".navigate", {
    duration: 1,
    delay: 2,
    opacity: 1,
    ease: "power2.inOut"
  });
  gsap.to(".elements", {
    duration: 1,
    opacity: 1,
    ease: "power2.inOut"
  });

  story_text[0].innerHTML = "Explore the attraction";
}

loadingManager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
}

const orbit = new OrbitControls(camera, renderer.domElement);



/*new RGBELoader(loadingManager)
  .load("./images/backgroundSky.hdr", function (hdri) {
    hdri.mapping = THREE.EquirectangularReflectionMapping;
    //scene.background = hdri;
   scene.environment = hdri;
  });*/



//https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models

/*const img_bg = new THREE.TextureLoader(loadingManager).load('./images/dusk_background.png');
 scene.background = img_bg;*/

const loader = new GLTFLoader(loadingManager);

let rose = null;

loader.load("./models/flower.gltf", function (model) {
  rose = model.scene;
  scene.add(rose);
  rose.scale.set(2, 2, 2);
  rose.position.y = 1;



}, undefined, function (error) {
  console.error(error);
});

let garden = null;

loader.load("./models/welland_gardenImportTest.gltf", function (model) {
  //model.scale.set(0.5,0.5,0.5);
  garden = model.scene;
  scene.add(garden);
  garden.scale.set(0.4, 0.4, 0.4);
  garden.position.y = -5;
  garden.position.z = -10;



}, undefined, function (error) {
  console.error(error);
});

let story = ["I remember my first day in the park", "What a beautiful day it was"];



//const clock = new THREE.Clock();
function animate() {
  if (loaded == false) {
    //story_text[0].innerHTML = "loading";
    loadingScreen.box.rotation.z += 0.02;
    requestAnimationFrame(animate);
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    return;
  }
  rose.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);


}

animate();
