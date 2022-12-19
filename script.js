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

var snakeSize = 1;

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
            col.className = "p-0 col  border-warning";
            
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
    /*
    if(posHistory[posHistory.length-1] != undefined){
        placeInCanvas(posHistory[posHistory.length-1], "#212529")
    }*/

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
    
    //posHistory[1] = new Position(posHistory[0].X, posHistory[0].Y);
    posHistory[0].X++;
    
    //prints position history
    for(let i = 0; i<posHistory.length; i++){
        console.log(`[${i}]: `+posHistory[i].X);
    }
}