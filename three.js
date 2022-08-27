import * as THREE from 'three';
import { FlatShading, Raycaster } from 'three';
import dat from "https://cdn.skypack.dev/dat.gui";

import { OrbitControls } from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js"

//randomization
const
    min = -1,
    max = 1,
    randomInteger = Math.floor(Math.random() * (max - min + 1)) + min


const threeDimEl = document.querySelector('.threeDimDiv')
const
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer()

const
    geometry = new THREE.PlaneGeometry(5, 5, 10, 10),
    material = new THREE.MeshPhongMaterial({
        color: '#84cc16',
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading
    }),
    planeGeo = new THREE.Mesh(geometry, material),
    light = new THREE.DirectionalLight('#84CC16', 1),
    light2 = new THREE.DirectionalLight('#F1F5F9', 1),
    { array } = planeGeo.geometry.attributes.position

light.position.set(0, 0, 1)
light2.position.set(4, 2, 3)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
threeDimEl.appendChild(renderer.domElement)

scene.add(planeGeo, light, light2)

camera.position.z = 5

for (let i = 0; i < array.length; i += 3) {
    const
        x = array[i],
        y = array[i + 1],
        z = array[i + 2]

    array[i + 2] = z + Math.random()

}

renderer.render(scene, camera)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    // planeGeo.rotation.x += 0.01
    // planeGeo.rotation.z += 0.01
    // planeGeo.rotatation.z += 0.01

}

// animate()