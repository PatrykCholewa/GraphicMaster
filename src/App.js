import React, { Component } from 'react';
import {getLengthAsDiv} from "./render";

class App extends Component {
    render() {
        return (
            <div className="App">
                {getLengthAsDiv({point1: {x: 50, y: 50}, point2: {x: 30, y: 30}})}
                {getLengthAsDiv({point1: {x: 50, y: 50}, point2: {x: 70, y: 70}})}
                {getLengthAsDiv({point1: {x: 50, y: 50}, point2: {x: 70, y: 30}})}
                {getLengthAsDiv({point1: {x: 50, y: 50}, point2: {x: 30, y: 70}})}
            </div>
        );
    }
}

export default App;
