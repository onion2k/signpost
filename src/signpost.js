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
        this.arms = {};
        this.obj = new Object3D();

        this.base();

    }

    buildCapGeometry(len) {

        var cube_geometry = new BoxGeometry( 1, 6, 1 );

        var extrusion = len;
        var point = 3;

        cube_geometry.vertices[0].y -= point;
        cube_geometry.vertices[1].y -= point;

        cube_geometry.vertices[2].y += point;
        cube_geometry.vertices[3].y += point;

        cube_geometry.vertices[0].x += extrusion;
        cube_geometry.vertices[1].x += extrusion;

        cube_geometry.vertices[2].x += extrusion;
        cube_geometry.vertices[3].x += extrusion;

        return cube_geometry;

    }


    arm(placename, direction, distance, index, id){

        if (index === -1) { return; }

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

        //var armGeo = this.buildArmGeometry(len);
        var armGeo = new BoxGeometry(12 + (len * 1), 6, 1);
        var arm = new Mesh(armGeo, armMaterials);

            arm.position.y = 76 - (index * 6);
            arm.position.x = (12 + (len) / 2) - 5;

        var capGeo = this.buildCapGeometry(3);
        var cap = new Mesh(capGeo, new MeshPhongMaterial({ color: 0xd4d4d4, shininess: 10, shading: FlatShading }));

            cap.position.y = 76 - (index * 6);
            cap.position.x = (((12 + (len/2)) - 5 ) * 2) - 0.5;

        var combo = new Object3D();
            combo.add(arm);
            combo.add(cap);

        var joint = new Object3D();
            joint.add(combo);
            joint.rotation.y = (Math.PI / 2) + (-1 * direction * 0.0174533);

        this.obj.add(joint);

        signpostRotator.paused(true);

        TweenLite.from(combo.position, 1, { x: (12 + (len) / 2) - 5 + 50, ease: Back.easeOut.config(1.2), onComplete: function(){
    
            signpostRotator.paused(false);

        } });

        this.arms[id] = { 
            'placename': placename, 
            'distance': distance, 
            'joint': joint, 
            'arm': combo, 
            'geo': armGeo, 
            'cap': capGeo, 
            'mat': armMaterials, 
            'tex': texture,
            'id': id
        };

    }

    disarm(id) {

        var self = this;

        var promise = new Promise(function(resolve, reject){

            signpostRotator.paused(true);

            TweenLite.to(self.arms[id].arm.position, 1, {
                x: self.arms[id].arm.position.x + 50, 
                onComplete: ()=>{

                    var r = self.obj.remove(self.arms[id].joint);

                    self.arms[id].geo.dispose();
                    self.arms[id].mat[0].dispose();
                    self.arms[id].mat[1].dispose();
                    self.arms[id].mat[2].dispose();
                    self.arms[id].mat[3].dispose();
                    self.arms[id].mat[4].dispose();
                    self.arms[id].mat[5].dispose();
                    self.arms[id].tex.dispose();

                    delete self.arms[id];

                    signpostRotator.paused(false);

                    resolve();

                }, 
                onCompleteParams:[ "id",id ]
            });

        });

        return promise;


    }

    move(id, position, delay) {

        var self = this;

        var newPos = position * 6;
        var delay = delay || 0;

        TweenLite.to(self.arms[id].joint.position, 1, {
            delay: delay,
            y: self.arms[id].joint.position.y + newPos,
            ease: Back.easeIn.config(0.5)
        });

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
        post.position.y = 40;

        this.obj.add(post);

        var baseMaterial = new MeshPhysicalMaterial({ color: 0x00ff00, roughness: 100 });
        var baseGeo = new CylinderGeometry(32, 32, 1, 128, 1);
        var base = new Mesh(baseGeo, baseMaterial);

        this.obj.add(base);

        var northMaterial = new MeshPhysicalMaterial({ color: 0xff0000 });
        var northGeo = new CylinderGeometry(2, 2, 2, 8, 1);
        var north = new Mesh(northGeo, northMaterial);
        north.position.y = 1;
        north.position.z = -24;

        this.obj.add(north);

        var topperMaterial = new MeshPhongMaterial({ color: 0xdddddd, shininess: 10, shading: FlatShading });
        var topperGeo = new SphereGeometry(3, 12, 12);
        var topper = new Mesh(topperGeo, topperMaterial);
        topper.position.y = 82;

        this.obj.add(topper);

    }

}
