//Game constants and variables

let  snakeSpeed = {x:0, y:0};          //we can add audio for better interaction by making new variable using new audio method
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {
    x: 6, y: 14
};
let Score = 0;

//functions
let main = (ctime) => {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
   lastPaintTime = ctime;
   gameEngine();
} 

let collide = (snake) =>{
    //if bump into yourself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y){
            return true;

        }
    }
    //if collision take place with the wall
    if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
        return true;
    }


}

let gameEngine = () => {
    //part1: updating the snake array and food
    if(collide(snakeArr)){
        snakeSpeed = {x:0, y:0}
        alert("Gam Over.... Press any key to play again");
        snakeArr = [{x: 13, y: 15}];
        Score = 0;
     }

     //if you have eaten the food increment score and regenerate the food
     if(snakeArr[0].y === food.y&&snakeArr[0].x ===food.x){
         Score+=1;
         scoreBox.innerHTML="Score:"+Score;
        snakeArr.unshift({x: snakeArr[0].x + snakeSpeed.x, y: snakeArr[0].y + snakeSpeed.y
        })
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
     }
     
     //Moving the snake
     for(let i=snakeArr.length -2; i>=0; i-- ){
         snakeArr[i+1] = {...snakeArr[i]};
     }
     snakeArr[0].x += snakeSpeed.x;
     snakeArr[0].y += snakeSpeed.y;  


    //part2: Display the snake and food 
    //Display the snake 
    Board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       if(index===0){
        snakeElement.classList.add('head')
       }
       else{
        snakeElement.classList.add('tail')

       }

        Board.appendChild(snakeElement);
    })
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    Board.appendChild(foodElement);


    }

//Main Logic of Game







window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    snakeSpeed= {x:0, y:1 } //Begining of game
    switch(e.key){
        case "ArrowUp":
        console.log("ArrowUp")
        snakeSpeed.x = 0;
        snakeSpeed.y = -1;
        break;

        case "ArrowDown":
        console.log("ArrowDown")
        snakeSpeed.x = 0;
        snakeSpeed.y = 1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft")
        snakeSpeed.x = -1;
        snakeSpeed.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight")
        snakeSpeed.x = 1;
        snakeSpeed.y = 0;
        break;

        default:
            break;

    }
})

