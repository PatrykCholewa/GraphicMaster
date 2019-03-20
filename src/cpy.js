import Point from './Point';
import Camera from "./Camera";
import OBJECTS_TO_RENDER from "./objects";

// The world dimensions, defaults to full screen
const world = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
};

const world3D = new function() {

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
    const key = {
        up: false,
        down: false,
        left: false,
        right: false,
        w: false,
        a: false,
        s: false,
        d: false,
        q: false,
        e: false,
        r: false,
        f: false,
        t: false,
        g: false
    };

    const INIT_SIZE = 25;

    // container for rendering queue
    let renderPool = [];

    // create camera  and set initial position
    const CAMERA = new Camera(new Point(-95, -604, -636), new Point(-0.6, 0.6, 0), 1.5, -2);

    /**
     * Initializes the world and starts rendering loop.
     */
    this.initialize = function(){

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
    function windowResizeHandler() {
        world.width = window.innerWidth * 0.9;
        world.height = window.innerHeight * 0.9;

        // Resize the canvas
        CANVAS.width = world.width;
        CANVAS.height = world.height;

        // Determine the centered x/y position of the canvas
        const cvx = Math.round((window.innerWidth) - world.width - (window.innerWidth * 0.03));
        const cvy = Math.round((window.innerHeight / 2) - (world.height / 2));

        // Move the canvas
        CANVAS.style.position = 'absolute';
        CANVAS.style.left = cvx +'px';
        CANVAS.style.top = cvy + 'px';
    }

    /**
     * Event handler for SPACE DOWN key
     * @param event
     */
    function documentKeyDownHandler(event) {
        switch( event.which ) {
            case 38:
                key.up = true;
                event.preventDefault();
                break;
            case 40:
                key.down = true;
                event.preventDefault();
                break;
            case 37:
                key.left = true;
                event.preventDefault();
                break;
            case 39:
                key.right = true;
                event.preventDefault();
                break;
            case 87:
                key.w = true;
                event.preventDefault();
                break;
            case 65:
                key.a = true;
                event.preventDefault();
                break;
            case 83:
                key.s = true;
                event.preventDefault();
                break;
            case 68:
                key.d = true;
                event.preventDefault();
                break;
            case 81:
                key.q = true;
                event.preventDefault();
                break;
            case 69:
                key.e = true;
                event.preventDefault();
                break;
            case 82:
                key.r = true;
                event.preventDefault();
                break;
            case 70:
                key.f = true;
                event.preventDefault();
                break;
            case 84:
                key.t = true;
                event.preventDefault();
                break;
            case 71:
                key.g = true;
                event.preventDefault();
                break;
            default:
        }
    }

    /**
     * Event handler for SPACE UP key
     * @param event
     */
    function documentKeyUpHandler(event) {
        switch( event.which ) {
            case 38:
                key.up = false;
                event.preventDefault();
                break;
            case 40:
                key.down = false;
                event.preventDefault();
                break;
            case 37:
                key.left = false;
                event.preventDefault();
                break;
            case 39:
                key.right = false;
                event.preventDefault();
                break;
            case 87:
                key.w = false;
                event.preventDefault();
                break;
            case 65:
                key.a = false;
                event.preventDefault();
                break;
            case 83:
                key.s = false;
                event.preventDefault();
                break;
            case 68:
                key.d = false;
                event.preventDefault();
                break;
            case 81:
                key.q = false;
                event.preventDefault();
                break;
            case 69:
                key.e = false;
                event.preventDefault();
                break;
            case 82:
                key.r = false;
                event.preventDefault();
                break;
            case 70:
                key.f = false;
                event.preventDefault();
                break;
            case 84:
                key.t = false;
                event.preventDefault();
                break;
            case 71:
                key.g = false;
                event.preventDefault();
                break;
            default:
        }
    }

    /**
     * Event handler for document.onmousemove.
     * @param event
     */
    function documentMouseMoveHandler(event){
        MOUSE.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.onmousedown.
     * @param event
     */
    function documentMouseDownHandler(event){
        MOUSE.down = true;

        MOUSE.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.onmouseup.
     * @param event
     */
    function documentMouseUpHandler(event) {
        MOUSE.down = false;

        MOUSE.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        MOUSE.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.ontouchstart.
     * @param event
     */
    function documentTouchStartHandler(event) {
        if(event.touches.length === 1) {
            event.preventDefault();

            MOUSE.x = event.touches[0].pageX - (window.innerWidth - world.width) * 0.5;
            MOUSE.y = event.touches[0].pageY - (window.innerHeight - world.height) * 0.5;

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

            MOUSE.x = event.touches[0].pageX - (window.innerWidth - world.width) * 0.5;
            MOUSE.y = event.touches[0].pageY - (window.innerHeight - world.height) * 0.5;
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
        if ( key.up ) {
            CAMERA.move(INIT_SIZE);
        }
        if ( key.down ) {
            CAMERA.move(-INIT_SIZE);
        }
        if ( key.left ) {
            CAMERA.pan(-INIT_SIZE, 0);
        }
        if ( key.right ) {
            CAMERA.pan(INIT_SIZE, 0);
        }
        if ( key.r ) {
            CAMERA.pan(0, -INIT_SIZE);
        }
        if ( key.f ) {
            CAMERA.pan(0, INIT_SIZE);
        }

        if ( key.w ) {
            CAMERA.orientation.x += 0.03;
        }
        if ( key.a) {
            CAMERA.orientation.y -= 0.03;
        }
        if ( key.s ) {
            CAMERA.orientation.x -= 0.03;
        }
        if ( key.d) {
            CAMERA.orientation.y += 0.03;
        }
        if ( key.q ) {
            CAMERA.orientation.z -= 0.03;
        }
        if ( key.e) {
            CAMERA.orientation.z += 0.03;
        }
        if ( key.t ) {
            CAMERA.zoom += 0.05;
        }
        if ( key.g) {
            CAMERA.zoom -= 0.05;
        }

        // Alter object by object and determin renderqueue
        OBJECTS_TO_RENDER.forEach(object => {
            const temp = object.getScreenCoords(world, CAMERA);
            if ( !( temp.x < -world.width ) || ( temp.y < -world.height ) || ( temp.x > world.width*2 ) || ( temp.y > world.height*2 ) || ( temp.distance < 0 ) ) {
                renderPool.push(object);
            }
        });

        // sort render Queue
        renderPool.sort((a, b) => b.tempIndex - a.tempIndex);

        // render Queue
        CONTEXT.clearRect(0, 0, world.width, world.height);
        renderPool.forEach(object => object.render(world, CAMERA, CONTEXT,1 ));

        renderPool = [];
    }
};

world3D.initialize();