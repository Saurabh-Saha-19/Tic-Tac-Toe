let turn = Math.floor(Math.random() * 2);
let boxClickCount = 0;
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
const gameEle = document.querySelector("#game");
const winnerEle = document.querySelector("#winner-box");
const resetButtonEle = document.querySelector("#reset-button");

function startGame() {
  boxEle.forEach((box) => {
    box.addEventListener("click", () => {
      boxClickCount++;
      if (turn == 0) {
        box.textContent = "O";
        turn = 1;
      } else {
        box.textContent = "X";
        turn = 0;
      }
      box.disabled = true;
      let isWinner = checkWinner();
      if (boxClickCount === 9 && !isWinner) {
        setTimeout(() => {
          gameEle.style.display = "none";
          gameDraw();
        }, 1000);
      }
    });
  });
}

function disableBoxes() {
  boxEle.forEach((box) => {
    box.disabled = true;
  });
}

function showWinner(winner) {
  winnerEle.innerHTML = `The Winner is Player ${winner}`;
  winnerEle.classList.remove("hide");
  resetButtonEle.innerHTML = "New Game";
}

function gameDraw() {
  winnerEle.innerHTML = `The Game is drawn!`;
  winnerEle.classList.remove("hide");
  resetButtonEle.innerHTML = "New Game";
}

function checkWinner() {
  winningPatterns.forEach((pattern) => {
    let pos1Value = boxEle[pattern[0]].innerHTML;
    let pos2Value = boxEle[pattern[1]].innerHTML;
    let pos3Value = boxEle[pattern[2]].innerHTML;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        //console.log(`Winner is Player ${pos1Value}`);
        disableBoxes();
        boxEle[pattern[0]].classList.add("match-pattern");
        boxEle[pattern[1]].classList.add("match-pattern");
        boxEle[pattern[2]].classList.add("match-pattern");

        setTimeout(() => {
          gameEle.style.display = "none";
          boxEle[pattern[0]].classList.remove("match-pattern");
          boxEle[pattern[1]].classList.remove("match-pattern");
          boxEle[pattern[2]].classList.remove("match-pattern");
          showWinner(pos1Value);
        }, 1500);
        return true;
      }
    }
  });
}

resetButtonEle.addEventListener("click", () => {
  boxEle.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  boxClickCount = 0;

  winnerEle.classList.add("hide");
  gameEle.style.display = "flex";

  resetButtonEle.innerHTML = "Reset Game";
});

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});
