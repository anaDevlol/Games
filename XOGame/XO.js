
let cols = document.querySelectorAll('.col');
cols = Array.from(cols);

let currentPlayer = "X";
let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]  
]
function checkForWinner(){
 winningCombinations.forEach(function(combination){
       let check = combination.every(idx => cols[idx].innerText.trim() == currentPlayer)
       if(check){
           highGreencol(combination);
       }
      
   })
}
function highGreencol(combination){
 combination.forEach(function(idx){
     cols[idx].classList.add("highGreen")
 })
}

cols.forEach(function(col){
col.addEventListener("click", function(){
   if(col.innerText.trim() != "")return
   col.innerText = currentPlayer ;
   checkForWinner()
   currentPlayer = currentPlayer == "X" ? "O" : "X"
  
})
})

function resetboard(){
     cols.forEach(col => {
         col.innerText = '';
         col.classList.remove(currentPlayer, "highGreen");
     })
 }






