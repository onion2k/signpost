import { 
    WebGLRenderer, 
    Scene, 
    DirectionalLight,
    DirectionalLightHelper,
    PerspectiveCamera, 
    CylinderGeometry, 
    MeshPhongMaterial, 
    Mesh, 
    Object3D,
    Vector3,
    FlatShading
} from '../node_modules/three/build/three.module';

import signpostGenerator from './signpost';

var scene, renderer;
var camera;
var signpost, post, base;

if (!init()) animate();

// init the scene
function init() {

    let wrapper = document.getElementById('wrapper');

    let width = wrapper.offsetWidth;
    let height = wrapper.offsetHeight;

    renderer = new WebGLRenderer({
        antialias: true,	// to get smoother output
        alpha: true
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height);

    wrapper.appendChild(renderer.domElement);

    // create a scene
    scene = new Scene();

    var light = new DirectionalLight(0xffffff);
    light.position.set(10, 10, 10);
    scene.add(light);

    var targetObject = new Object3D();
    targetObject.position.set(100, 100, 100);
	light.target = targetObject;
	scene.add(targetObject);

    // put a camera in the scene
    camera = new PerspectiveCamera(65, width / height, 1, 10000);
    camera.position.set(0, 100, 100);
    camera.lookAt(new Vector3(0,40,0));
    scene.add(camera);

    signpost = new Object3D();

    var postMaterial = new MeshPhongMaterial({ color: 0xdddddd, shininess: 10, shading: FlatShading });
    var postGeo = new CylinderGeometry(4, 4, 64, 12, 1);
    post = new Mesh(postGeo, postMaterial);
    post.position.y = 30;

    signpost.add(post);

    var baseMaterial = new MeshPhongMaterial({ color: 0x00ff00, shininess: 10, shading: FlatShading });
    var baseGeo = new CylinderGeometry(32, 32, 1, 32, 1);
    base = new Mesh(baseGeo, baseMaterial);

    signpost.add(base);

    scene.add(signpost);

}

function animate() {

    requestAnimationFrame(animate);
    signpost.rotation.y += 0.01;
    render();

}

// render the scene
function render() {
    renderer.render(scene, camera);
}
