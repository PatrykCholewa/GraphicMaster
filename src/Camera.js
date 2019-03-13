import Line from "./Line";
import Length from "./Length";

export default class Camera {

    constructor(plain, focus) {
        this._plain = plain;
        this._focus = focus;
    }

    get plain() {
        return this._plain;
    }

    get focus() {
        return this._focus;
    }

    getViewOfLength(length) {
        return length.mapPoints( point => Line.getByLength(new Length(point, this._focus))
                                              .getIntersectionPointWithPlain(this._plain)
        );
    }

}