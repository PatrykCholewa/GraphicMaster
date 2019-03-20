import Vector from "./Vector";
import Point from "./Point";

export default class Length {

    constructor(point0, point1) {
        this._points = [
            point0 || new Point( 0, 0, 0 ),
            point1 || new Point( 0, 0, 0 )
        ];
        this._tempIndex = 0;
    }

    get 0() {
        return this._points[0];
    }

    get 1() {
        return this._points[1];
    }

    get tempIndex() {
        return this._tempIndex;
    }

    set tempIndex(ti) {
        this._tempIndex = ti;
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
        const screenCoords = this._points[0].getScreenCoords(world, c);
        this._tempIndex = this._points[0].tempIndex;

        return screenCoords;
    }

    render(world, cam, cont, str ) {
        const screenCoords = this._points[0].getScreenCoords(world, cam);
        const screenCoords2 = this._points[1].getScreenCoords(world, cam);
        const distance = (screenCoords.distance + screenCoords2.distance) / 2;
        const brightnes = Math.round((1 / (distance / 500) ) * 255);
        if (distance > 125) {
            cont.beginPath();
            cont.moveTo(screenCoords.x,screenCoords.y);
            cont.lineTo(screenCoords2.x,screenCoords2.y);
            cont.lineWidth = str;
            cont.strokeStyle = 'rgba('+brightnes+','+brightnes+','+brightnes+',1.0)';
            cont.stroke();
        }
    }

    static crateByPointDims(pointArr1, pointArr2) {
        return new Length(new Vector(pointArr1), new Vector(pointArr2));
    }

}