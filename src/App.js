import React, { Component } from 'react';
import Length from "./Length";
import Vector from "./Vector";
import {INITIAL_CAMERA} from "./Camera";

export default class App extends Component {

    constructor(props) {
        super(props);

        this._camera = INITIAL_CAMERA;
    }

    _getLengthAsDiv(length) {
        return <div className='length' style={this._getLengthDivStyle(length)}/>;
    }

    _getLengthDivStyle(length) {
        return {
            "width": length.width + '%',
            "left": length[0][0] + '%',
            "top": length[0][1] + '%',
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
                {this._getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([30, 30])))}
                {this._getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([70, 70])))}
                {this._getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([70, 30])))}
                {this._getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([30, 70])))}
            </div>
        );
    }
}