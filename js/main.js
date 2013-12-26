var field;
var controller;

function mainLoop() {
    players[0].updatePos();
    field.clear();
    players[0].draw(field);
}

function initField() {
    field = new Field("field");
    controller = new Controller();
    var loc = new Loc(50,50);
    var i = players.push(new Man("Player1", loc, 'rgb(200,0,0)'));
    console.log(i);
    players[i-1].draw(field);
    document.onkeydown = function (evt) {
        controller.do(evt.which || evt.keyCode, true);
    };
    document.onkeyup = function (evt) {
        controller.do(evt.which || evt.keyCode, false);
    };
    setInterval(mainLoop, 16.67);
}

window.onload = initField;