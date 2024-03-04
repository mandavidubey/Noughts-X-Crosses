let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//Initialization
let turnO = true; //Player X, Player O
let count = 0; //Tracking Draw

//Logic for Winning
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Reset Game Logic
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {// Check if box is empty before allowing the move
    if (turnO) {
      //Player O
      box.innerText = "O";
      box.classList.add('o');
      box.classList.remove('x');// Remove X class if present
      turnO = false;
    } else {
      //Player X
      box.innerText = "X";
      box.classList.add('x');
      box.classList.remove('o');// Remove O class if present
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  }
});
});

//Game Draw Logic
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//Disabled Boxes (So that the game doesn't continue everytime)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//Display Winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner} !!!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//Check Function
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);