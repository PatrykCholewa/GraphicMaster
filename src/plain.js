import {asVect, Matrix, vectProd} from "./algebra";

export const getPlain = points => {
    if (points.length < 3) {
        throw new Error();
    }

    const [p1, p2, p3] = points;

    const perpendicular = vectProd(p1.minus(p2) ,p2.minus(p3));
    const d = perpendicular.eleMap( (val, row, col) => -val * asVect(p1)[col] )
                           .getSum();

    const perpData = perpendicular.toArray()[0];
    perpData[3] = d;

    return new Matrix(perpData);
};