import {
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    MeshBasicMaterial,
    Texture,
    BoxGeometry,
    CylinderGeometry,
    SphereGeometry,
    Mesh, 
    Object3D,
    Vector3,
    FlatShading,
    SmoothShading,
    Matrix4
} from '../node_modules/three/build/three.module';

export default class signpostGen {

    constructor(){

        this.id = 1;
        this.arms = [];
        this.obj = new Object3D();

        this.base();

    }

    arm(placename, direction, distance){

        let len = placename.length;
        var canvas = document.createElement('canvas');
        this.texture(canvas, placename, distance);

        var texture = new Texture(canvas);

        texture.needsUpdate = true;

        var armMaterials = [

            new MeshBasicMaterial({ color: 0xd4d4d4 }), // right
            new MeshBasicMaterial({ color: 0xd4d4d4 }), // left
            new MeshBasicMaterial({ color: 0xd4d4d4 }), // top
            new MeshBasicMaterial({ color: 0xd4d4d4 }), // bottom
            new MeshPhongMaterial({ map: texture, color: 0xffffff, shininess: 0, shading: FlatShading }), // front
            new MeshPhongMaterial({ map: texture, color: 0xffffff, shininess: 0, shading: FlatShading }) //back

        ];

        var armGeo = new BoxGeometry(12 + (len * 1), 6, 1);
        var arm = new Mesh(armGeo, armMaterials);

        arm.position.y = 66 - (this.arms.length * 6);
        arm.position.x = (12 + (len) / 2) - 5;

        var joint = new Object3D();
        joint.add(arm);
        joint.rotation.y = (Math.PI / 2) + (-1 * direction * 0.0174533);

        this.obj.add(joint);

        this.arms.push({'placename': placename, 'distance': distance, 'joint': joint});

    }

    disarm(index) {
        this.obj.remove(this.arms[index].joint);
    }

    texture(canvas, placename, distance){

        canvas.width = 256;
        canvas.height = 64;

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(212,212,212)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(5, 5, canvas.width - 10, canvas.height - 10);
        ctx.fillStyle = 'rgb(64,64,64)';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (distance > 0) {
            ctx.font = '14pt Verdana';
            ctx.fillText(placename, canvas.width / 2, canvas.height / 3);
            ctx.font = '12pt Verdana';
            ctx.fillText(distance+" miles", canvas.width / 2, canvas.height / 1.5);
        } else {
            ctx.font = '16pt Verdana';
            ctx.fillText(placename, canvas.width / 2, canvas.height / 2);
        }

    }

    base() {

        var postMaterial = new MeshPhongMaterial({ color: 0xdddddd, shininess: 10, shading: FlatShading });
        var postGeo = new CylinderGeometry(2, 2, 80, 12, 1);
        var post = new Mesh(postGeo, postMaterial);
        post.position.y = 30;

        this.obj.add(post);

        var baseMaterial = new MeshPhysicalMaterial({ color: 0x00ff00, roughness: 100 });
        var baseGeo = new CylinderGeometry(32, 32, 1, 128, 1);
        var base = new Mesh(baseGeo, baseMaterial);

        this.obj.add(base);

        var northMaterial = new MeshPhysicalMaterial({ color: 0xff0000 });
        var northGeo = new CylinderGeometry(2, 2, 2, 8, 1);
        var north = new Mesh(northGeo, northMaterial);
        north.position.z = -24;

        this.obj.add(north);

        var topperMaterial = new MeshPhongMaterial({ color: 0xdddddd, shininess: 10, shading: FlatShading });
        var topperGeo = new SphereGeometry(3, 12, 12);
        var topper = new Mesh(topperGeo, topperMaterial);
        topper.position.y = 72;

        this.obj.add(topper);

    }

}


function rotateAroundObjectAxis(object, axis, radians) {
    var rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotationMatrix);
    object.rotation.setFromRotationMatrix( object.matrix );

}

function rotateAroundWorldAxis( object, axis, radians ) {
    var rotationMatrix = new Matrix4();
    rotationMatrix.makeRotationAxis( axis.normalize(), radians );
    rotationMatrix.multiply( object.matrix );
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix( object.matrix );

}
