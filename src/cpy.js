import Point from './Point';

// The world dimensions, defaults to full screen
var world = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
};

/**
 *
 */
var world3D = new function() {

    // The number of times the game will be redrawn per second
    var FRAMERATE = 100000;
    var TIME = 0;

    // The canvas and its 2D context
    var canvs;
    var contxt;

    // The initial state of the mouse
    var mouse = {
        x: 0,
        y: 0,
        down: false
    };

    // The initial state of the keyboard
    var key = {
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

    // Holds all object instances
    var objectPool = [];

    // create some objects
    var initsize = 25;
    // cubeof dots
    objectPool.push(new Point( 0, 0, initsize*10 ));
    objectPool.push(new Point( 0, initsize*10, initsize*10 ));
    objectPool.push(new Point( initsize*10, initsize*10, initsize*10 ));
    objectPool.push(new Point( initsize*10, 0, initsize*10 ));

    objectPool.push(new Point( 0, 0, 0 ));
    objectPool.push(new Point( 0, initsize*10, 0));
    objectPool.push(new Point( initsize*10, initsize*10, 0 ));
    objectPool.push(new Point( initsize*10, 0, 0 ));

    // array of cubes
    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            objectPool.push(new line( new Point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ), new Point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new Point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new Point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new Point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ) ));

            objectPool.push(new line( new Point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ) ));

            objectPool.push(new line( new Point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new Point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new Point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
        };
    };

    // container for rendering queue
    var renderPool = [];

    // create camera  and set initial position
    var cam1 = new camera( -95, -604, -636, -0.6, 0.6, 0, 1.5, -2);


    /**
     * Initializes the world and starts rendering loop.
     */
    this.initialize = function(){

        // Collect references to all DOM elements being used
        canvs = document.getElementById('world');

        // Make sure that the Canvas element is available before continuing
        if (canvs && canvs.getContext) {
            contxt = canvs.getContext('2d');

            // Register event listeners
            document.addEventListener('mousemove', documentMouseMoveHandler, false);
            canvs.addEventListener('mousedown', documentMouseDownHandler, false);
            document.addEventListener('mouseup', documentMouseUpHandler, false);
            canvs.addEventListener('touchstart', documentTouchStartHandler, false);
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
        canvs.width = world.width;
        canvs.height = world.height;

        // Determine the centered x/y position of the canvas
        var cvx = Math.round( (window.innerWidth ) - world.width - (window.innerWidth * 0.03) );
        var cvy = Math.round( (window.innerHeight / 2) - (world.height / 2) );

        // Move the canvas
        canvs.style.position = 'absolute';
        canvs.style.left = cvx +'px';
        canvs.style.top = cvy + 'px';
    }

    /**
     * Event handler for SPACE DOWN key
     * @param event
     */
    function documentKeyDownHandler(event) {
        switch( event.keyCode ) {
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
        }
    }

    /**
     * Event handler for SPACE UP key
     * @param event
     */
    function documentKeyUpHandler(event) {
        switch( event.keyCode ) {
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
        }
    }

    /**
     * Event handler for document.onmousemove.
     * @param event
     */
    function documentMouseMoveHandler(event){
        mouse.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        mouse.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.onmousedown.
     * @param event
     */
    function documentMouseDownHandler(event){
        mouse.down = true;

        mouse.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        mouse.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.onmouseup.
     * @param event
     */
    function documentMouseUpHandler(event) {
        mouse.down = false;

        mouse.x = event.clientX - (window.innerWidth - world.width) * 0.5;
        mouse.y = event.clientY - (window.innerHeight - world.height) * 0.5;
    }

    /**
     * Event handler for document.ontouchstart.
     * @param event
     */
    function documentTouchStartHandler(event) {
        if(event.touches.length === 1) {
            event.preventDefault();

            mouse.x = event.touches[0].pageX - (window.innerWidth - world.width) * 0.5;
            mouse.y = event.touches[0].pageY - (window.innerHeight - world.height) * 0.5;

            mouse.down = true;
        }
    }

    /**
     * Event handler for document.ontouchmove.
     * @param event
     */
    function documentTouchMoveHandler(event) {
        if(event.touches.length === 1) {
            event.preventDefault();

            mouse.x = event.touches[0].pageX - (window.innerWidth - world.width) * 0.5;
            mouse.y = event.touches[0].pageY - (window.innerHeight - world.height) * 0.5;
        }
    }

    /**
     * Event handler for document.ontouchend.
     * @param event
     */
    function documentTouchEndHandler(event) {
        mouse.down = false;
    }



    /**
     * Called on every frame to update and render the world.
     */
    function loop() {

        cam1.orientation.y = mouse.x / 1000;
        cam1.orientation.x = (mouse.y / 1000) * -1;

        //check for user interaction
        if ( mouse.down ) {
            //nothing
        }
        if ( key.up ) {
            cam1.move(initsize);
        }
        if ( key.down ) {
            cam1.move(-initsize);
        }
        if ( key.left ) {
            cam1.pan(-initsize, 0);
        }
        if ( key.right ) {
            cam1.pan(initsize, 0);
        }
        if ( key.r ) {
            cam1.pan(0, -initsize);
        }
        if ( key.f ) {
            cam1.pan(0, initsize);
        }

        if ( key.w ) {
            cam1.orientation.x += 0.03;
        }
        if ( key.a) {
            cam1.orientation.y -= 0.03;
        }
        if ( key.s ) {
            cam1.orientation.x -= 0.03;
        }
        if ( key.d) {
            cam1.orientation.y += 0.03;
        }
        if ( key.q ) {
            cam1.orientation.z -= 0.03;
        }
        if ( key.e) {
            cam1.orientation.z += 0.03;
        }
        if ( key.t ) {
            cam1.zoom += 0.05;
        }
        if ( key.g) {
            cam1.zoom -= 0.05;
        }

        var temp;
        // Alter object by object and determin renderqueue
        for( var i = 0, len = objectPool.length; i < len; i++ ) {
            var object = objectPool[i];
            if (typeof object === 'undefined') {
                continue;
            }

            temp = object.getScreenCoords(world, cam1);
            if ( ( temp.x < -world.width ) || ( temp.y < -world.height ) || ( temp.x > world.width*2 ) || ( temp.y > world.height*2 ) || ( temp.distance < 0 ) ) {
                // do nothing
            } else {
                renderPool.push(object);
            }
        }
        // sort render Queue
        renderPool.sort(function(a, b){
            return b.tempIndex-a.tempIndex;
        });
        // render Queue

        contxt.clearRect(0, 0, world.width, world.height);
        for( var i = 0, len = renderPool.length; i < len; i++ ) {
            var object = renderPool[i];
            // Render Objects
            object.render(world, cam1, contxt,1 );
        }

        renderPool = [];

        TIME += 1;
    }
};

/**
 * Defines a 3D Camera and basic operations.
 * @param xpos
 * @param ypos
 * @param zpos
 * @param xori
 * @param yori
 * @param zori
 * @param zoom
 * @param stereo
 */
function camera( xpos, ypos, zpos, xori, yori, zori, zoom, stereo ) {
    this.position = { x: xpos || 0, y: ypos || 0, z: zpos || 0 };
    this.orientation = { x: xori || 0, y: yori || 0, z: zori || 0 };
    this.zoom = zoom || 1;
    this.stereo = stereo || 0;
};
camera.prototype.move = function( z ) {
    // Displace to make rotation point 0,0,0
    var tx = 0;
    var ty = 0;
    var tz = z;
    // Precalculates Sin & Cos for rotation angles
    var cosx = Math.cos(-this.orientation.x);
    var cosy = Math.cos(-this.orientation.y);
    var cosz = Math.cos(0);
    var sinx = Math.sin(-this.orientation.x);
    var siny = Math.sin(-this.orientation.y);
    var sinz = Math.sin(0);
    // Rotate Coordinate
    // http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
    var nx = ( cosy * ( sinz * ( ty ) + cosz * ( tx ) ) - siny * ( tz ) );
    var ny = ( sinx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) + cosx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    var nz = ( cosx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) - sinx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    // Reassign new coordinates and displace back to match rotation point
    this.position.x += nx;
    this.position.y += ny;
    this.position.z += nz;
};
camera.prototype.pan = function( x, y ) {
    // Displace to make rotation point 0,0,0
    var tx = x;
    var ty = y;
    var tz = 0;
    // Precalculates Sin & Cos for rotation angles
    var cosx = Math.cos(0);
    var cosy = Math.cos(-this.orientation.y);
    var cosz = Math.cos(-this.orientation.z);
    var sinx = Math.sin(0);
    var siny = Math.sin(-this.orientation.y);
    var sinz = Math.sin(-this.orientation.z);
    // Rotate Coordinate
    // http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
    var nx = ( cosy * ( sinz * ( ty ) + cosz * ( tx ) ) - siny * ( tz ) );
    var ny = ( sinx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) + cosx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    var nz = ( cosx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) - sinx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    // Reassign new coordinates and displace back to match rotation point
    this.position.x += nx;
    this.position.y += ny;
    this.position.z += nz;
};

function line( p1, p2 ) {
    this.points = new Array;
    this.points[0] = p1 || new Point( 0, 0, 0 );
    this.points[1] = p2 || new Point( 0, 0, 0 );
    this.tempIndex = 0;
};
line.prototype.rotate = function( x, y, z, xr, yr, zr) {
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].rotate( x, y, z, xr, yr, zr);
    };
};
line.prototype.getScreenCoords = function(world, c) {
    var screenCoords = this.points[0].getScreenCoords(world, c);
    this.tempIndex = this.points[0].tempIndex;
    return (screenCoords);
};
line.prototype.render = function(world, cam, cont, str ) {
    var screenCoords = this.points[0].getScreenCoords(world, cam);
    var screenCoords2 = this.points[1].getScreenCoords(world, cam);
    var distance = ((screenCoords.distance + screenCoords2.distance) / 2);
    var brightnes = Math.round((1 / (distance / 500) ) * 255);
    if (distance > 125) {
        cont.beginPath();
        cont.moveTo(screenCoords.x,screenCoords.y);
        cont.lineTo(screenCoords2.x,screenCoords2.y);
        cont.lineWidth = str;
        cont.strokeStyle = 'rgba('+brightnes+','+brightnes+','+brightnes+',1.0)';
        cont.stroke();
    }
};

world3D.initialize();