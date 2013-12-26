/**
 * @author fiji
 */

var BG_COLOR = "rgb(255,255,255)";
var BLOCK_SIZE = 20;
var STEP = 4;
var keymap = {};
keymap.left = 37;
keymap.up = 38;
keymap.right = 39;
keymap.down = 40;

var players = [];
var pressedKeys = {};

/** @constructor */
function Loc(x, y) {
    this.x = x;
    this.y = y;
}

/** @constructor */
function Controller() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.fire = false;
    this.alt = false;
}

Controller.prototype.do = function(keyCode, pressed) {
    switch (keyCode) {
        case keymap.left:
            this.left = pressed;
            break;
        case keymap.right:
            this.right = pressed;
            break;
        case keymap.up:
            this.up = pressed;
            break;
        case keymap.down:
            this.down = pressed;
            break;
    }
};

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

Man.prototype.updatePos = function () {
    if (controller.up) {
        this.loc.y -= STEP;
    }    
    if (controller.down) {
        this.loc.y += STEP;
    }
    if (controller.left) {
        this.loc.x -= STEP;
    }
    if (controller.right) {
        this.loc.x += STEP;
    }
};


function handleKey(evt) {
    if (players.length > 0) {
        var moved = false;
        if (evt.keyCode == keymap.right) {
            moved = true;
            players[0].moveRight();
        }
        if (evt.keyCode == keymap.left) {
            moved = true;
            players[0].moveLeft();
        }
        if (evt.keyCode == keymap.up) {
            moved = true;
            players[0].moveUp();
        }
        if (evt.keyCode == keymap.down) {
            moved = true;
            players[0].moveDown();
        }
        if (moved) {
            field.clear();
            players[0].draw();
        }
    }
}
