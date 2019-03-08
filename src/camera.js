import {createLength, getLengthMiddlePoint} from "./length";
import {Matrix} from './algebra';

/*
    camera = {
        corner1: Point3
        corner2: Point3
        focus: Point3
    }
*/

export const INITIAL_CAMERA = {
    corner1: new Matrix([-4, 3, 0]),
    corner2: new Matrix([4, 3, 0]),
    focus: new Matrix([0, 0, 5])
};

const getCameraCenter = camera => getLengthMiddlePoint(createLength(camera.corner1, camera.corner2));