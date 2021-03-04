export const createGameOver = () => {
  const gameOverContainer = document.createElement("div");
  gameOverContainer.classList.add("game--over__container");

  const gameOverText = document.createElement("p");
  gameOverText.classList.add("game--over__text");
  gameOverText.innerText = "Game Over!";

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("game--over__restart--btn");
  restartBtn.innerText = "Try Again";

  gameOverContainer.appendChild(gameOverText);
  gameOverContainer.appendChild(restartBtn);

  document.body.appendChild(gameOverContainer);

  restartBtn.addEventListener("click", function () {
    gameOverContainer.remove();
    window.location.reload();
  });
};
