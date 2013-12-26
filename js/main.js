var field;

function mainLoop() {
    
}

function initField() {
    field = new Field("field");
    var loc = new Loc(50,50);
    var i = players.push(new Man("Player1", loc, 'rgb(200,0,0)'));
    console.log(i);
    players[i-1].draw(field);
    document.onkeydown = handleKey;
}

window.onload = initField;