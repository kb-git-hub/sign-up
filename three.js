import * as THREE from 'three';
import { FlatShading, Raycaster } from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js"

//randomization
const
    min = -1,
    max = 1,
    randomInteger = Math.floor(Math.random() * (max - min + 1)) + min

// Plane Dimensions
const world = {
    plane: {
        width: 100,
        height: 30,
        widthSegments: 20,
        heightSegments: 20,
        rotation: {
            x: -0.6,
            y: 1,
            z: 1,
        }
    }
}

// Constant Variable declarations

const threeDimEl = document.querySelector('.threeDimDiv')
const
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer()

const
    geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments),
    material = new THREE.MeshPhongMaterial({
        color: '#84CC16',
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading
    }),
    planeGeo = new THREE.Mesh(geometry, material),
    light = new THREE.DirectionalLight('#84CC16', 1),
    backLight = new THREE.DirectionalLight('#84CC16', 1),
    { array } = planeGeo.geometry.attributes.position,
    rayCaster = new THREE.Raycaster()

light.position.set(0, 0, 1)
backLight.position.set(0, 0, -1)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
threeDimEl.appendChild(renderer.domElement)

scene.add(planeGeo, light, backLight)


for (let i = 0; i < array.length; i += 3) {
    const
        x = array[i],
        y = array[i + 1],
        z = array[i + 2]
    array[i + 2] = z + Math.random()
}

// set up Plane Rotation and Camera Position
camera.position.z = 10
planeGeo.rotation.x = world.plane.rotation.x

const color2 = new THREE.Color( '#27272A' );
scene.background = color2
// Non-animate render
renderer.render(scene, camera)
// new OrbitControls(camera, renderer.domElement)



// Mouse tracking
const mouse = {
    x: undefined,
    y: undefined
}


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)


    //raycaster intersections
    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObject(planeGeo)
    if (intersects.length > 0){
        console.log('intersecting Mesh');
    }

}

// animate()

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1
})


