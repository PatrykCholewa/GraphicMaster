import Vector from "./Vector";
import Point from "./Point";

export default class Length {

    constructor(point0, point1) {
        this._points = [
            point0 || new Point( 0, 0, 0 ),
            point1 || new Point( 0, 0, 0 )
        ];
    }

    get 0() {
        return this._points[0];
    }

    get 1() {
        return this._points[1];
    }

    mapPoints(map) {
        return new Length(map(this._points[0]), map(this._points[1]));
    }

    get width() {
        const lengthEnd = this._points[1];
        const squaredWidth = this._points[0].eleMap( (val, row, col) => (val - lengthEnd[col]) * (val - lengthEnd[col]))
                                              .getSum();
        return Math.sqrt(squaredWidth);
    }

    getMiddlePoint() {
        return this._points[0].plus(this._points[1])
                              .mulEach(0.5);
    }

    rotate(p, pr) {
        this._points.forEach(point => point.rotate(p, pr));
    }

    getScreenCoords(world, c) {
        return this._points[0].getScreenCoords(world, c);
    }

    render(world, camera, context) {
        const screenCoords = this._points.map(point => point.getScreenCoords(world, camera));
        if (screenCoords.every(coord => coord.distance > 0)) {
            context.beginPath();
            context.moveTo(screenCoords[0].x,screenCoords[0].y);
            context.lineTo(screenCoords[1].x,screenCoords[1].y);
            context.lineWidth = 1;
            context.strokeStyle = "#FF0000";
            context.stroke();
        }
    }

    static crateByPointDims(pointArr1, pointArr2) {
        return new Length(new Vector(pointArr1), new Vector(pointArr2));
    }

}