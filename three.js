import * as THREE from 'three';
import { FlatShading, Raycaster } from 'three';
import dat from "https://cdn.skypack.dev/dat.gui";

import { OrbitControls } from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js"


// const gui = new dat.GUI();

const threeDimEl = document.querySelector('.threeDimDiv')

const
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000),
    renderer = new THREE.WebGLRenderer()


renderer.setSize(innerWidth, innerHeight)
threeDimEl.appendChild(renderer.domElement)


const
    geometry = new THREE.PlaneGeometry(3,3),
    material = new THREE.MeshBasicMaterial({
        color: '#84cc16',
        side: THREE.DoubleSide
    }),
    planeGeo = new THREE.Mesh(geometry, material)

console.log({geometry});
scene.add(planeGeo)

camera.position.z = 5
renderer.render(scene, camera)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    planeGeo.rotation.x += 0.01
    planeGeo.rotation.y += 0.01
    planeGeo.rotation.z += 0.01
    

    
}

// animate()