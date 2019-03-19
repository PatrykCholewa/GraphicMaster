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
    var FRAMERATE = 48;
    var TIME = 0;



    // The canvas and its 2D context
    var canvs;
    var canvs2;
    var contxt;
    var contxt2;

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

    // Contains settings that are saved and restored between sessions
    var settings = {
        infosOn: false,
        statusOn: false,
        rotationOn: false
    };

    // Holds all object instances
    var objectPool = [];

    // create some objects
    var initsize = 25;
    // cubeof dots
    objectPool.push(new point( 0, 0, initsize*10 ));
    objectPool.push(new point( 0, initsize*10, initsize*10 ));
    objectPool.push(new point( initsize*10, initsize*10, initsize*10 ));
    objectPool.push(new point( initsize*10, 0, initsize*10 ));

    objectPool.push(new point( 0, 0, 0 ));
    objectPool.push(new point( 0, initsize*10, 0));
    objectPool.push(new point( initsize*10, initsize*10, 0 ));
    objectPool.push(new point( initsize*10, 0, 0 ));

    // array of cubes
    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            objectPool.push(new line( new point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ), new point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ) ));

            objectPool.push(new line( new point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ) ));

            objectPool.push(new line( new point( 0+(initsize*20*i), 0, 0+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), 0, 0+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), 0, initsize*10+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), 0, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), initsize*10, initsize*10+(initsize*20*j) ) ));
            objectPool.push(new line( new point( 0+(initsize*20*i), initsize*10, 0+(initsize*20*j) ), new point( initsize*10+(initsize*20*i), initsize*10, 0+(initsize*20*j) ) ));
        };
    };

    // container for rendering queue
    var renderPool = [];

    // create camera  and set initial position
    //var cam1 = new camera( (initsize*5), -initsize*5*j/3, -initsize*15, -0.6, 0.4, 0, 1.5, -5);
    //var cam2 = new camera( (initsize*5), -initsize*5*j/3, -initsize*15, -0.6, 0.4, 0, 1.5, +5);
    var cam1 = new camera( -95, -604, -636, -0.6, 0.6, 0, 1.5, -2);
    //var cam2 = new camera( -95, -604, -636, -0.6, 0.6, 0, 1.5, 2);

    // creates ui element container object
    var ui = {
        infoToggle: null,
        status: null,
        statusContent: null,
        instructions: null,
        options: null,
        rotationButton: null,
        statusButton: null,
        resetButton: null
    };


    /**
     * Initializes the world and starts rendering loop.
     */
    this.initialize = function(){

        // Collect references to all DOM elements being used
        canvs = document.getElementById('world');
        //canvs2 = document.getElementById('world2');
        ui.infoToggle = document.getElementById('infotoggle');
        ui.status = document.getElementById('status');
        ui.statusContent = ui.status.getElementsByTagName( 'span' )[0];
        ui.instructions = document.getElementById('instructions');
        ui.options = document.getElementById('options');
        ui.rotationButton = document.getElementById('rotation-button');
        ui.statusButton = document.getElementById('status-button');
        //ui.resetButton = document.getElementById('reset-button');

        // Make sure that the Canvas element is available before continuing
        if (canvs && canvs.getContext) {
            contxt = canvs.getContext('2d');
            //contxt2 = canvs2.getContext('2d');

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
            ui.infoToggle.addEventListener('click', infoToggleClickedHandler, false);
            ui.rotationButton.addEventListener('click', rotationButtonClickedHandler, false);
            ui.statusButton.addEventListener('click', statusButtonClickedHandler, false);
            //ui.resetButton.addEventListener('click', resetButtonClickedHandler, false);

            // Attempts to restore settings from saved data if there is any
            restoreSettings();

            updateUI();

            // Force an initial resize to make sure the UI is sized correctly
            windowResizeHandler();

            // Initiate the main render loop of the game
            setInterval( loop, 1000 / FRAMERATE );

        }
    };

    /**
     * Restores settings from local storage if there are any available
     */
    function restoreSettings() {
    }

    /**
     * Pushes the current settings to local history.
     */
    function saveSettings() {
    }

    /**
     * Function to update UI Elements
     */
    function updateUI() {
        if( settings.infosOn ) {
            ui.instructions.style.display = 'block';
        }
        else {
            ui.instructions.style.display = 'none';
        }
        if( settings.statusOn ) {
            ui.status.style.display = 'block';
            ui.statusButton.setAttribute( "class", "switchOn" );
        }
        else {
            ui.status.style.display = 'none';
            ui.statusButton.setAttribute( "class", "switch" );
        }
        if( settings.rotationOn ) {
            ui.rotationButton.setAttribute( "class", "switchOn" );
        }
        else {
            ui.rotationButton.setAttribute( "class", "switch" );
        }
    }

    /**
     * Event handler for window.onresize.
     */
    function windowResizeHandler() {
        world.width = window.innerWidth * 0.9;
        world.height = window.innerHeight * 0.9;

        // Resize the canvas
        canvs.width = world.width;
        canvs.height = world.height;
        //canvs2.width = world.width;
        //canvs2.height = world.height;

        // Determine the centered x/y position of the canvas
        var cvx = Math.round( (window.innerWidth ) - world.width - (window.innerWidth * 0.03) );
        //var cvx2 = Math.round( (window.innerWidth / 2) + (window.innerWidth * 0.03) );
        var cvy = Math.round( (window.innerHeight / 2) - (world.height / 2) );

        // Move the canvas
        canvs.style.position = 'absolute';
        canvs.style.left = cvx +'px';
        canvs.style.top = cvy + 'px';
        //canvs2.style.position = 'absolute';
        //canvs2.style.left = cvx2 +'px';
        //canvs2.style.top = cvy + 'px';

        // Adjust infoLayer
        ui.instructions.style.width = (world.width * 2) + 'px';
    }
    /**
     * Event handler for Reset Button
     * @param event
     */
    function resetButtonClickedHandler( event ) {
        event.preventDefault();
    }

    /**
     * Event handler for rotation Button
     * @param event
     */
    function rotationButtonClickedHandler( event ) {
        settings.rotationOn = !settings.rotationOn;

        updateUI();
        saveSettings();

        event.preventDefault();
    }

    /**
     * Event handler for status Button
     * @param event
     */
    function statusButtonClickedHandler( event ) {
        settings.statusOn = !settings.statusOn;

        updateUI();
        saveSettings();

        event.preventDefault();
    }

    /**
     * Event handler for info Button
     * @param event
     */
    function infoToggleClickedHandler( event ) {
        settings.infosOn = !settings.infosOn;

        updateUI();
        saveSettings();

        event.preventDefault();
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

        //contxt.fillStyle = "rgba(0,0,0,1)";
        //contxt.fillRect( 0, 0, world.width, world.height );
        //contxt2.fillStyle = "rgba(0,0,0,1)";
        //contxt2.fillRect( 0, 0, world.width, world.height );
        //contxt.clearRect( 0, 0, world.width, world.height );
        //contxt2.clearRect( 0, 0, world.width, world.height );

        cam1.orientation.y = mouse.x / 1000;
        cam1.orientation.x = (mouse.y / 1000) * -1;

        //check for user interaction
        if ( mouse.down ) {
            //nothing
        }
        if ( key.up ) {
            cam1.move(initsize);
            //cam2.move(initsize);
        }
        if ( key.down ) {
            cam1.move(-initsize);
            //cam2.move(-initsize);
        }
        if ( key.left ) {
            cam1.pan(-initsize, 0);
            //cam2.pan(-initsize, 0);
        }
        if ( key.right ) {
            cam1.pan(initsize, 0);
            //cam2.pan(initsize, 0);
        }
        if ( key.r ) {
            cam1.pan(0, -initsize);
            //cam2.pan(0, -initsize);
        }
        if ( key.f ) {
            cam1.pan(0, initsize);
            //cam2.pan(0, initsize);
        }

        if ( key.w ) {
            cam1.orientation.x += 0.03;
            //cam2.orientation.x += 0.03;
        }
        if ( key.a) {
            cam1.orientation.y -= 0.03;
            //cam2.orientation.y -= 0.03;
        }
        if ( key.s ) {
            cam1.orientation.x -= 0.03;
            //cam2.orientation.x -= 0.03;
        }
        if ( key.d) {
            cam1.orientation.y += 0.03;
            //cam2.orientation.y += 0.03;
        }
        if ( key.q ) {
            cam1.orientation.z -= 0.03;
            //cam2.orientation.z -= 0.03;
        }
        if ( key.e) {
            cam1.orientation.z += 0.03;
            //cam2.orientation.z += 0.03;
        }
        if ( key.t ) {
            cam1.zoom += 0.05;
            //cam2.zoom += 0.05;
        }
        if ( key.g) {
            cam1.zoom -= 0.05;
            //cam2.zoom -= 0.05;
        }


        // update info-layer if visible
        if (settings.statusOn) {
            ui.statusContent.innerHTML = "ObjectCount: " + objectPool.length + "<br />TimeCode: " + TIME;
            ui.statusContent.innerHTML += "<br / >CAM1 x:" + cam1.position.x + " y:" + cam1.position.y + " z:" + cam1.position.z;
            ui.statusContent.innerHTML += " xo:" + cam1.orientation.x + " yo:" + cam1.orientation.y + " zo:" + cam1.orientation.z + " zoom:" + cam1.zoom;
            //ui.statusContent.innerHTML += "<br / >CAM2 x:" + cam2.position.x + " y:" + cam2.position.y + " z:" + cam2.position.z;
            //ui.statusContent.innerHTML += " xo:" + cam2.orientation.x + " yo:" + cam2.orientation.y + " zo:" + cam2.orientation.z + " zoom:" + cam2.zoom;
            ui.statusContent.innerHTML += "<br /> OBJ1 x:" + objectPool[1].position.x + " y:" + objectPool[1].position.y + " z:" + objectPool[1].position.z;
            ui.statusContent.innerHTML += "<br / >MOUSE x:" + mouse.x + " y:" + mouse.y;
        }

        var temp;
        // Alter object by object and determin renderqueue
        for( var i = 0, len = objectPool.length; i < len; i++ ) {
            var object = objectPool[i];
            if (typeof object === 'undefined') {
                continue;
            }

            // rotate 1st 20 objects if rotation is on
            if (settings.rotationOn && i < 20) {
                object.rotate(initsize*5, initsize*5, initsize*5, 0, (Math.PI*2)/FRAMERATE, 0);
            }
            temp = object.getScreenCoords(cam1);
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

        //contxt.fillStyle = "rgba(0,0,0,1)";
        //contxt.fillRect( 0, 0, world.width, world.height );
        contxt.clearRect(0, 0, world.width, world.height);
        //contxt.fillRect( 0, 0, world.width, world.height );
        for( var i = 0, len = renderPool.length; i < len; i++ ) {
            var object = renderPool[i];
            // Render Objects
            object.render( cam1, contxt,1 );
            //object.render( cam2, contxt2, 2 );
        }

        renderPool = [];

        // Reindex object Array
        // Create new placeholder pool, fill with valids and overwrite pool
        //var cleanPool = [];
        //for (var i in objectPool) {
        //  if( objectPool[i] ) {
        //	cleanPool.push( objectPool[i] );
        //  }
        //}
        //objectPool = cleanPool;

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

/**
 * Defines a 3D Point and basic operations.
 * @param x
 * @param y
 * @param z
 */
function point( x, y, z ) {
    this.position = { x: x || 0, y: y || 0, z: z || 0 };
    this.tempIndex = 0;
};
point.prototype.distanceTo = function(p) {
    var dx = p.x-this.position.x;
    var dy = p.y-this.position.y;
    var dz = p.z-this.position.z;
    return Math.sqrt((Math.pow(dx, 2)) + (Math.pow(dy, 2)) + (Math.pow(dz, 2)));
    //return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
};
point.prototype.rotate = function( x, y, z, xr, yr, zr) {
    // Displace to make rotation point 0,0,0
    var tx = this.position.x - x;
    var ty = this.position.y - y;
    var tz = this.position.z - z;
    // Precalculates Sin & Cos for rotation angles
    var cosx = Math.cos(xr);
    var cosy = Math.cos(yr);
    var cosz = Math.cos(zr);
    var sinx = Math.sin(xr);
    var siny = Math.sin(yr);
    var sinz = Math.sin(zr);
    // Rotate Coordinate
    // http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
    var nx = ( cosy * ( sinz * ( ty ) + cosz * ( tx ) ) - siny * ( tz ) );
    var ny = ( sinx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) + cosx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    var nz = ( cosx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) - sinx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    // Reassign new coordinates and displace back to match rotation point
    this.position.x = nx + x;
    this.position.y = ny + y;
    this.position.z = nz + z;
};
point.prototype.getScreenCoords = function(c) {
    // Displace to make rotation point 0,0,0
    var tx = this.position.x - c.position.x;
    var ty = this.position.y - c.position.y;
    var tz = this.position.z - c.position.z;
    // Precalculates Sin & Cos for rotation angles
    var cosx = Math.cos(c.orientation.x);
    var cosy = Math.cos(c.orientation.y);
    var cosz = Math.cos(c.orientation.z);
    var sinx = Math.sin(c.orientation.x);
    var siny = Math.sin(c.orientation.y);
    var sinz = Math.sin(c.orientation.z);
    // Rotate Coordinate
    // http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
    var nx = ( cosy * ( sinz * ( ty ) + cosz * ( tx ) ) - siny * ( tz ) );
    var ny = ( sinx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) + cosx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    var nz = ( cosx * ( cosy * ( tz ) + siny * ( sinz * ( ty ) + cosz * ( tx ) ) ) - sinx * ( cosz * ( ty ) - sinz * ( tx ) ) );
    // Return ScreenCoordinates and distance to viewing plane
    this.tempIndex = nz;
    return {
        x : (((nx+c.stereo) * (c.zoom/nz)) * (world.height/2)) + (world.width/2),
        y : (((ny+c.stereo) * (c.zoom/nz)) * (world.height/2)) + (world.height/2),
        distance : nz
    };
};
point.prototype.render = function( cam, cont, str ) {
    // Get Screen Coordinates
    var screenCoords = this.getScreenCoords(cam);
    // Check distance to camera before rendering
    if (screenCoords.distance > 0) {
        // Plot Square
        //cont.fillStyle = 'rgba('+Math.round(255)+','+Math.round(255)+','+Math.round(255)+',1.0)';
        //cont.fillRect( screenCoords.x-(str*2), screenCoords.y-(str*2), str*4, str*4 );
        // Draw Circle
        cont.beginPath();
        cont.arc( screenCoords.x, screenCoords.y, str*2, 0, Math.PI*2, true );
        cont.strokeStyle = 'rgba('+255+','+255+','+255+',1.0)';
        cont.lineWidth = 1;
        cont.stroke();
    }
};

function line( p1, p2 ) {
    this.points = new Array;
    this.points[0] = p1 || new point( 0, 0, 0 );
    this.points[1] = p2 || new point( 0, 0, 0 );
    this.tempIndex = 0;
};
line.prototype.rotate = function( x, y, z, xr, yr, zr) {
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].rotate( x, y, z, xr, yr, zr);
    };
};
line.prototype.getScreenCoords = function(c) {
    var screenCoords = this.points[0].getScreenCoords(c);
    this.tempIndex = this.points[0].tempIndex;
    return (screenCoords);
};
line.prototype.render = function( cam, cont, str ) {
    var screenCoords = this.points[0].getScreenCoords(cam);
    var screenCoords2 = this.points[1].getScreenCoords(cam);
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