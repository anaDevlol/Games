
let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const divAlert = document.querySelector('.alertdiv');
const okeyButton = document.querySelector('.okeybuttom');
const ChangeUser = document.querySelector(".nameChange");
const MsWelcome = document.querySelector('h2');
let guessCount = 1;
let resetButton; 
let giveupButton;


if(!localStorage.getItem("name")){
    setUserName();
}else{
    const storeName = localStorage.getItem("name");
    MsWelcome.textContent = `Welcome Again in My game, ${storeName}`;
}


function checkGuess(){           
const userGuess = Number(guessField.value);

if(guessField.value === ''){
        divAlert.style.display = "block";
      okeyButton.addEventListener("click", () =>{   
            divAlert.style.display = "none";  
        })
       
}else{
    if(guessCount === 1){
        guesses.textContent = "Previous guesses:";
    }
    guesses.textContent = `${guesses.textContent} ${userGuess}`;
    

    if (userGuess === randomNumber){
        lastResult.textContent = "Congratulationss! you got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
       giveupButton.parentNode.removeChild(giveupButton);
    }

    else if (guessCount === 10){
        lastResult.textContent = "!!!GAME OVER!!!";
        lowOrHi.textContent = "";
        setGameOver();
        
    }else if (guessCount === 5){
        giveUp();
    }

    else{
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";

        if (userGuess < randomNumber){
            lowOrHi.textContent = "Last guess was too low!";
        }else if(userGuess> randomNumber){
            lowOrHi.textContent = "Last guess was too high!";
        }
    }
}
    guessCount++;
    guessField.value = "";
    guessField.focus();
}
    guessSubmit.addEventListener("click", checkGuess);
    document.addEventListener("keydown",(event) =>{
    if(event.key === "Enter"){
       checkGuess();
}
})


function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    const continer = document.querySelector(".continer");
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    resetButton.style.fontSize = "0.8em";
    resetButton.style.width = "9em";
    resetButton.style.margin = "8px 0 0 0";
    resetButton.style.color = "rgb(2, 2, 69)";
    resetButton.style.position= "initial";
    resetButton.style.height= "1.8em";
    resetButton.style.background = "white";
    resetButton.style.border = "1px solid rgb(2, 2, 69)";
    resetButton.style.cursor = "pointer";
    continer.append(resetButton);
    resetButton.addEventListener("click", resetGame);
    
}


function resetGame(){
guessCount = 1;
const resetParas = document.querySelectorAll(".resultParas p");
for(const resetPara of resetParas){
    resetPara.textContent = "";
}

resetButton.parentNode.removeChild(resetButton);
giveupButton.parentNode.removeChild(giveupButton);
guessField.disabled =false;
guessSubmit.disabled =false;
guessField.value = "";
guessField.focus();

lastResult.style.backgroundColor = "white";
randomNumber = Math.floor(Math.random() * 100) + 1;
}

function giveUp(){
    const continer = document.querySelector(".continer");
    giveupButton = document.createElement("button");
    giveupButton.textContent = "I'm Give up";
    giveupButton.style.fontSize = "0.8em";
    giveupButton.style.width = "9em";
    giveupButton.style.margin = "8px 0 0 0";
    giveupButton.style.position= "initial";
    giveupButton.style.height= "1.8em";
    giveupButton.style.color = "rgb(2, 2, 69)";
    giveupButton.style.background = "white";
    giveupButton.style.border = "1px solid rgb(2, 2, 69)";
    giveupButton.style.cursor = "pointer";
    continer.append(giveupButton);

    
    giveupButton.addEventListener("click", () =>{ 
        guesses.textContent = "Guess is: ";
        guesses.textContent = `${guesses.textContent} ${randomNumber}`;
        lastResult.textContent = "You lose";
        lastResult.style.backgroundColor = "red";
        lowOrHi.textContent = "";
        
        giveupButton.disabled = true; 

        guessField.disabled = true; 
        guessSubmit.disabled = true;
        setGameOver();
    });
   
}

function setUserName(){
const myName = prompt('Please enter your name.');
localStorage.setItem("name", myName);
    
if(!myName){
    setUserName();
}else{
    MsWelcome.textContent = `Welcome to My game ${myName}`;
}
}

ChangeUser.onclick = () => {
setUserName();}
