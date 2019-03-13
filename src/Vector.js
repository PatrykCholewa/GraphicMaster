import * as Algebra from "linear-algebra";
export const {Matrix} = Algebra(4);

export default class Vector extends Matrix {

    get 0() {
        return this.data[0][0];
    }

    get 1() {
        return this.data[0][1];
    }

    get 2() {
        return this.data[0][2];
    }

    plus(vector) {
        return new Vector(super.plus(vector).data);
    }

    minus(vector) {
        return new Vector(super.minus(vector).data);
    }

    mul(vector) {
        return new Vector(super.mul(vector).data);
    }

    mulEach(c) {
        return new Vector(super.mulEach(c).data);
    }

    eleMap(map) {
        return new Vector(super.eleMap(map).data);
    }

    vectProd(v2) {
        const v1 = this.data[0];

        return new Vector([
            v1[1]*v2[2] - v1[2]*v2[1],
            v1[2]*v2[0] - v1[0]*v2[2],
            v1[0]*v2[1] - v1[1]*v2[0]
        ]);
    };

}