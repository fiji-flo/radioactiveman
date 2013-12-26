/**
 * @author fiji
 */

var BG_COLOR = "rgb(255,255,255)";
var BLOCK_SIZE = 20;
var STEP = 4;
var arrows = {};
arrows.left = 37;
arrows.up = 38;
arrows.right = 39;
arrows.down = 40;

var players = [];

/** @constructor */
function Loc(x, y) {
    this.x = x;
    this.y = y;
}


/** @constructor */
function Field(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');    
}

Field.prototype.clear = function () {
    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/** @constructor */
function Man(name, loc, color) {
    this.name = name;
    this.loc = loc;
    this.color = color;
    this.size = BLOCK_SIZE;
}

Man.prototype.draw = function () {
    field.ctx.fillStyle = this.color;
    field.ctx.fillRect(this.loc.x, this.loc.y, this.size, this.size);
};

Man.prototype.moveRight = function () {
    this.loc.x += STEP;
};
Man.prototype.moveLeft = function () {
    this.loc.x -= STEP;
};
Man.prototype.moveUp = function () {
    this.loc.y -= STEP;
};
Man.prototype.moveDown = function () {
    this.loc.y += STEP;
};

function handleKey(evt) {
    if (players.length > 0) {
        var moved = false;
        if (evt.keyCode == arrows.right) {
            moved = true;
            players[0].moveRight();
        }
        if (evt.keyCode == arrows.left) {
            moved = true;
            players[0].moveLeft();
        }
        if (evt.keyCode == arrows.up) {
            moved = true;
            players[0].moveUp();
        }
        if (evt.keyCode == arrows.down) {
            moved = true;
            players[0].moveDown();
        }
        if (moved) {
            field.clear();
            players[0].draw();
        }
    }
}
