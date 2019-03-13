import Vector from "./Vector";
import Plain from './Plain';
import Line from "./Line";

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

export const INITIAL_CAMERA = new Camera(new Plain([0, 0, 1, 0]), new Vector([0, 0, 5]));

export const getViewOfLength = (camera, length) => {
    const projectionPlain = Plain.getPlainByPoints([camera.focus, ...length]);

    const viewDirectionVector = camera.plain.normal.vectProd(projectionPlain.normal);
    const lengthDirectionVector = Line.getDirectional(length);

    console.log(projectionPlain);
    console.log(projectionPlain.normal);
    console.log(viewDirectionVector);
    console.log(lengthDirectionVector);
} ;

getViewOfLength(INITIAL_CAMERA, [new Vector([-5, 0, 10]), new Vector([5, 0, 10])]);
console.log(INITIAL_CAMERA.plain.getProjectionOfPoint(INITIAL_CAMERA.focus));