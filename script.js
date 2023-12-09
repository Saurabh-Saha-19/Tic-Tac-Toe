let turn = Math.floor(Math.random() * 2);
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxEle = document.querySelectorAll(".box");

function startGame() {
  boxEle.forEach((box) => {
    box.addEventListener("click", () => {
      if (turn == 0) {
        box.textContent = "O";
        turn = 1;
      } else {
        box.textContent = "X";
        turn = 0;
      }
      box.disabled = true;
      checkWinner();
    });
  });
}

function checkWinner() {
  winningPatterns.forEach((pattern) => {
    let pos1Value = boxEle[pattern[0]].innerHTML;
    let pos2Value = boxEle[pattern[1]].innerHTML;
    let pos3Value = boxEle[pattern[2]].innerHTML;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        console.log(`Winner is Player ${pos1Value}`);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});
