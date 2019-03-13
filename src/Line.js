export default class Line {

    // x = v0[0] + v1[0] * t
    // y = v0[1] + v1[1] * t
    // z = v0[2] + v1[2] * t

    constructor(v0, v1) {
        this._v0 = v0;
        this._v1 = v1;
    }

    getIntersectionPointWithPlain(plain) {
        const normal = plain.normal;

        const restCount = -plain.D - normal.mul(this._v0).getSum();
        const tCount = normal.mul(this._v1).getSum();

        const t = restCount / tCount;
        return this._v1.mulEach(t).plus(this._v0);
    }

    static getByLength(len) {
        return new Line(
            len[0],
            len[1].minus(len[0])
        );
    };

}