import Vector from "./Vector";
import Plain from './Plain';
import Line from "./Line";
import Length from "./Length";

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

    getViewOfLength(length) {
        const projectionPlain = Plain.getPlainByPoints([this._focus, length[0], length[1]]);

        const viewDirectionVector = this._plain.normal.vectProd(projectionPlain.normal);
        const lengthDirectionVector = Line.getDirectionalOfLength(length);

        console.log(projectionPlain);
        console.log(projectionPlain.normal);
        console.log(viewDirectionVector);
        console.log(lengthDirectionVector);
    }

}

export const INITIAL_CAMERA = new Camera(new Plain([0, 0, 1, 0]), new Vector([0, 0, 5]));

INITIAL_CAMERA.getViewOfLength(new Length(new Vector([-5, 0, 10]), new Vector([5, 0, 10])));
console.log(INITIAL_CAMERA.plain.getProjectionOfPoint(INITIAL_CAMERA.focus));