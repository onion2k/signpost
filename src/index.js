import { 
    WebGLRenderer, 
    Scene, 
    DirectionalLight, 
    PerspectiveCamera, 
    CylinderGeometry, 
    MeshLambertMaterial, 
    Mesh, 
    Object3D,
    FlatShading
} from '../node_modules/three/build/three.module';

var scene, renderer;
var camera;
var box;

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
    light.position.set(0, 0, 15).normalize();
    scene.add(light);

    // put a camera in the scene
    camera = new PerspectiveCamera(65, width / height, 1, 10000);
    camera.position.set(0, 5, 75);
    scene.add(camera);

    var boxGeo = new CylinderGeometry(5, 5, 50, 8, 1);
    box = new Mesh(boxGeo, new MeshLambertMaterial({ color: 0x22ff22, shading: FlatShading }));
    box.position.y = -10;

    scene.add(box);

}


function animate() {

    requestAnimationFrame(animate);
    box.rotation.y += 0.01;
    render();

}

// render the scene
function render() {
    renderer.render(scene, camera);
}
