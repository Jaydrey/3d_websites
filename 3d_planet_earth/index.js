import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// create scene
const scene = new THREE.Scene();

// create camera
const width = innerWidth;
const height = innerHeight;
const fieldOfView = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far);
camera.position.z = 3;

// create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
// set size
renderer.setSize(width, height);
// append to body
document.body.appendChild(renderer.domElement);

// create controls to interact with objects
const controls = new OrbitControls(camera, renderer.domElement);

// create a group
const earthGroup = new THREE.Group();
// make the earth tilt 23.4 degrees
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
// get a spherical shaped geometry
const geometry = new THREE.IcosahedronGeometry(1, 12);
// loads textures of images
const loader = new THREE.TextureLoader();

const material = new THREE.MeshStandardMaterial({
   map: loader.load("./assets/earth_1.jpeg"),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const earthLightsMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/earth_dark_light.jpeg"),
    blending: THREE.AdditiveBlending,
});
const earthLightsMesh = new THREE.Mesh(geometry, earthLightsMaterial);
earthGroup.add(earthLightsMesh);

// add light that lights the scene
const sunLight = new THREE.DirectionalLight(0xecffff);
sunLight.position.set(-2, -.5, 1)
scene.add(sunLight);

const animate = (t = 0) =>{
    requestAnimationFrame(animate);

    // spinning earth
    earthMesh.rotation.y += 0.002;
    earthLightsMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();

