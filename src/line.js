import {Matrix} from "./algebra";

export const getLineDirectional = length => {
    const [p0, p1] = length.pointArr;

    return new Matrix([
        p0[1]*p1[2] - p0[2]*p1[1],
        p0[2]*p1[0] - p0[0]*p1[2],
        p0[0]*p1[1] - p0[1]*p0[0]
    ]);
};