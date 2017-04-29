import { WebGLRenderer, Scene, DirectionalLight, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from '../node_modules/three/build/three.module';

var scene, renderer;
var camera;
var box;

if (!init()) animate();

// init the scene
function init() {

    renderer = new WebGLRenderer({
        antialias: true,	// to get smoother output
        alpha: true
    });
    renderer.setClearColor(0xffffff, 0);

    renderer.setSize(800, 600);
    document.getElementById('wrapper').appendChild(renderer.domElement);

    // create a scene
    scene = new Scene();

    var light = new DirectionalLight(0xffffff);
    light.position.set(0, 0, -5).normalize();
    scene.add(light);

    // put a camera in the scene
    camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 2, 20);
    scene.add(camera);

    var boxGeo = new BoxGeometry(5, 5, 5);
    box = new Mesh(boxGeo, new MeshBasicMaterial({ color: 0x22ff22 }));

    scene.add(box);

}


function animate() {

    requestAnimationFrame(animate);
    box.rotation.y += 0.1;
    box.rotation.z += 0.1;
    render();

}

// render the scene
function render() {
    renderer.render(scene, camera);
}
