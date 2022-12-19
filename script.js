class Position{
    constructor(X,Y){
        this.X = X;
        this.Y = Y;
    }
}

var canvasDOM = document.getElementById("canvas");
var canvas = new Array(15); //initialize matrix

var posHistory = [];
posHistory[0] = new Position(
    Math.round(canvas.length/2)-1,
    Math.round(canvas.length/2)-1
)

var snakeSize = 10;
var snakeDir = 2;

/*
 0
3 1
 2
*/

//START
createCanvas();

//GAME LOOP
var loop = function() {
    setTimeout(function(){
        Update();
        window.requestAnimationFrame(loop);
    }, 750)
};
window.requestAnimationFrame(loop);


//FUNCTIONS
function createCanvas() {
    
    for(let i = 0; i<15; i++){
        canvas[i] = new Array(15);
    }

    for (let j = 0; j < 15; j++) {
        var row = document.createElement("div");
        row.className = "row flex-nowrap";

        canvasDOM.appendChild(row);

        for (let i = 0; i < 15; i++) {
            let col = document.createElement("div");
            col.className = "p-0 col border-warning";
            
            canvas[j][i] = document.createElement("div");
            canvas[j][i].className = "square";
            canvas[j][i].style.backgroundColor = "#212529"
            
            row.appendChild(col);
            col.appendChild(canvas[j][i]);
        }
    }
    return;
}

function placeInCanvas({X,Y}, color){
    canvas[X][Y].style.backgroundColor = color;
    return;
}

function Update(){
    console.log("snake moving");

    //clears snake path
    if(posHistory[snakeSize] != undefined){
        placeInCanvas(posHistory[snakeSize], "#212529");
    }
    
    //draws snake body
    for(let i = 0; i<posHistory.length-1; i++){
        placeInCanvas(posHistory[i], "green");
    }

    //moves history back in the array
    for(let i = snakeSize; i>=1; i--){
        if(posHistory[i-1] != undefined){
            posHistory[i] = new Position(posHistory[i-1].X, posHistory[i-1].Y);
        }
    }
    
    //change snake direction
    switch (snakeDir) {
        case 0:
            posHistory[0].X--;
            break;
        case 1:
            posHistory[0].Y++;
            break;
        case 2:
            posHistory[0].X++;
            break;
        case 3:
            posHistory[0].Y--;
            break;
        default:
            break;
    }

    //prints position history
    /*
    for(let i = 0; i<posHistory.length; i++){
        console.log(`[${i}]: `+posHistory[i].X);
    }*/
}