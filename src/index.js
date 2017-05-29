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

    var tl = new TimelineMax({ repeat: -1 });
    tl.to( signpost.obj.rotation, 10, { y: Math.PI * 2, ease:Linear.easeNone } );

    window.signpost = signpost;
    window.signpostRotator = tl;

}

function animate() {

    requestAnimationFrame(animate);
    scene.cameraControl.update();
    render();

}

// render the scene
function render() {
    scene.render();
}
