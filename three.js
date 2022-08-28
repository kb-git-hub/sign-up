import * as THREE from 'three';
import { FlatShading, Raycaster } from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js"


//lime green 0.51, 0.8, 0.08
// slate 0.12, 0.16, 0.23
//stone 0.11, 0.10, 0.09

//randomization
const
    min = -0.2,
    max = 0.2,
    randomFloat = (min, max, decimals) => (Math.random() * (max - min) + min)

// Plane Dimensions
const world = {
    plane: {
        width: 100,
        height: 60,
        widthSegments: 40,
        heightSegments: 40,
        rotation: {
            x: 0.3,
            y: 0.2,
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
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        vertexColors: true
    }),
    planeGeo = new THREE.Mesh(geometry, material),
    light = new THREE.DirectionalLight('#78716c', 1),
    backLight = new THREE.DirectionalLight('#84CC16', 1),
    { array } = planeGeo.geometry.attributes.position,
    rayCaster = new THREE.Raycaster()

light.position.set(0, 0, 1)
backLight.position.set(0, 0, -1)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
threeDimEl.appendChild(renderer.domElement)

scene.add(planeGeo, light, backLight)

// Random values array
const randomValues = []
//randomize vert positions
for (let i = 0; i < array.length; i++) {

    if (i % 3 === 0) {
        const
            x = array[i],
            y = array[i + 1],
            z = array[i + 2]

        array[i] = x + randomFloat(min, max)
        array[i + 1] = y + randomFloat(min, max)
        array[i + 2] = z + randomFloat(min, max)
    }
    randomValues.push(randomFloat(min, max) * Math.PI*2)
}

//Plane Geometry Original Position
planeGeo.geometry.attributes.position.originalPosition = planeGeo.geometry.attributes.position.array

//Plane Geometry random Values array
planeGeo.geometry.attributes.position.randomValues = randomValues

// Vertex Colors Array
const colors = []
for (let i = 0; i < planeGeo.geometry.attributes.position.count; i++) {
    colors.push(0.11, 0.10, 0.09)
}
planeGeo.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))


// set up Plane Rotation and Camera Position
camera.position.z = 10
planeGeo.rotation.x = world.plane.rotation.x
planeGeo.rotation.y = world.plane.rotation.y

const bgColor = new THREE.Color('#141211');
scene.background = bgColor

// Non-animate render
renderer.render(scene, camera)

// Mouse tracking
const mouse = {
    x: undefined,
    y: undefined
}

// Orbital Controls
// const controls = new OrbitControls(camera, renderer.domElement)

let frame = 0
function animate() {
    frame += 0.01
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    const { array, originalPosition, randomValues } = planeGeo.geometry.attributes.position
    for (let i = 0; i < array.length; i += 3) {
        //x
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.008
        //y
        array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i+1]) * 0.008
        // array[i+2] = originalPosition[i] + Math.cos(frame + randomValues[i+2]) * 0.02
    
    
    }

    planeGeo.geometry.attributes.position.needsUpdate = true



    //raycaster intersections
    rayCaster.setFromCamera(mouse, camera)
    const intersects = rayCaster.intersectObject(planeGeo)
    if (intersects.length > 0) {

        const { color } = intersects[0].object.geometry.attributes

        // vert 1
        color.setX(intersects[0].face.a, 0.51)
        color.setY(intersects[0].face.a, 0.8)
        color.setZ(intersects[0].face.a, 0.08)

        // vert 2
        color.setX(intersects[0].face.b, 0.51)
        color.setY(intersects[0].face.b, 0.8)
        color.setZ(intersects[0].face.b, 0.08)

        // vert 3
        color.setX(intersects[0].face.c, 0.51)
        color.setY(intersects[0].face.c, 0.8)
        color.setZ(intersects[0].face.c, 0.08)

        color.needsUpdate = true

        const
            initialColor = {
                r: 0.11,
                g: 0.10,
                b: 0.09
            },
            hoverColor = {
                r: 0.51,
                g: 0.8,
                b: 0.08
            }

        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                // vert 1
                color.setX(intersects[0].face.a, hoverColor.r)
                color.setY(intersects[0].face.a, hoverColor.g)
                color.setZ(intersects[0].face.a, hoverColor.b)

                // vert 2
                color.setX(intersects[0].face.b, hoverColor.r)
                color.setY(intersects[0].face.b, hoverColor.g)
                color.setZ(intersects[0].face.b, hoverColor.b)

                // vert 3
                color.setX(intersects[0].face.c, hoverColor.r)
                color.setY(intersects[0].face.c, hoverColor.g)
                color.setZ(intersects[0].face.c, hoverColor.b)

                color.needsUpdate = true
            }
        })

    }
}

animate()

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1
})


