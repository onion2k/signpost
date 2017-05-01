import { 
    WebGLRenderer, 
    CylinderGeometry, 
    MeshPhongMaterial, 
    Mesh, 
    Object3D,
    Vector3,
    FlatShading
} from '../node_modules/three/build/three.module';

import signpostScene from './signpostScene';
import signpostGen from './signpost';

var arms = require('./arms.json');

var scene, renderer;
var camera;
var signpost, post, base;

if (!init()) animate();

// init the scene
function init() {

    let wrapper = document.getElementById('wrapper');

    let width = wrapper.offsetWidth;
    let height = wrapper.offsetHeight;

    scene = new signpostScene(width, height);

    wrapper.appendChild(scene.renderer.domElement);

    signpost = new signpostGen();

    for (var arm in arms) {
        signpost.arm(arms[arm].placename, arms[arm].bearing, arms[arm].distance);
    }

    scene.addObject(signpost.obj);

}

function animate() {

    requestAnimationFrame(animate);
    signpost.obj.rotation.y += 0.01;
    render();

}

// render the scene
function render() {
    scene.render();
}
