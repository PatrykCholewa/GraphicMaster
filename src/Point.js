import Vector from "./Vector";

export default class Point extends Vector {

    constructor(x, y, z) {
        super([x || 0, y || 0, z || 0]);
        this._tempIndex = 0;
    }

    get tempIndex() {
        return this._tempIndex;
    }

    set tempIndex(ti) {
        this._tempIndex = ti;
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

    static getRotateCoordinate(t, rotateAngle) {
        // Displace to make rotation point 0,0,0
        // Precalculates Sin & Cos for rotation angles
        const cos = rotateAngle.eleMap(val => Math.cos(val));
        const sin = rotateAngle.eleMap(val => Math.sin(val));
        // Rotate Coordinate
        // http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
        return new Point(
            cos[1] * ( sin[2] * t[1] + cos[2] * t[0] ) - sin[1] * t[2],
            sin[0] * ( cos[1] * t[2] + sin[1] * ( sin[2] * t[1] + cos[2] * t[0] ) ) + cos[0] * ( cos[2] * t[1] - sin[2] * t[0] ),
            cos[0] * ( cos[1] * t[2] + sin[1] * ( sin[2] * t[1] + cos[2] * t[0] ) ) - sin[0] * ( cos[2] * t[1] - sin[2] * t[0] )
        );
    }

    distanceTo(p) {
        return Math.sqrt(
            this.minus(p)
                .eleMap(val => val*val)
                .getSum()
        );
    }

    rotate(p, pr) {
        // Reassign new coordinates and displace back to match rotation point
        this.plus_( Point.getRotateCoordinate(this.minus(p), pr) );
    }

    getScreenCoords(wld, c) {
        const cPosition = new Point(c.position.x, c.position.y, c.position.z);
        const cOrientation = new Point(c.orientation.x, c.orientation.y, c.orientation.z);

        const n = Point.getRotateCoordinate(this.minus(cPosition), cOrientation);
        // Return ScreenCoordinates and distance to viewing plane
        this._tempIndex = n[2];
        return {
            x : ( n[0] + c.stereo ) * c.zoom / n[2] * wld.height / 2 + wld.width / 2,
            y : ( n[1] + c.stereo ) * c.zoom / n[2] * wld.height / 2 + wld.height / 2,
            distance : n[2]
        };
    }

    render( wld, cam, cont, str ) {
        // Get Screen Coordinates
        var screenCoords = this.getScreenCoords(wld, cam);
        // Check distance to camera before rendering
        if (screenCoords.distance > 0) {
            // Draw Circle
            cont.beginPath();
            cont.arc( screenCoords.x, screenCoords.y, str * 2, 0, Math.PI * 2, true );
            cont.strokeStyle = 'rgba(255,255,255,1.0)';
            cont.lineWidth = 1;
            cont.stroke();
        }
    }

}