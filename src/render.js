import React from 'react';
import {INITIAL_CAMERA} from './camera';

export const getLengthAsDiv = length => (<div className='length' style={getLengthDivStyle(length)}/>);

const getLengthDivStyle = length => {
    const lenArr = length;
    return {
        "width": length.width + '%',
        "left": lenArr[0][0] + '%',
        "top": lenArr[0][1] + '%',
        "transform": `rotate(${getLengthAngle(length)}rad)`
    };
};

const getLengthAngle = length => {
    const lenArr = length;
    const a = lenArr[1][1] - lenArr[0][1];
    const c = length.width;
    const sin = a / c;
    const horizontalHalf = lenArr[0][0] > lenArr[1][0] ? Math.PI / 2 : 0;
    const verticalHalf = Math.asin(sin);
    return verticalHalf > 0 ? verticalHalf + horizontalHalf : verticalHalf - horizontalHalf;
};