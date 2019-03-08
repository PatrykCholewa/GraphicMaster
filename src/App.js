import React, { Component } from 'react';
import {getLengthAsDiv} from "./render";
import {Matrix} from "./algebra";

class App extends Component {
    render() {
        return (
            <div className="App">
                {getLengthAsDiv([new Matrix([50, 50]), new Matrix([30, 30])])}
                {getLengthAsDiv([new Matrix([50, 50]), new Matrix([70, 70])])}
                {getLengthAsDiv([new Matrix([50, 50]), new Matrix([70, 30])])}
                {getLengthAsDiv([new Matrix([50, 50]), new Matrix([30, 70])])}
            </div>
        );
    }
}

export default App;
