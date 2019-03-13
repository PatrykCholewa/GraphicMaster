import {getPlainDirectionalByPlain, getPlainNormalByPoints, getPointProjectionOfPoint} from "./plain";
import {getLineDirectional} from "./line";
import Vector from "./Vector";

export default class Camera {

    constructor(plain, focus) {
        this._plain = plain;
        this._focus = focus;
    }

    get plain() {
        return this._plain;
    }

    get focus() {
        return this._focus;
    }

}

export const INITIAL_CAMERA = new Camera([0, 0, 1, 0], new Vector([0, 0, 5]));

// export const getViewOfLength = (camera, length) => {
//     const projectionPlainNormal = getPlainNormalByPoints([camera.focus, ...length]);
//
//     const viewDirectionVector = vectProd(getPlainDirectionalByPlain(camera.plain), projectionPlainNormal);
//     const lengthDirectionVector = getLineDirectional(length);
//
//     console.log(projectionPlainNormal);
//     console.log(viewDirectionVector);
//     console.log(lengthDirectionVector);
// } ;
//
// getViewOfLength(INITIAL_CAMERA, [new Matrix([-5, 0, 10]), new Matrix([5, 0, 10])]);
// console.log(getPointProjectionOfPoint(INITIAL_CAMERA.plain, INITIAL_CAMERA.focus));