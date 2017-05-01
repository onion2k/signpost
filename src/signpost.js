import {
    MeshPhongMaterial,
    Texture,
    BoxGeometry,
    CylinderGeometry,
    Mesh, 
    Object3D,
    Vector3,
    FlatShading
} from '../node_modules/three/build/three.module';

export default class signpostGen {

    constructor(){

        this.id = 1;
        this.arms = [];
        this.obj = new Object3D();

        this.create();

    }

    arm(placename, direction, distance){

        let len = placename.length;

        var canvas = document.createElement('canvas');

        this.texture(canvas, placename);

        var texture = new Texture(canvas);

        texture.needsUpdate = true;
        
        var armMaterial = new MeshPhongMaterial({ map: texture, color: 0xffffff, shininess: 0, shading: FlatShading });
        var armGeo = new BoxGeometry(12 + (len * 2), 6, 1);
        var arm = new Mesh(armGeo, armMaterial);

        arm.position.y = 66 - (this.arms.length * 5);
        arm.position.x = (12 + (len * 2) / 2) - 3;

        var joint = new Object3D();
        joint.rotation.y = direction;

        joint.add(arm);

        this.obj.add(joint);

        this.arms.push({'placename': placename, 'distance': distance});

    }

    texture(canvas, placename){

        canvas.width = 256;
        canvas.height = 64;

        var ctx = canvas.getContext('2d');

        ctx.font = '20pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(placename, canvas.width / 2, canvas.height / 2);

    }

    create() {

        var postMaterial = new MeshPhongMaterial({ color: 0xdddddd, shininess: 10, shading: FlatShading });
        var postGeo = new CylinderGeometry(4, 4, 80, 12, 1);
        var post = new Mesh(postGeo, postMaterial);
        post.position.y = 30;

        this.obj.add(post);

        var baseMaterial = new MeshPhongMaterial({ color: 0x00ff00, shininess: 10, shading: FlatShading });
        var baseGeo = new CylinderGeometry(32, 32, 1, 32, 1);
        var base = new Mesh(baseGeo, baseMaterial);

        this.obj.add(base);

    }

}