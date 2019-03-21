export const KEY_MAP = {
    UP:    38,
    DOWN:  40,
    LEFT:  37,
    RIGHT: 39,
    W:     87,
    A:     65,
    S:     83,
    D:     68,
    Q:     81,
    E:     69,
    R:     82,
    F:     70,
    T:     84,
    G:     71
};

const REVERSE_KEY_MAP = {};
Object.entries(KEY_MAP).forEach(([key, val]) => REVERSE_KEY_MAP[val] = key);

export default REVERSE_KEY_MAP;