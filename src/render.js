import React from 'react';
import {getLengthWidth} from "./length.js";

/*
    point = {x: 0-100, y: 0-100};
 */

export const getLengthAsDiv = length => (<div class='length' style={getLengthDivStyle(length)}/>);

const getLengthDivStyle = length => ({
    "width": getLengthWidth(length) + '%',
    "left": length.point1.x + '%',
    "top": length.point1.y + '%',
    "transform": `rotate(${getLengthAngle(length)}rad)`
});

const getLengthAngle = length => {
    const {point1, point2} = length;
    const a = point2.y - point1.y;
    const c = getLengthWidth(length);
    const sin = a / c;
    const horizontalHalf = point1.x > point2.x ? Math.PI / 2 : 0;
    const verticalHalf = Math.asin(sin);
    return verticalHalf > 0 ? verticalHalf + horizontalHalf : verticalHalf - horizontalHalf;
};