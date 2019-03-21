import Vector, {Matrix} from "./Vector";

export default class Point extends Vector {

    constructor(x, y, z) {
        super([x || 0, y || 0, z || 0]);
    }

    get x() {
        return this[0];
    }

    set x(x) {
        this.data[0][0] = x;
    }

    get y() {
        return this[1];
    }

    set y(y) {
        this.data[0][1] = y;
    }

    get z() {
        return this[2];
    }

    set z(z) {
        this.data[0][2] = z;
    }

    eleMap(map) {
        const vect = super.eleMap(map);
        return new Point(vect[0], vect[1], vect[2]);
    }

    static getRotateCoordinate(t, rotation) {
        const cos = rotation.eleMap(val => Math.cos(val));
        const sin = rotation.eleMap(val => Math.sin(val));

        const c2m = new Matrix([
            [1, 0, 0],
            [0, cos[0], sin[0]],
            [0, -sin[0], cos[0]]
        ]).dot(new Matrix([
            [cos[1], 0, -sin[1]],
            [0, 1, 0],
            [sin[1], 0, cos[1]]
        ])).dot(new Matrix([
            [cos[2], sin[2], 0],
            [-sin[2], cos[2], 0],
            [0, 0, 1]
        ])).dot(t.trans());

        return new Point(c2m.data[0][0], c2m.data[1][0], c2m.data[2][0]);
    }

    distanceTo(p) {
        return Math.sqrt(
            this.minus(p)
                .eleMap(val => val*val)
                .getSum()
        );
    }

    rotate(point, rotation) {
        this.plus_( Point.getRotateCoordinate(this.minus(point), rotation) );
    }

    getScreenCoords(world, camera) {
        const n = Point.getRotateCoordinate(this.minus(camera.position), camera.orientation);
        return {
            x: n[0] / n[2] * camera.zoom * world.height / 2 + world.width / 2,
            y: n[1] / n[2] * camera.zoom * world.height / 2 + world.width / 2,
            distance: n[2]
        };
    }

}