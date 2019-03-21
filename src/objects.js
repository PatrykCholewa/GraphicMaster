import Length from "./Length";
import Point from "./Point";

// Holds all object instances
const OBJECTS_TO_RENDER = [];

const INIT_SIZE = 25;

for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10 , INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j )
        ));

        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j )
        ));

        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, 0, INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 10 + INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 10 + INIT_SIZE * 20 * j )
        ));
        OBJECTS_TO_RENDER.push(new Length(
            new Point( INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j ),
            new Point( INIT_SIZE * 10 + INIT_SIZE * 20 * i, INIT_SIZE * 10, INIT_SIZE * 20 * j )
        ));
    }
}

export default OBJECTS_TO_RENDER;