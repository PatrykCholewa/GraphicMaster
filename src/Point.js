import Vector from "./Vector";

export default class Point extends Vector {

    constructor(x, y, z) {
        super([x || 0, y || 0, z || 0]);
        this._tempIndex = 0;
    }

    get tempIndex() {
        return this._tempIndex;
    }

    set tempIndex(ti) {
        this._tempIndex = ti;
    }

    get x() {
        return this[0];
    }

    set x(x) {
        this.data[0][0] = x;
    }

    get y() {
        return this[1];
    }

    set y(y) {
        this.data[0][1] = y;
    }

    get z() {
        return this[2];
    }

    set z(z) {
        this.data[0][2] = z;
    }

    distanceTo(p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var dz = p.z - this.z;
        return Math.sqrt((Math.pow(dx, 2)) + (Math.pow(dy, 2)) + (Math.pow(dz, 2)));
    }

    rotate( x, y, z, xr, yr, zr) {
        // Displace to make rotation point 0,0,0
        var tx = this.x - x;
        var ty = this.y - y;
        var tz = this.z - z;
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
        this.data[0][0] = nx + x;
        this.data[0][1] = ny + y;
        this.data[0][2] = nz + z;
    }

    getScreenCoords(wld, c) {
        // Displace to make rotation point 0,0,0
        var tx = this.x - c.position.x;
        var ty = this.y - c.position.y;
        var tz = this.z - c.position.z;
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
        this._tempIndex = nz;
        return {
            x : (((nx+c.stereo) * (c.zoom/nz)) * (wld.height/2)) + (wld.width/2),
            y : (((ny+c.stereo) * (c.zoom/nz)) * (wld.height/2)) + (wld.height/2),
            distance : nz
        };
    }

    render( wld, cam, cont, str ) {
        // Get Screen Coordinates
        var screenCoords = this.getScreenCoords(wld, cam);
        // Check distance to camera before rendering
        if (screenCoords.distance > 0) {
            // Draw Circle
            cont.beginPath();
            cont.arc( screenCoords.x, screenCoords.y, str*2, 0, Math.PI*2, true );
            cont.strokeStyle = 'rgba('+255+','+255+','+255+',1.0)';
            cont.lineWidth = 1;
            cont.stroke();
        }
    }

}