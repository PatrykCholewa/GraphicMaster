import {Matrix} from './algebra';

export const INITIAL_CAMERA = {
    corners: [
        new Matrix([-4, -3, 0]),
        new Matrix([-4, 3, 0]),
        new Matrix([4, 3, 0]),
        new Matrix([4, -3, 0])
    ],
    focus: new Matrix([0, 0, 5])
};