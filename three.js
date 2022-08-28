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
            x: -0.1,
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
        // color: '#84CC16',
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        vertexColors: true
    }),
    planeGeo = new THREE.Mesh(geometry, material),
    light = new THREE.DirectionalLight(0xffffff, 1),
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

// Vertex Colors Array
const colors = []

for (let i = 0; i < planeGeo.geometry.attributes.position.count; i++) {
    colors.push(1,0,0)
    // colors.push(0.4,0.9,0.11)
}

planeGeo.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))


// set up Plane Rotation and Camera Position
camera.position.z = 50
planeGeo.rotation.x = world.plane.rotation.x

const bgColor = new THREE.Color( '#27272A' );
scene.background = bgColor

// Non-animate render
renderer.render(scene, camera)

// Mouse tracking
const mouse = {
    x: undefined,
    y: undefined
}

const controls = new OrbitControls( camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    //raycaster intersections
    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObject(planeGeo)
    if (intersects.length > 0){
        console.log(intersects[0].object.geometry.attributes.color);
        intersects[0].object.geometry.attributes.color.setX(0,0)
        intersects[0].object.geometry.attributes.color.setY(0,0)
        intersects[0].object.geometry.attributes.color.setZ(0,0)
        intersects[0].object.geometry.attributes.color.needsUpdate = true
    }
}

animate()

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1
})


