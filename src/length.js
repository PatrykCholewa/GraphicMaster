import {asVect} from "./algebra";

export const asVectArr = length => length.map(pointMtx => asVect(pointMtx));

export const getLengthMiddlePoint = length => length[0].plus(length[1])
                                                       .mulEach(0.5);

export const getLengthWidth = length => {
    const lengthEnd = asVect(length[1]);
    const squaredWidth = length[0].eleMap( (val, row, col) => (val - lengthEnd[col]) * (val - lengthEnd[col]))
                                  .toArray()[0]
                                  .reduce( (acc, val) => acc + val, 0);
    return Math.sqrt(squaredWidth);
};