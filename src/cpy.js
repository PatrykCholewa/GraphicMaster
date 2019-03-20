import Point from './Point';
import Camera from "./Camera";
import OBJECTS_TO_RENDER from "./objects";
import REVERSE_KEY_MAP from "./util";

// The world dimensions, defaults to full screen
const WORLD = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
};

const World3D = new function() {

    // The number of times the game will be redrawn per second
    const FRAMERATE = 20;

    // The canvas and its 2D context
    let CANVAS;
    let CONTEXT;

    // The initial state of the mouse
    const MOUSE = {
        x: 0,
        y: 0,
        down: false
    };

    // The initial state of the keyboard
    const KEY_ACTIVATION = {
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

    const INIT_SIZE = 25;

    // container for rendering queue
    let renderPool = [];

    // create camera  and set initial position
    const CAMERA = new Camera(new Point(-95, -604, -636), new Point(-0.6, 0.6, 0), 1.5, -2);

    /**
     * Initializes the world and starts rendering loop.
     */
    this.initialize = () => {

        // Collect references to all DOM elements being used
        CANVAS = document.getElementById('world');

        // Make sure that the Canvas element is available before continuing
        if (CANVAS && CANVAS.getContext) {
            CONTEXT = CANVAS.getContext('2d');

            // Register event listeners
            document.addEventListener('mousemove', documentMouseMoveHandler, false);
            CANVAS.addEventListener('mousedown', documentMouseDownHandler, false);
            document.addEventListener('mouseup', documentMouseUpHandler, false);
            CANVAS.addEventListener('touchstart', documentTouchStartHandler, false);
            document.addEventListener('touchmove', documentTouchMoveHandler, false);
            document.addEventListener('touchend', documentTouchEndHandler, false);
            document.addEventListener('keydown', documentKeyDownHandler, false);
            document.addEventListener('keyup', documentKeyUpHandler, false);
            window.addEventListener('resize', windowResizeHandler, false);

            // Force an initial resize to make sure the UI is sized correctly
            windowResizeHandler();

            // Initiate the main render loop of the game
            setInterval( loop, 1000 / FRAMERATE );

        }
    };

    /**
     * Event handler for window.onresize.
     */
    const windowResizeHandler = () => {
        WORLD.width = window.innerWidth * 0.9;
        WORLD.height = window.innerHeight * 0.9;

        // Resize the canvas
        CANVAS.width = WORLD.width;
        CANVAS.height = WORLD.height;

        // Determine the centered x/y position of the canvas
        const cvx = Math.round((window.innerWidth) - WORLD.width - (window.innerWidth * 0.03));
        const cvy = Math.round((window.innerHeight / 2) - (WORLD.height / 2));

        // Move the canvas
        CANVAS.style.position = 'absolute';
        CANVAS.style.left = cvx +'px';
        CANVAS.style.top = cvy + 'px';
    };

    /**
     * Event handler for SPACE DOWN key
     * @param event
     */
    const documentKeyDownHandler = event => {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        KEY_ACTIVATION[keyName] = true;
    };

    /**
     * Event handler for SPACE UP key
     * @param event
     */
    const documentKeyUpHandler = event => {
        const keyName = REVERSE_KEY_MAP[event.which];
        event.preventDefault();
        KEY_ACTIVATION[keyName] = false;
    };

    /**
     * Event handler for document.onmousemove.
     * @param event
     */
    function documentMouseMoveHandler(event){
        MOUSE.x = event.clientX - (window.innerWidth - WORLD.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - WORLD.height) * 0.5;
    }

    /**
     * Event handler for document.onmousedown.
     * @param event
     */
    function documentMouseDownHandler(event){
        MOUSE.down = true;

        MOUSE.x = event.clientX - (window.innerWidth - WORLD.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - WORLD.height) * 0.5;
    }

    /**
     * Event handler for document.onmouseup.
     * @param event
     */
    function documentMouseUpHandler(event) {
        MOUSE.down = false;

        MOUSE.x = event.clientX - (window.innerWidth - WORLD.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - WORLD.height) * 0.5;
    }

    /**
     * Event handler for document.ontouchstart.
     * @param event
     */
    function documentTouchStartHandler(event) {
        if(event.touches.length === 1) {
            event.preventDefault();

            MOUSE.x = event.touches[0].pageX - (window.innerWidth - WORLD.width) * 0.5;
            MOUSE.y = event.touches[0].pageY - (window.innerHeight - WORLD.height) * 0.5;

            MOUSE.down = true;
        }
    }

    /**
     * Event handler for document.ontouchmove.
     * @param event
     */
    function documentTouchMoveHandler(event) {
        if(event.touches.length === 1) {
            event.preventDefault();

            MOUSE.x = event.touches[0].pageX - (window.innerWidth - WORLD.width) * 0.5;
            MOUSE.y = event.touches[0].pageY - (window.innerHeight - WORLD.height) * 0.5;
        }
    }

    /**
     * Event handler for document.ontouchend.
     * @param event
     */
    function documentTouchEndHandler(event) {
        MOUSE.down = false;
    }



    /**
     * Called on every frame to update and render the world.
     */
    function loop() {

        CAMERA.orientation.y = MOUSE.x / 1000;
        CAMERA.orientation.x = (MOUSE.y / 1000) * -1;

        //check for user interaction
        if ( MOUSE.down ) {
            //nothing
        }
        if ( KEY_ACTIVATION.UP ) {
            CAMERA.move(INIT_SIZE);
        }
        if ( KEY_ACTIVATION.DOWN ) {
            CAMERA.move(-INIT_SIZE);
        }
        if ( KEY_ACTIVATION.LEFT ) {
            CAMERA.pan(-INIT_SIZE, 0);
        }
        if ( KEY_ACTIVATION.RIGHT ) {
            CAMERA.pan(INIT_SIZE, 0);
        }
        if ( KEY_ACTIVATION.R ) {
            CAMERA.pan(0, -INIT_SIZE);
        }
        if ( KEY_ACTIVATION.F ) {
            CAMERA.pan(0, INIT_SIZE);
        }

        if ( KEY_ACTIVATION.W ) {
            CAMERA.orientation.x += 0.03;
        }
        if ( KEY_ACTIVATION.A) {
            CAMERA.orientation.y -= 0.03;
        }
        if ( KEY_ACTIVATION.S ) {
            CAMERA.orientation.x -= 0.03;
        }
        if ( KEY_ACTIVATION.D) {
            CAMERA.orientation.y += 0.03;
        }
        if ( KEY_ACTIVATION.Q ) {
            CAMERA.orientation.z -= 0.03;
        }
        if ( KEY_ACTIVATION.E) {
            CAMERA.orientation.z += 0.03;
        }
        if ( KEY_ACTIVATION.T ) {
            CAMERA.zoom += 0.05;
        }
        if ( KEY_ACTIVATION.G) {
            CAMERA.zoom -= 0.05;
        }

        // Alter object by object and determin renderqueue
        OBJECTS_TO_RENDER.forEach(object => {
            const temp = object.getScreenCoords(WORLD, CAMERA);
            if ( !( temp.x < -WORLD.width ) || ( temp.y < -WORLD.height ) || ( temp.x > WORLD.width*2 ) || ( temp.y > WORLD.height*2 ) || ( temp.distance < 0 ) ) {
                renderPool.push(object);
            }
        });

        // sort render Queue
        renderPool.sort((a, b) => b.tempIndex - a.tempIndex);

        // render Queue
        CONTEXT.clearRect(0, 0, WORLD.width, WORLD.height);
        renderPool.forEach(object => object.render(WORLD, CAMERA, CONTEXT,1 ));

        renderPool = [];
    }
};

World3D.initialize();