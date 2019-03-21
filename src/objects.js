import Length from "./Length";
import Point from "./Point";

const OBJECTS_TO_RENDER = [];
const SIZE_UNIT = 25;

for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10 , SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j )
        ));

        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j )
        ));

        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, 0, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 10 + SIZE_UNIT * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j ),
            new Point( SIZE_UNIT * 10 + SIZE_UNIT * 20 * i, SIZE_UNIT * 10, SIZE_UNIT * 20 * j )
        ));
    }
}

export default OBJECTS_TO_RENDER;