import React, { Component } from 'react';
import {INITIAL_CAMERA, OBJECTS_TO_RENDER} from "./objects";

export default class App extends Component {

    constructor(props) {
        super(props);

        this._camera = INITIAL_CAMERA;
    }

    _lengthProjectionOnCamera(length, key) {
        return this._getLengthAsDiv( this._camera.getViewOfLength(length), key );
    }

    _getLengthAsDiv(length, key) {
        return <div className='length' key={key} style={this._getLengthDivStyle(length)}/>;
    }

    _getLengthDivStyle(length) {
        console.log(length);
        return {
            "width": length.width + '%',
            "left": (length[0][0] + 50) + '%',
            "top": (length[0][1] + 50) + '%',
            "transform": `rotate(${this._getLengthAngle(length)}rad)`
        };
    };

    _getLengthAngle(length) {
        const a = length[1][1] - length[0][1];
        const c = length.width;
        const sin = a / c;
        const horizontalHalf = length[0][0] > length[1][0] ? Math.PI / 2 : 0;
        const verticalHalf = Math.asin(sin);
        return verticalHalf > 0 ? verticalHalf + horizontalHalf : verticalHalf - horizontalHalf;
    };

    render() {
        return (
            <div className="App">
                {OBJECTS_TO_RENDER.map((length, idx) => this._lengthProjectionOnCamera(length, idx))}
            </div>
        );
    }
}