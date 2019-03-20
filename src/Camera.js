import Point from "./Point";

export default class Camera {

    constructor( pos, ori, stereo ) {
        this._position = pos;
        this._orientation = ori;
        this._stereo = stereo || 0;
    }

    get position() {
        return this._position;
    }

    set position(pos) {
        this._position = pos;
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(o) {
        this._orientation = o;
    }

    get stereo() {
        return this._stereo;
    }

    set stereo(s) {
        this._stereo = s;
    }

    move( z ) {
        const t = new Point(0, 0, z);

        const rotationAngle = new Point(-this._orientation.x, -this._orientation.y, 0);
        const n = Point.getRotateCoordinate(t, rotationAngle);

        this._position.plus_(n);
    }

    pan( x, y ) {
        const t = new Point(x, y, 0);

        const rotationPoint = new Point(0, -this._orientation.y, -this._orientation.z);
        const n = Point.getRotateCoordinate(t, rotationPoint);

        this._position.plus_(n);
    };

}