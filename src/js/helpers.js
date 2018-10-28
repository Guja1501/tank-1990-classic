function isCrushed(m, a, b) {
    return m > abs(a.x - b.x) && m > abs(a.y - b.y);
}

function isModelsCrushed(a, b){
    return isCrushed((a.size + b.size) / 2, a.pos, b.pos);
}

function outOfArea(a) {
    return !inRange(a.pos.x, -a.size, width + a.size, height + a.size) ||
        !inRange(a.pos.y, -a.size, width + a.size, height + a.size);
}

function inRange(t, a, b) {
    return t >= a && t <= b;
}