const gameBoard = document.getElementById('gameBoard');
const context= gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal')
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT= 25;
let foodX;
let foodY;
let xVel=25;
let yVel =0;
let score = 0;
let active = true;
let started = false;
let snake= [
    {x:UNIT*3, y:0},
    {x:UNIT*2, y:0},
    {x:UNIT, y:0},
    {x:0, y:0}
];

window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    context.fillStyle = '#212121';
    //fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    dispalyFood();
    drawSnake();
    nextTick();
    //moveSnake();
    //drawSnake();

}

function createFood(){
 foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
 foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
 console.log('createFood');

}

function dispalyFood(){
    context.fillStyle= "red";
    context.fillRect(foodX,foodY,UNIT,UNIT)
    console.log('dispalyfood')
}

function clearBoard(){
    context.fillStyle = '#212121';
    //fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    console.log("clearboard")
    
}
function drawSnake(){

    context.fillStyle = "aqua";
    context.strokeStyle= '#212121';
    snake.forEach((snakePart) =>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
        console.log('drawsnacks')
    })


}

function moveSnake(){ 

      const head = {x:snake[0].x+xVel,
                    y:snake[0].y+yVel}

      snake.unshift(head)
      if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent=score;
        createFood();
      }
      else
      snake.pop();
      console.log('movesnake')
      
}

function nextTick(){
    if(active){
    setTimeout(()=>{
       clearBoard();
       dispalyFood();
       moveSnake();
       drawSnake();
       checkGameOver(); 
       
       console.log('nexttick')
    }, 200);

}else{
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle= "white";
    context.textAlign = "center";
    context.fillText("GAME OVER!!!!",WIDTH/2,HEIGHT/2)


}

}


function keyPress(event){
    if(!started){
        started=true;
        nextTick();
    }
    const LEFT = 37
    const UP =38
    const RIGHT =39
    const DOWN =40

    switch(true){
        case(event.keyCode==LEFT && xVel !=UNIT):
        xVel=-UNIT;
        yVel=0;
        break;
        case(event.keyCode==RIGHT && xVel !=-UNIT):
        xVel=UNIT;
        yVel=0;
        break;
        case(event.keyCode==UP && yVel !=UNIT):
        xVel=0;
        yVel=-UNIT;
        break;
        case(event.keyCode==DOWN && yVel !=-UNIT):
        xVel=0;
        yVel=UNIT;
        break;
    }
    console.log(keyPress)
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active=false;
        break;

    }
    console.log('checkgameover')
}