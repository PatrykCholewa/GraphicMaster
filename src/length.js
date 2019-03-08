/*
    length = {point1: point, point2: point};
 */

export const createLength = (point1, point2) => ({point1, point2});

export const getLengthMiddlePoint = length => {
    const {point1, point2} = length;
    const ret = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2
    };
    if(point1.z !== undefined && point1.z !== null) {
        ret.z = (point1.z + point2.z) / 2;
    }
    return ret;
};

export const getLengthWidth = length => {
    const {point1, point2} = length;
    return Math.sqrt(
        diffSqr(point1.y, point2.y)
        + diffSqr(point1.x, point2.x)
        + (point1.z ? diffSqr(point1.z, point2.z) : 0)
    );
};

const diffSqr = (dim1, dim2) => (dim1 - dim2) * (dim1 - dim2);