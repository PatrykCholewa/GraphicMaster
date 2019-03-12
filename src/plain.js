import {asVect, vectProd} from "./algebra";

export const getPlain = points => {
    const plainNormal = getPlainNormal(points);
    const d = plainNormal.eleMap( (val, row, col) => -val * asVect(points[0])[col] )
                         .getSum();

    const perpData = plainNormal.toArray()[0];
    perpData[3] = d;

    return perpData;
};

export const getPlainNormal = points => {
    if (points.length < 3) {
        throw new Error();
    }

    const [p1, p2, p3] = points;

    return vectProd(p1.minus(p2) ,p2.minus(p3));
};