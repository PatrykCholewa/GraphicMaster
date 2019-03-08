import {asVect, Matrix} from "./algebra";

export const asVectArr = length => length.map(pointMtx => asVect(pointMtx));

export const getLengthMiddlePoint = length => {
    const lenArr = asVectArr(length);
    return new Matrix([
        (lenArr[0][0] + lenArr[1][0]) / 2,
        (lenArr[0][1] + lenArr[1][1]) / 2,
        lenArr[0][2] !== undefined ? (lenArr[0][2] + lenArr[1][2]) / 2 : undefined
    ]);
};

export const getLengthWidth = length => {
    const lenArr = asVectArr(length);
    return Math.sqrt(
        diffSqr(lenArr[0][1], lenArr[1][1])
        + diffSqr(lenArr[0][0], lenArr[1][0])
        + (lenArr[0][2] ? diffSqr(lenArr[0][2], lenArr[1][2]) : 0)
    );
};

const diffSqr = (dim1, dim2) => (dim1 - dim2) * (dim1 - dim2);