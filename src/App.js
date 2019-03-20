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

        this._camera = new Camera(new Point(-95, -604, -636), new Point(-0.6, 0.6, 0), -2);

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
            F: false
        };

        this._keyActivatedHandlerMap = {
            UP:    () => this._camera.move(INIT_SIZE),
            DOWN:  () => this._camera.move(-INIT_SIZE),
            LEFT:  () => this._camera.pan(-INIT_SIZE, 0),
            RIGHT: () => this._camera.pan(INIT_SIZE, 0),
            R:     () => this._camera.pan(0, -INIT_SIZE),
            F:     () => this._camera.pan(0, INIT_SIZE),
            W:     () => this._camera.orientation.x += 0.03,
            A:     () => this._camera.orientation.y -= 0.03,
            S:     () => this._camera.orientation.x -= 0.03,
            D:     () => this._camera.orientation.y += 0.03,
            Q:     () => this._camera.orientation.z -= 0.03,
            E:     () => this._camera.orientation.z += 0.03
        };

        this._canvas = null;
        this._context = null;
    }

    componentDidMount() {
        this._context = this._canvas.getContext('2d');

        window.addEventListener('resize', event => this.handleWindowResize(event), false);
        this.handleWindowResize();

        setInterval( () => this.loop(), 1000 / FRAMERATE );
    }

    handleWindowResize() {
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

    handleKeyDown(event) {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        if (keyName) {
            this._keyActivation[keyName] = true;
        }
    };

    handleKeyUp(event) {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        if (keyName) {
            this._keyActivation[keyName] = false;
        }
    };

    loop() {
        Object.keys(this._keyActivation)
              .filter( key => this._keyActivation[key] )
              .forEach( key => this._keyActivatedHandlerMap[key]() );

        this._context.clearRect(0, 0, this._world.width, this._world.height);
        OBJECTS_TO_RENDER.forEach(object => {
            const temp = object.getScreenCoords(this._world, this._camera);
            if ( !( temp.x < -this._world.width ) || ( temp.y < -this._world.height ) || ( temp.x > this._world.width*2 ) || ( temp.y > this._world.height*2 ) || ( temp.distance < 0 ) ) {
                object.render(this._world, this._camera, this._context, 1 )
            }
        });
    }

    render() {
        return (
            <canvas id="world"
                    ref={ref => this._canvas = ref}
                    tabIndex="0"
                    onKeyDown={event => this.handleKeyDown(event)}
                    onKeyUp={event => this.handleKeyUp(event)}/>
        );
    }
}