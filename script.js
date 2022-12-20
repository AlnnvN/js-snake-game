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
    deathColor: "#0b783a",
    direction: 2,
    size: 3,
    posHistory: [new Position( 
    Math.round(Canvas.size/2)-1,
    Math.round(Canvas.size/2)-1
    )]
}

var Game = {
    speed: 90,
    isPlaying: true,
    isDirChanging: false
}

//keyboard input
document.addEventListener("keydown",(event)=>{
    

    if(Game.isDirChanging === false){
        if(event.code == "ArrowUp" && Snake.direction != 2){
            Snake.direction = 0;
            Game.isDirChanging = true;
        }
        else if(event.code == "ArrowRight"  && Snake.direction != 3){
            Snake.direction = 1;
            Game.isDirChanging = true;
        }
        else if(event.code == "ArrowDown"  && Snake.direction != 0){
            Snake.direction = 2;
            Game.isDirChanging = true;
        }
        else if(event.code == "ArrowLeft"  && Snake.direction != 1){
            Snake.direction = 3;
            Game.isDirChanging = true;
        }
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

    //touch event listener
    for(let i = 0; i<Canvas.size; i++){
        for(let j = 0; j<Canvas.size; j++){
            if(i!=j && i+j<Canvas.size-1){
                if(i<j){ //top triangle
                    Canvas.array[i][j].addEventListener('click',()=>{
                        if(Game.isDirChanging === false && Snake.direction != 2){
                            Snake.direction = 0;
                            Game.isDirChanging = true;
                        }
                    });
                }
                if(i>j){ //left triangle
                    Canvas.array[i][j].addEventListener('click',()=>{
                        if(Game.isDirChanging === false && Snake.direction != 1){
                            Snake.direction = 3;
                            Game.isDirChanging = true;
                        }
                    });
                }
            }

            if(i!=j && i+j>Canvas.size-1){
                if(i<j){ //right rectangle
                    Canvas.array[i][j].addEventListener('click',()=>{
                        if(Game.isDirChanging === false && Snake.direction != 3){
                            Snake.direction = 1;
                            Game.isDirChanging = true;
                        }
                    });
                }
                if(i>j){ //bottom rectangle
                    Canvas.array[i][j].addEventListener('click',()=>{
                        if(Game.isDirChanging === false && Snake.direction != 0){
                            Snake.direction = 2;
                            Game.isDirChanging = true;
                        }
                    });
                }
            }
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

    
    hasEatFruit();

    if(Fruit.isPlaced == false){
        createFruit();
    }

    placeFruit();
    clearSnakePath();
    drawSnakeBody();
    updatePosHistory();
    changeDirection();
    canvasLimitTreatment();
    hasHitBody();

    function hasHitBody(){
        if(isHittingSnakeBody(Snake.posHistory[0])){
            endGame();
            return;
        }
    }

    function hasEatFruit() {
        if (Fruit.position.X === Snake.posHistory[0].X
            && Fruit.position.Y === Snake.posHistory[0].Y){
            
            Snake.size = Snake.size + 1;
            if(Game.speed>40){
                Game.speed--;
            }
            
            Fruit.isPlaced = false;
            Fruit.position = new Position;
        }
    }

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
                Game.isDirChanging = false;
                break;
            case 1:
                Snake.posHistory[0].Y++;
                Game.isDirChanging = false;
                break;
            case 2:
                Snake.posHistory[0].X++;
                Game.isDirChanging = false;
                break;
            case 3:
                Snake.posHistory[0].Y--;
                Game.isDirChanging = false;
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

        if(isHittingSnakeBody(pos) === false || (
            Snake.posHistory[0].X === pos.X && Snake.posHistory[0].Y === pos.Y
        )){
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

    function endGame(){
        for (let i = 1; i < Snake.posHistory.length; i++) {
            setTimeout(function(){
                placeInCanvas(Snake.posHistory[i], Snake.deathColor);
            },90*i)
        }
        Game.isPlaying = false;
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
