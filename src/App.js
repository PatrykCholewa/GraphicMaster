import React, { Component } from 'react';
import {getLengthAsDiv} from "./render";
import Length from "./Length";
import Vector from "./Vector";

class App extends Component {
    render() {
        return (
            <div className="App">
                {getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([30, 30])))}
                {getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([70, 70])))}
                {getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([70, 30])))}
                {getLengthAsDiv(new Length(new Vector([50, 50]), new Vector([30, 70])))}
            </div>
        );
    }
}

export default App;
