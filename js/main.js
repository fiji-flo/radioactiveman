var field;
var controller;
var frame;


function mainLoop() {
    frame =  (frame + 1) % FRAME_MOD;
    for (var i = 0; i < players.length; i++) {
        players[i].updatePos();
    }
    field.clear();
    for (var i = 0; i < players.length; i++) {
        players[i].draw(field);
    }
}

function initField() {
    frame = 0;
    field = new Field("field");
    var keymap1 = new Keymap(37, 38, 39, 40, 32);
    var keymap2 = new Keymap(65, 87, 68, 83, 16);
    var i = players.push(new Man("Player1", new Loc(50,50), 'rgb(200,0,0)', keymap1));
    var i = players.push(new Man("Player2", new Loc(100,100), 'rgb(0,0,200)', keymap2));
    document.onkeydown = function (evt) {
        console.log(evt.keyCode);
        for (var j = 0; j < players.length; j++) {
            players[j].controller.do(evt.which || evt.keyCode, true);
        }
    };
    document.onkeyup = function (evt) {
        for (var j = 0; j < players.length; j++) {
            players[j].controller.do(evt.which || evt.keyCode, false);
        }
    };
    setInterval(mainLoop, 100);
}

window.onload = initField;