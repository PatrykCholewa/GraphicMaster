import Vector from "./Vector";

export const getLineDirectional = length => {
    const [p0, p1] = length;

    return new Vector([
        p0[1]*p1[2] - p0[2]*p1[1],
        p0[2]*p1[0] - p0[0]*p1[2],
        p0[0]*p1[1] - p0[1]*p0[0]
    ]);
};