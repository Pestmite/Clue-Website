import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const STARTz = 50;
const STARCOUNT = 200;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(STARTz);

renderer.render(scene, camera);

let RWAModel;

const loader = new GLTFLoader();
loader.load('/models/rwa.glb', gltf => {
  RWAModel = gltf.scene;

  RWAModel.scale.set(0.3, 0.3, 0.3);
  RWAModel.position.set(0, 0, 0);

  scene.add(RWAModel);

  animate();

  Array(500).fill().forEach(addStar);
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  // RWAModel.rotation.x += 0.002;
  RWAModel.rotation.y += 0.005;
  // RWAModel.rotation.z += 0.007;

  // controls.update();

  renderer.render(scene, camera);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const brightness = THREE.MathUtils.randFloat(0.8, 1);
  const hue = THREE.MathUtils.randFloat(0.05, 0.16);
  const color = new THREE.Color().setHSL(hue, 1, brightness);

  const material = new THREE.MeshStandardMaterial({ color: color });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(STARCOUNT));
  star.position.set(x, y, z);
  scene.add(star);
}


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.01 + STARTz;

  RWAModel.position.x = t * -0.0015;
  RWAModel.position.z = t * -0.0015;
}

document.body.onscroll = moveCamera;

function resizeCanvas() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resizeCanvas);