import Length from "./Length";
import Vector from "./Vector";
import Plain from "./Plain";
import Camera from "./Camera";

export const INITIAL_CAMERA = new Camera(new Plain([0, 0, 1, 0]), new Vector([0, 0, 5]));

export const OBJECTS_TO_RENDER = [
    new Length(new Vector([0, 0, 100]), new Vector([-200, -200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([200, 200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([200, -200, 100])),
    new Length(new Vector([0, 0, 100]), new Vector([-200, 200, 100]))
];