import Length from "./Length";
import Vector from "./Vector";
import Plain from "./Plain";
import Camera from "./Camera";

const directions = {};
directions[Camera.DIRECTION.LEFT] = new Vector([1, 0, 0]);
directions[Camera.DIRECTION.RIGHT] = new Vector([-1, 0, 0]);
directions[Camera.DIRECTION.UP] = new Vector([0, 1, 0]);
directions[Camera.DIRECTION.DOWN] = new Vector([0, -1, 0]);
directions[Camera.DIRECTION.IN] = new Vector([0, 0, 1]);
directions[Camera.DIRECTION.OUT] = new Vector([0, 0, -1]);

export const INITIAL_CAMERA = new Camera(new Plain([0, 0, 1, 0]), new Vector([0, 0, 5]), directions);

export const OBJECTS_TO_RENDER = [
    new Length(new Vector([0, 0, 100]), new Vector([-200, -200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([200, 200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([200, -200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([-200, 200, 100]))
];