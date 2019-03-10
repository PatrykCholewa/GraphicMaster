import * as Algebra from "linear-algebra";
export const {Vector, Matrix} = Algebra(4);

export const asVect = matrix => matrix.toArray()[0];

export const vectProd = (vect1, vect2) => {
    const v1 = asVect(vect1);
    const v2 = asVect(vect2);

    return new Matrix([
        v1[1]*v2[2] - v1[2]*v2[1],
        v1[2]*v2[0] - v1[0]*v2[2],
        v1[0]*v2[1] - v1[1]*v2[0]
    ]);
};