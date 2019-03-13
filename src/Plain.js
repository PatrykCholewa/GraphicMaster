import Vector from "./Vector";

export default class Plain {

    constructor([A, B, C, D]){
        this._vect = [A, B, C, D];
    }

    get normal() {
        return new Vector(this._vect.slice(0,3));
    }

    get A() {
        return this._vect[0];
    }

    get B() {
        return this._vect[1];
    }

    get C() {
        return this._vect[2];
    }

    get D() {
        return this._vect[3];
    }

    getProjectionOfPoint(point) {
        const normal = this.normal;

        const tCount = normal.mul(normal).getSum();
        const restCount = normal.mul(point).getSum();

        const t = -restCount / tCount;

        return normal.mulEach(t).plus(point);
    };

    static getPlainByPoints = points => {
        if (points.length < 3) {
            throw new Error();
        }

        const [p1, p2, p3] = points;

        const plainNormal = p1.minus(p2).vectProd( p2.minus(p3) );

        const d = plainNormal.eleMap((val, row, col) => -val * points[0][col])
                             .getSum();

        const perpData = plainNormal.toArray()[0];
        perpData[3] = d;

        return new Plain(perpData);
    }
}