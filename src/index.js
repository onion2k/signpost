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

if (!init()) animate();

// init the scene
function init() {

    let wrapper = document.getElementById('wrapper');

    let width = wrapper.offsetWidth;
    let height = wrapper.offsetHeight;

    scene = new signpostScene(width, height);

    wrapper.appendChild(scene.renderer.domElement);

    signpost = new signpostGen();
    signpost.arm('Sunderland', 30, 100);
    signpost.arm('Newcastle', 45, 100);
    signpost.arm('Liverpool', 90, 100);
    signpost.arm('London', 110, 100);
    signpost.arm('San Franscisco', 170, 100);
    signpost.arm('New York', 180, 100);
    signpost.arm('Paris', 230, 100);
    signpost.arm('Rome', 240, 100);

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
