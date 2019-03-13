import Vector from "./Vector";

export const getPlainByPoints = points => {
    const plainNormal = getPlainNormalByPoints(points);
    const d = plainNormal.eleMap( (val, row, col) => -val * points[0][col] )
                         .getSum();

    const perpData = plainNormal.toArray()[0];
    perpData[3] = d;

    return perpData;
};

export const getPlainDirectionalByPlain = plain => new Vector([plain.slice(0,3)]);

export const getPlainNormalByPoints = points => {
    if (points.length < 3) {
        throw new Error();
    }

    const [p1, p2, p3] = points;

    return p1.minus(p2).vectProd( p2.minus(p3) );
};

export const getPointProjectionOfPoint = (plain, point) => {
    const plainDirectional = getPlainDirectionalByPlain(plain);

    const tCount = plainDirectional.mul(plainDirectional).getSum();
    const restCount = plainDirectional.mul(point).getSum();

    const t = -restCount / tCount;

    return plainDirectional.mulEach(t).plus(point);
};