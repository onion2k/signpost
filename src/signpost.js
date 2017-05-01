import { 
    BoxGeometry, 
    Mesh, 
    Object3D,
    Vector3,
    FlatShading
} from '../node_modules/three/build/three.module';

class signpostGen {

    constructor(){

        this.id = 1;
        this.arms = [];

    }

    arm(placename, distance){

        this.arms.push({'placename': placename, 'distance': distance});

    }

}