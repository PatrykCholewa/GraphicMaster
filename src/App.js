import React, { Component } from 'react';

import './cpy';
import Camera from "./Camera";
import Point from "./Point";
import REVERSE_KEY_MAP from "./util";
import OBJECTS_TO_RENDER from "./objects";

const FRAMERATE = 20;
const INIT_SIZE = 25;

export default class App extends Component {

    constructor(props) {
        super(props);

        this._camera = new Camera(new Point(-95, -604, -636), new Point(-0.6, 0.6, 0), 1.5, -2);

        this._world = {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        };

        this._keyActivation = {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false,
            W: false,
            A: false,
            S: false,
            D: false,
            Q: false,
            E: false,
            R: false,
            F: false,
            T: false,
            G: false
        };

        this._renderPool = [];

        this._canvas = null;
        this._context = null;

    }

    componentDidMount() {
        // Collect references to all DOM elements being used
        this._canvas = document.getElementById('world');

        // Make sure that the Canvas element is available before continuing
        if (this._canvas && this._canvas.getContext) {
            this._context = this._canvas.getContext('2d');

            // Register event listeners
            document.addEventListener('keydown', event => this.documentKeyDownHandler(event), false);
            document.addEventListener('keyup', event => this.documentKeyUpHandler(event), false);
            window.addEventListener('resize', event => this.windowResizeHandler(event), false);

            // Force an initial resize to make sure the UI is sized correctly
            this.windowResizeHandler();

            // Initiate the main render loop of the game
            setInterval( () => this.loop(), 1000 / FRAMERATE );
        }
    }

    windowResizeHandler() {
        this._world.width = window.innerWidth * 0.9;
        this._world.height = window.innerHeight * 0.9;

        // Resize the canvas
        this._canvas.width = this._world.width;
        this._canvas.height = this._world.height;

        // Determine the centered x/y position of the canvas
        const cvx = Math.round((window.innerWidth) - this._world.width - (window.innerWidth * 0.03));
        const cvy = Math.round((window.innerHeight / 2) - (this._world.height / 2));

        // Move the canvas
        this._canvas.style.position = 'absolute';
        this._canvas.style.left = cvx +'px';
        this._canvas.style.top = cvy + 'px';
    };

    documentKeyDownHandler(event) {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        this._keyActivation[keyName] = true;
    };

    documentKeyUpHandler(event) {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        this._keyActivation[keyName] = false;
    };

    loop() {
        if ( this._keyActivation.UP ) {
            this._camera.move(INIT_SIZE);
        }
        if ( this._keyActivation.DOWN ) {
            this._camera.move(-INIT_SIZE);
        }
        if ( this._keyActivation.LEFT ) {
            this._camera.pan(-INIT_SIZE, 0);
        }
        if ( this._keyActivation.RIGHT ) {
            this._camera.pan(INIT_SIZE, 0);
        }
        if ( this._keyActivation.R ) {
            this._camera.pan(0, -INIT_SIZE);
        }
        if ( this._keyActivation.F ) {
            this._camera.pan(0, INIT_SIZE);
        }

        if ( this._keyActivation.W ) {
            this._camera.orientation.x += 0.03;
        }
        if ( this._keyActivation.A) {
            this._camera.orientation.y -= 0.03;
        }
        if ( this._keyActivation.S ) {
            this._camera.orientation.x -= 0.03;
        }
        if ( this._keyActivation.D) {
            this._camera.orientation.y += 0.03;
        }
        if ( this._keyActivation.Q ) {
            this._camera.orientation.z -= 0.03;
        }
        if ( this._keyActivation.E) {
            this._camera.orientation.z += 0.03;
        }
        if ( this._keyActivation.T ) {
            this._camera.zoom += 0.05;
        }
        if ( this._keyActivation.G) {
            this._camera.zoom -= 0.05;
        }

        // Alter object by object and determin renderqueue
        OBJECTS_TO_RENDER.forEach(object => {
            const temp = object.getScreenCoords(this._world, this._camera);
            if ( !( temp.x < -this._world.width ) || ( temp.y < -this._world.height ) || ( temp.x > this._world.width*2 ) || ( temp.y > this._world.height*2 ) || ( temp.distance < 0 ) ) {
                this._renderPool.push(object);
            }
        });

        // sort render Queue
        this._renderPool.sort((a, b) => b.tempIndex - a.tempIndex);

        // render Queue
        this._context.clearRect(0, 0, this._world.width, this._world.height);
        this._renderPool.forEach(object => object.render(this._world, this._camera, this._context, 1 ));

        this._renderPool = [];
    }

    render() {
        return (
            <div className="App"/>
        );
    }
}