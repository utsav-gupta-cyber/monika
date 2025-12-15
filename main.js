import { initHandTracking } from "./handTracker.js";
import { heartShape, flowerShape, saturnShape } from "./particleShapes.js";

const canvas = document.getElementById("three-canvas");
const video = document.getElementById("video");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(innerWidth, innerHeight);

const particlesCount = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);

let currentShape = heartShape;

for (let i = 0; i < particlesCount; i++) {
  const t = Math.random() * Math.PI * 2;
  const [x, y] = currentShape(t);
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = Math.random() * 20 - 10;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.8,
  vertexColors: false,
  color: 0xff66cc
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

let handX = 0, handY = 0;

// Hand movement → particle control
initHandTracking(video, (x, y) => {
  handX = (x - 0.5) * 100;
  handY = -(y - 0.5) * 100;

  material.color.setHSL(x, 1, 0.5);
});

// Shape switching
window.addEventListener("keydown", e => {
  if (e.key === "1") currentShape = heartShape;
  if (e.key === "2") currentShape = flowerShape;
  if (e.key === "3") currentShape = saturnShape;
});

function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.002;
  particles.rotation.x = handY * 0.002;
  particles.rotation.y = handX * 0.002;

  renderer.render(scene, camera);
}

animate();

