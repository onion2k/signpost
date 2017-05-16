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
    let height = wrapper.offsetHeight + 6;

    scene = new signpostScene(width, height);

    wrapper.appendChild(scene.renderer.domElement);

    signpost = new signpostGen();

    for (var arm in arms) {
        signpost.arm(arms[arm].placename, arms[arm].bearing, arms[arm].distance);
    }

    scene.addObject(signpost.obj);

    doTween();

    window.signpost = signpost;
    window.signpostRotator = signpostRotator;

}

function doTween() {

    signpost.obj.rotation.y = 0;
    window.signpostRotator = TweenLite.to(signpost.obj.rotation, 10, { y: Math.PI * 2, ease:Linear.easeNone, onComplete: doTween });

}

function animate() {

    requestAnimationFrame(animate);
    render();

}

// render the scene
function render() {
    scene.render();
}
