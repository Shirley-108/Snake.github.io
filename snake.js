/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/EAT2.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    //貪食蛇起始位置，數字改變位置也會改變
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 100;

//control the snake
//作業:1.改成wasd 2.改食物圖 3.分數起始100、每吃一個-5 4.蛇斜角移動 5.控制食物位置，蛇自動移動
let j;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 65 && j != "RIGHT"){
        left.play();
        j = "LEFT";
    }else if(key == 87 && j != "DOWN"){
        j = "UP";
        up.play();
    }else if(key == 68 && j != "LEFT"){
        j = "RIGHT";
        right.play();
    }else if(key == 83 && j != "UP"){
        j = "DOWN";
        down.play();
    }
    else if (key==81  && j!== "DR") j = "UL";
    else if (key==69  && j!== "DL") j = "UR";
    else if (key==90  && j!== "UR") j = "DL";
    else if (key==67  && j!== "UL") j = "DR";
}

/* 控制食物
    let d = "UP"
    let key = event.keyCode;
    if( key == 65 && j != "RIGHT"){
        left.play();
        j = "LEFT";
    }else if(key == 87 && j != "DOWN"){
        j = "UP";
        up.play();
    }else if(key == 68 && j != "LEFT"){
        j = "RIGHT";
        right.play();
    }else if(key == 83 && j != "UP"){
        j = "DOWN";
        down.play();
    }
*/

// cheack 碰撞 function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);//畫出食物
    
    let food2X = food2[0].x;
    let food2Y = food2[0].y;

    // old head position
    let snakeX = snake[0].x;//蛇頭x座標
    let snakeY = snake[0].y;//蛇頭y座標
    
    // which direction
    /*if( j == "LEFT") snakeX -= box;
    if( j == "UP") snakeY -= box;
    if( j == "RIGHT") snakeX += box;
    if( j == "DOWN") snakeY += box;*/

    if( j == "LEFT") food2X -= box;
    if( j == "UP") food2Y -= box;
    if( j == "RIGHT") food2X += box;
    if( j == "DOWN") food2Y += box;

   /*if(j=="UL"){
        snakeX-=box;
        snakeY-=box;
    }
    if(j=="UR"){
        snakeX-=box;
        snakeY-=box;
    }
    if(j=="DL"){
        snakeX-=box;
        snakeY-=box;
    }
    if(j=="DR"){
        snakeX-=box;
        snakeY-=box;
    }*/
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){//如果蛇和食物座標相同
        score = score - 5;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    else if(score == 0){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,300);


















