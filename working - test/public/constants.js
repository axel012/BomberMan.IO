
const LEFT = 1 << 0;
const RIGHT = 1 << 1;
const UP = 1 << 2;
const DOWN = 1 << 3;
const SPACE = 1 << 4;

/*
Ussage
commandKeys = LEFT | UP | SPACE
pressedLeft = (commandKeys & LEFT) >> 0
pressedRight = (commandsKeys & RIGHT) >> 1
pressedUp = (commandsKeys & UP) >> 2
 
*/