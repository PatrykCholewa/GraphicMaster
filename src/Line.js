import Vector from "./Vector";

export default class Line {

    static getDirectionalOfLength(l) {

        return new Vector([
            l[0][1]*l[1][2] - l[0][2]*l[1][1],
            l[0][2]*l[1][0] - l[0][0]*l[1][2],
            l[0][0]*l[1][1] - l[0][1]*l[0][0]
        ]);
    };

}