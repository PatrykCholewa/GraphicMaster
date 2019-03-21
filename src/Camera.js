import Point from "./Point";

export default class Camera {

    constructor( pos, ori, zoom ) {
        this._position = pos;
        this._orientation = ori;
        this._zoom = zoom;
    }

    get zoom() {
        return this._zoom;
    }

    set zoom(z) {
        this._zoom = z;
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

    move( z ) {
        const t = new Point(0, 0, z);

        const rotation = new Point(-this._orientation.x, -this._orientation.y, 0);
        const n = Point.getRotateCoordinate(t, rotation);

        this._position.plus_(n);
    }

    pan( x, y ) {
        const t = new Point(x, y, 0);

        const rotationPoint = new Point(0, -this._orientation.y, -this._orientation.z);
        const n = Point.getRotateCoordinate(t, rotationPoint);

        this._position.plus_(n);
    };

}