import {
    WebGLRenderer,
    Scene,
    DirectionalLight,
    DirectionalLightHelper,
    PerspectiveCamera,
    Object3D,
    Vector3
} from '../node_modules/three/build/three.module';

export default class signpostScene {

    constructor(width, height){

        this.width = width;
        this.height = height;

        this.scene = new Scene();
        this.lights = [];
        this.cameras = [];

        this.addCamera();
        this.addLight();

        this.renderer = new WebGLRenderer({
            antialias: true,	// to get smoother output
            alpha: true
        });
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(this.width, this.height);


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
        camera.position.set(0, 100, 100);
        camera.lookAt(new Vector3(0,40,0));
        this.scene.add(camera);

        this.cameras.push(camera);

    }

    addLight() {

        var light = new DirectionalLight(0xffffff);
        light.position.set(10, 10, 10);
        this.scene.add(light);

        var targetObject = new Object3D();
        targetObject.position.set(100, 100, 100);
        light.target = targetObject;
        this.scene.add(targetObject);

        this.lights.push(light);

    }

}