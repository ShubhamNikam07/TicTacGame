let boxes=document.querySelectorAll(".box");
let gameInfo=document.querySelector(".game-info");
let newBtn=document.querySelector(".btn");
let currPlayer;
let gameGrid;
let mpl;
console.log(boxes.length);
console.log(gameInfo);
console.log(newBtn);
let winningPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame(){
    currPlayer="X";
    gameGrid = ["","","","","","","","",""];
    newBtn.classList.remove("active");
    gameInfo.innerHTML=`current Player - ${currPlayer}`;
    boxes.forEach((box)=>{
        box.classList.remove("win");
    });
    }
initGame();

newBtn.addEventListener("click",()=>{
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style="cursor:pointer";
        clearInterval(mpl);
        box.classList.remove("red");
    })
    initGame();
});

function checkGameOver(){
    let answer="";
    winningPos.forEach((position)=>{
        console.log(position);
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" ||gameGrid[position[2]] !=="" )
        && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]){
            if(gameGrid[position[0]] == "X"){
                answer="X";
            }
            else{
                answer="O";
            }
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }
    })
    if(answer!=""){
        gameInfo.innerText=`the wiiner is player ${answer}`;
        boxes.forEach((box)=>{

        box.style.pointerEvents="none";
        return;
    })
}
    let fillCount=0;
    
    gameGrid.forEach((box)=>{
        console.log(fillCount,"value is filcount is");
        if(box !== "")
            fillCount++;
    })
    if(answer=="" && fillCount==9)
    {

        gameInfo.innerText="The match is Tied";
        mpl = setInterval(light,600);
       
    }
}

function swapTurn(){
    currPlayer= currPlayer === "X"?"O":"X";
    gameInfo.innerHTML=`current Player - ${currPlayer}`;
}

function handleClick(index){

   if(gameGrid[index] == ""){
    boxes[index].innerText = currPlayer;
    gameGrid[index] = currPlayer;
    swapTurn();
    boxes[index].style="cursor:default";
    checkGameOver();

   }
}

boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});


function light(){boxes.forEach((box)=>{
    box.classList.toggle("red");
}
);}