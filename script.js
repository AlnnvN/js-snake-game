class Position{
    constructor(X,Y){
        this.X = X;
        this.Y = Y;
    }
}

var Fruit = {
    color: "#F02D3A",
    isPlaced: false,
    position: new Position
}

var Canvas = {
    color: "#002A32"/*"#212529""#00120B"*/,
    size: 19,
    DOM: document.getElementById("canvas"),
    array: new Array(this.size)
}

var Snake = {
    color: "#31e981",
    direction: 2,
    size: 3,
    posHistory: [new Position( 
    Math.round(Canvas.size/2)-1,
    Math.round(Canvas.size/2)-1
    )]
}

var Game = {
    speed: 90,
    isPlaying: true
}

//keyboard input
document.addEventListener("keydown",(event)=>{
    if(event.code == "ArrowUp" && Snake.direction != 2){
        Snake.direction = 0;
    }
    else if(event.code == "ArrowRight"  && Snake.direction != 3){
        Snake.direction = 1;
    }
    else if(event.code == "ArrowDown"  && Snake.direction != 0){
        Snake.direction = 2;
    }
    else if(event.code == "ArrowLeft"  && Snake.direction != 1){
        Snake.direction = 3;
    }
}) 

Play();

//FUNCTIONS
function Play() {
    //START
    createCanvas();
    resetGame();

    //GAME LOOP
    var loop = function () {
        if (!Game.isPlaying) {
            return;
        }
        setTimeout(function () {
            Update();
            window.requestAnimationFrame(loop);
        }, Game.speed);

    };
    window.requestAnimationFrame(loop);
}

function createCanvas() {
    
    for(let i = 0; i<Canvas.size; i++){
        Canvas.array[i] = new Array(Canvas.size);
    }

    for (let j = 0; j < Canvas.size; j++) {
        var row = document.createElement("div");
        row.className = "row flex-nowrap";

        Canvas.DOM.appendChild(row);

        for (let i = 0; i < Canvas.size; i++) {
            let col = document.createElement("div");
            col.className = "p-0 col border-warning";
            
            Canvas.array[j][i] = document.createElement("div");
            Canvas.array[j][i].className = "square";
            Canvas.array[j][i].style.backgroundColor = Canvas.color;
            
            row.appendChild(col);
            col.appendChild(Canvas.array[j][i]);
        }
    }
    return;
}

function resetCanvas(){
    for(let i = 0; i<Canvas.size; i++){
        for(let j = 0; j<Canvas.size; j++){
            placeInCanvas(new Position(i,j), Canvas.color);
        }
    }
}

function placeInCanvas({X,Y}, color){
    Canvas.array[X][Y].style.backgroundColor = color;
    return;
}

function Update(){

    if(Fruit.position.X === Snake.posHistory[0].X 
        && Fruit.position.Y === Snake.posHistory[0].Y){
        console.log("fruit eaten");
        Snake.size = Snake.size + 1;
        Fruit.isPlaced = false;
        Fruit.position = new Position;
    }

    if(Fruit.isPlaced == false){
        createFruit();
    }

    placeFruit();
    clearSnakePath();
    drawSnakeBody();
    updatePosHistory();
    changeDirection();
    canvasLimitTreatment();
    //printPosHistory();

    function clearSnakePath() {
        if (Snake.posHistory[Snake.size] != undefined) {
            placeInCanvas(Snake.posHistory[Snake.size], Canvas.color);
        }
    }

    function drawSnakeBody() {
        for (let i = 0; i < Snake.posHistory.length - 1; i++) {
            placeInCanvas(Snake.posHistory[i], Snake.color);
        }
    }

    function updatePosHistory() {
        //move history back in the array
        for (let i = Snake.size; i >= 1; i--) {
            if (Snake.posHistory[i - 1] != undefined) {
                Snake.posHistory[i] = new Position(Snake.posHistory[i - 1].X, Snake.posHistory[i - 1].Y);
            }
        }
    }

    function changeDirection() {
        switch (Snake.direction) {
            case 0:
                Snake.posHistory[0].X--;
                break;
            case 1:
                Snake.posHistory[0].Y++;
                break;
            case 2:
                Snake.posHistory[0].X++;
                break;
            case 3:
                Snake.posHistory[0].Y--;
                break;
            default:
                break;
        }
    }

    function canvasLimitTreatment() {
        if (Snake.posHistory[0].X > Canvas.size - 1) {
            Snake.posHistory[0].X = 0;
        }
        if (Snake.posHistory[0].X < 0) {
            Snake.posHistory[0].X = Canvas.size - 1;
        }
        if (Snake.posHistory[0].Y > Canvas.size - 1) {
            Snake.posHistory[0].Y = 0;
        }
        if (Snake.posHistory[0].Y < 0) {
            Snake.posHistory[0].Y = Canvas.size - 1;
        }
    }

    function printPosHistory() {
        for (let i = 0; i < Snake.posHistory.length; i++) {
            console.log(`[${i}]: ` + Snake.posHistory[i].X);
        }
    }

    function createFruit(){
        let pos = new Position(Math.floor(Math.random()*Canvas.size),
        Math.floor(Math.random()*Canvas.size));

        if(isHittingSnakeBody(pos) === false){
            Fruit.position = pos;
        }
        else{
            createFruit();
        }
        return;
    }

    function placeFruit(){
        placeInCanvas(Fruit.position,Fruit.color);
        Fruit.isPlaced = true;
        console.log("placing fruit at "+Fruit.position.X+","+Fruit.position.Y);
    }

    function isHittingSnakeBody(objPos){
        let isHitting = false;
        
        if(Snake.posHistory[1] != undefined){
            for(let i = 1; i<Snake.size-1; i++){
                if(objPos.X == Snake.posHistory[i].X && objPos.Y == Snake.posHistory[i].Y){
                    isHitting = true;
                    console.log("SNAKE BODY HIT");
                }
            }
        }
        
        return isHitting;
    }
}

function resetGame(){
    resetCanvas();
    Fruit.position = new Position;
    Fruit.isPlaced = false;
    Snake.posHistory = [new Position( 
        Math.round(Canvas.size/2)-1,
        Math.round(Canvas.size/2)-1
    )]
    Snake.size = 3;
    Snake.direction = 2;
}

