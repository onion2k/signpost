import {
    WebGLRenderer,
    Scene,
    PointLight,
    PointLightHelper,
    PerspectiveCamera,
    Object3D,
    Vector3
} from '../node_modules/three/build/three.module';

import OrbitControls from './OrbitControls';

export default class signpostScene {

    constructor(width, height){

        this.width = width;
        this.height = height;

        this.scene = new Scene();
        this.lights = [];
        this.cameras = [];
        this.cameraControl = null;

        this.addCamera();
        this.addLight();

        this.renderer = new WebGLRenderer({
            antialias: true,	// to get smoother output
            alpha: true
        });
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(this.width, this.height);

        this.addCameraControls();

    }

    render() {
        this.renderer.render(this.scene, this.cameras[0]);
    }

    addObject(obj) {
        this.scene.add(obj);
    }

    addCamera() {

        // put a camera in the scene
        var camera = new PerspectiveCamera(65, this.width / this.height, 1, 10000);
        camera.position.set(0, 85, 85);
        camera.lookAt(new Vector3(0,40,0));
        this.scene.add(camera);

        this.cameras.push(camera);

    }

    addCameraControls() {
        this.cameraControl = new OrbitControls(this.cameras[0], this.renderer.domElement);
        this.cameraControl.enableZoom = false;
        this.cameraControl.target.set(0, 40, 0);
    }

    addLight() {

        var light = new PointLight(0xffffff);
        light.position.set(150, 250, -50);
        this.scene.add(light);
        this.lights.push(light);

        var light = new PointLight(0xffffff);
        light.position.set(-150, 250, -50);
        this.scene.add(light);
        this.lights.push(light);

    }

}