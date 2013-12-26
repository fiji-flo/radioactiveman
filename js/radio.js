/**
 * @author fiji
 */

var FRAME_MOD = 10000;
var BG_COLOR = "rgb(255,255,255)";
var BLOCK_SIZE = 20;
var BOMB_SIZE = 10;
var BOMB_TICKS = 40;
var STEP = 4;
var players = [];

function frameTime(t) {
    return t % FRAME_MOD;
}

/** @constructor */
function Loc(x, y) {
    this.x = x;
    this.y = y;
}


/** @constructor */
function Keymap(left, up, right, down, fire) {
    this.left = left;
    this.up = up;
    this.right = right;
    this.down = down;
    this.fire = fire;
}

/** @constructor */
function Controller(keymap) {
    this.keymap = keymap;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.fire = false;
    this.alt = false;
}

Controller.prototype.do = function(keyCode, pressed) {
    switch (keyCode) {
        case this.keymap.left:
            this.left = pressed;
            break;
        case this.keymap.right:
            this.right = pressed;
            break;
        case this.keymap.up:
            this.up = pressed;
            break;
        case this.keymap.down:
            this.down = pressed;
            break;
        case this.keymap.fire:
            this.fire = pressed;
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
function Man(name, loc, color, keymap) {
    this.name = name;
    this.loc = loc;
    this.color = color;
    this.size = BLOCK_SIZE;
    this.controller = new Controller(keymap);
    this.bombs = [];
    this.maxBombs = 4;
    this.bombRadius = 2;
}

Man.prototype.draw = function () {
    field.ctx.fillStyle = this.color;
    field.ctx.fillRect(this.loc.x, this.loc.y, this.size, this.size);
    for (var i = 0; i < this.bombs.length; i++) {
        if (this.bombs[i].explodeFrame == frame) {
            this.bombs[i].exploding = true;
        }
        if (this.bombs[i].exploding) {
            field.ctx.fillRect(this.bombs[i].loc.x - this.bombs[i].radius * BLOCK_SIZE, this.bombs[i].loc.y, BLOCK_SIZE * (2 * this.bombs[i].radius + 1), BLOCK_SIZE);
            field.ctx.fillRect(this.bombs[i].loc.x, this.bombs[i].loc.y - this.bombs[i].radius * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE * (2 * this.bombs[i].radius + 1));
        }
        field.ctx.fillRect(this.bombs[i].loc.x, this.bombs[i].loc.y, BOMB_SIZE, BOMB_SIZE);
    }
};

Man.prototype.updatePos = function () {
    if (this.controller.up) {
        this.loc.y -= STEP;
    }    
    if (this.controller.down) {
        this.loc.y += STEP;
    }
    if (this.controller.left) {
        this.loc.x -= STEP;
    }
    if (this.controller.right) {
        this.loc.x += STEP;
    }
    if (this.controller.fire) {
        this.deployBomb();
    }
};

Man.prototype.deployBomb = function() {
    if (this.bombs.length < this.maxBombs) {
        this.bombs.push(new Bomb(this.bombRadius, new Loc(this.loc.x, this.loc.y)));
    }
};

/** @constructor */
function Bomb(radius, loc) {
    this.loc = loc;
    this.radius = radius;
    this.explodeFrame = frameTime(frame + BOMB_TICKS);
    this.exploding = false;
}
