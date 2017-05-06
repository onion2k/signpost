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

var scene, renderer;
var camera;
var signpost, post, base;
var arms = [];

if (!init()) animate();

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

    window.signpost = signpost;

}

function animate() {

    requestAnimationFrame(animate);
    signpost.obj.rotation.y += 0.02;
    render();

}

// render the scene
function render() {
    scene.render();
}
