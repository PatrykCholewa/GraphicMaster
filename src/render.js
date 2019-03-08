import React from 'react';
import {asVectArr, getLengthWidth} from "./length";

export const getLengthAsDiv = length => (<div className='length' style={getLengthDivStyle(length)}/>);

const getLengthDivStyle = length => {
    const lenArr = asVectArr(length);
    return {
        "width": getLengthWidth(length) + '%',
        "left": lenArr[0][0] + '%',
        "top": lenArr[0][1] + '%',
        "transform": `rotate(${getLengthAngle(length)}rad)`
    };
};

const getLengthAngle = length => {
    const lenArr = asVectArr(length);
    const a = lenArr[1][1] - lenArr[0][1];
    const c = getLengthWidth(length);
    const sin = a / c;
    const horizontalHalf = lenArr[0][0] > lenArr[1][0] ? Math.PI / 2 : 0;
    const verticalHalf = Math.asin(sin);
    return verticalHalf > 0 ? verticalHalf + horizontalHalf : verticalHalf - horizontalHalf;
};