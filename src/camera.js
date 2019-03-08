import {createLength, getLengthMiddlePoint} from "./length.js";

/*
    camera = {
        corner1: point3,
        corner2: point3,
        plane: plane,
        focus: point3
    }
*/

export const INITIAL_CAMERA = {
    corner1: {x: -4, y: -3, z: 0},
    corner2: {x: 4, y: 3, z: 0},
    focus: {x: 0, y: 0, z: 5}
};

const getCameraCenter = camera => getLengthMiddlePoint(createLength(camera.corner1, camera.corner2));