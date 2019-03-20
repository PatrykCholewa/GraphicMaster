import React, { Component } from 'react';
import {INITIAL_CAMERA, OBJECTS_TO_RENDER} from "./objects";
import Camera from "./Camera";

import './cpy';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            camera: INITIAL_CAMERA
        };

        this._context = null;
    }

    componentDidMount() {
        document.addEventListener("keydown", event => this._onKeyPress(event) , false);
    }

    _onKeyPress(event) {
        event.preventDefault();
        switch(event.which) {
            case 38:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.UP)});
                break;
            case 37:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.LEFT)});
                break;
            case 39:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.RIGHT)});
                break;
            case 40:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.DOWN)});
                break;
            case 104:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.IN)});
                break;
            case 98:
                this.setState({camera: this.state.camera.move(Camera.DIRECTION.OUT)});
                break;
            default:
        }
    }

    _lengthProjectionOnCamera(length, key) {
        return App._getLengthAsDiv( this.state.camera.getViewOfLength(length), key );
    }

    static _getLengthAsDiv(length, key) {
        console.log(length);
        return <div className='length' key={key} style={App._getLengthDivStyle(length)}/>;
    }

    static _getLengthDivStyle(length) {
        return {
            "width": length.width + '%',
            "left": (length[0][0] + 50) + '%',
            "top": (length[0][1] + 50) + '%',
            "transform": `rotate(${App._getLengthAngle(length)}rad)`
        };
    };

    static _getLengthAngle(length) {
        const a = length[1][1] - length[0][1];
        const c = length.width;
        const sin = a / c;
        const horizontalHalf = length[0][0] > length[1][0] ? Math.PI / 2 : 0;
        const verticalHalf = Math.asin(sin);
        return verticalHalf > 0 ? verticalHalf + horizontalHalf : verticalHalf - horizontalHalf;
    };

    render() {
        return (
            <div className="App"/>
        );
    }
}