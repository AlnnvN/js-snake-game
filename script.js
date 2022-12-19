class Position{
    constructor(X,Y){
        this.X = X;
        this.Y = Y;
    }
}

var canvasSize = 15;
var canvasDOM = document.getElementById("canvas");
var canvas = new Array(canvasSize); //initialize matrix

//GAME SETTINGS
var posHistory = [];
posHistory[0] = new Position( //start pos
    Math.round(canvas.length/2)-1,
    Math.round(canvas.length/2)-1
)
var snakeSize = 3; //snake starting size
var snakeDir = 2; //snake starting direction


//keyboard input
document.addEventListener("keydown",(event)=>{
    if(event.code == "ArrowUp" && snakeDir != 2){
        snakeDir = 0;
    }
    else if(event.code == "ArrowRight"  && snakeDir != 3){
        snakeDir = 1;
    }
    else if(event.code == "ArrowDown"  && snakeDir != 0){
        snakeDir = 2;
    }
    else if(event.code == "ArrowLeft"  && snakeDir != 1){
        snakeDir = 3;
    }
}) 
//

//START
createCanvas();
//

//GAME LOOP
var loop = function() {
    setTimeout(function(){
        Update();
        window.requestAnimationFrame(loop);
    }, 100)
};
window.requestAnimationFrame(loop);
//

//FUNCTIONS
function createCanvas() {
    
    for(let i = 0; i<canvasSize; i++){
        canvas[i] = new Array(canvasSize);
    }

    for (let j = 0; j < canvasSize; j++) {
        var row = document.createElement("div");
        row.className = "row flex-nowrap";

        canvasDOM.appendChild(row);

        for (let i = 0; i < canvasSize; i++) {
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

    clearSnakePath();
    drawSnakeBody();
    updatePosHistory();
    changeDirection();
    canvasLimitTreatment();

    function clearSnakePath() {
        if (posHistory[snakeSize] != undefined) {
            placeInCanvas(posHistory[snakeSize], "#212529");
        }
    }

    function drawSnakeBody() {
        for (let i = 0; i < posHistory.length - 1; i++) {
            placeInCanvas(posHistory[i], "green");
        }
    }

    function updatePosHistory() {
        //move history back in the array
        for (let i = snakeSize; i >= 1; i--) {
            if (posHistory[i - 1] != undefined) {
                posHistory[i] = new Position(posHistory[i - 1].X, posHistory[i - 1].Y);
            }
        }
    }

    function changeDirection() {
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
    }

    function canvasLimitTreatment() {
        if (posHistory[0].X > canvasSize - 1) {
            posHistory[0].X = 0;
        }
        if (posHistory[0].X < 0) {
            posHistory[0].X = canvasSize - 1;
        }
        if (posHistory[0].Y > canvasSize - 1) {
            posHistory[0].Y = 0;
        }
        if (posHistory[0].Y < 0) {
            posHistory[0].Y = canvasSize - 1;
        }
    }

    function printPosHistory() {
        for (let i = 0; i < posHistory.length; i++) {
            console.log(`[${i}]: ` + posHistory[i].X);
        }
    }
}