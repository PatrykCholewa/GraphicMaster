import Point from "./Point";

export default class Camera {

    constructor( pos, ori, zoom, stereo ) {
        this._position = pos;
        this._orientation = ori;
        this._zoom = zoom || 1;
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

    get zoom() {
        return this._zoom;
    }

    set zoom(z) {
        this._zoom = z;
    }

    get stereo() {
        return this._stereo;
    }

    set stereo(s) {
        this._stereo = s;
    }

    move( z ) {
        // Displace to make rotation point 0,0,0
        const t = new Point(0, 0, z);

        const rotationAngle = new Point(-this._orientation.x, -this._orientation.y, 0);
        const n = Point.getRotateCoordinate(t, rotationAngle);

        // Reassign new coordinates and displace back to match rotation point
        this._position.plus_(n);
    }

    pan( x, y ) {
        // Displace to make rotation point 0,0,0
        const t = new Point(x, y, 0);

        const rotationPoint = new Point(0, -this._orientation.y, -this._orientation.z);
        const n = Point.getRotateCoordinate(t, rotationPoint);

        // Reassign new coordinates and displace back to match rotation point
        this._position.plus_(n);
    };

}