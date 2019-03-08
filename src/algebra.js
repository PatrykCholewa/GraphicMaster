import * as Algebra from "linear-algebra";
export const {Vector, Matrix} = Algebra(4);

export const asVect = matrix => matrix.data[0];