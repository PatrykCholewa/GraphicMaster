import {Matrix} from './algebra';

export const INITIAL_CAMERA = {
    corner1: new Matrix([-4, 3, 0]),
    corner2: new Matrix([4, 3, 0]),
    focus: new Matrix([0, 0, 5])
};