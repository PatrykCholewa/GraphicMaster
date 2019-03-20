import Vector from "./Vector";

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

    static getRotateCoordinate(t, rotateAngle) {
        const cos = rotateAngle.eleMap(val => Math.cos(val));
        const sin = rotateAngle.eleMap(val => Math.sin(val));
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
        this.plus_( Point.getRotateCoordinate(this.minus(p), pr) );
    }

    getScreenCoords(wld, c) {
        const cPosition = new Point(c.position.x, c.position.y, c.position.z);
        const cOrientation = new Point(c.orientation.x, c.orientation.y, c.orientation.z);

        const n = Point.getRotateCoordinate(this.minus(cPosition), cOrientation);
        return {
            x : ( n[0] + c.stereo ) / n[2] * wld.height / 2 + wld.width / 2,
            y : ( n[1] + c.stereo ) / n[2] * wld.height / 2 + wld.height / 2,
            distance : n[2]
        };
    }

    render( wld, cam, cont, str ) {
        var screenCoords = this.getScreenCoords(wld, cam);
        if (screenCoords.distance > 0) {
            cont.beginPath();
            cont.arc( screenCoords.x, screenCoords.y, str * 2, 0, Math.PI * 2, true );
            cont.strokeStyle = 'rgba(255,255,255,1.0)';
            cont.lineWidth = 1;
            cont.stroke();
        }
    }

}