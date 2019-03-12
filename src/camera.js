import {Matrix, vectProd} from './algebra';
import {getPlainNormal} from "./plain";

export const INITIAL_CAMERA = {
    corners: [
        new Matrix([-4, -3, 0]),
        new Matrix([-4, 3, 0]),
        new Matrix([4, 3, 0]),
        new Matrix([4, -3, 0])
    ],
    focus: new Matrix([0, 0, 5])
};

// export const getViewOfLength = (camera, length) => {
//     const cameraPlainNormal = getPlainNormal(camera.corners);
//     const projectionPlainNormal = getPlainNormal([camera.focus, ...length]);
//
//     const viewDirectionVector = vectProd(cameraPlainNormal, projectionPlainNormal);
//
//
// } ;