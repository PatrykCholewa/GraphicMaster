import {asVect} from "./algebra";

export default class Length {

    constructor(point0, point1) {
        this._point0 = point0;
        this._point1 = point1;
    }

    get 0() {
        return this._point0;
    }

    get 1() {
        return this._point1;
    }

    get width() {
        const lengthEnd = asVect(this._point1);
        const squaredWidth = this._point0.eleMap( (val, row, col) => (val - lengthEnd[col]) * (val - lengthEnd[col]))
                                              .getSum();
        return Math.sqrt(squaredWidth);
    }

    getAsArray() {
        return [asVect(this._point0), asVect(this._point1)];
    }

    getMiddlePoint() {
        return this._point0.plus(this._point1)
                           .mulEach(0.5);
    }

}