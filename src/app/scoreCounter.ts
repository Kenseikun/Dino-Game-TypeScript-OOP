export const createScore = () => {
  const scoreElement = document.createElement("div");
  scoreElement.classList.add("score");

  document.body.appendChild(scoreElement);

  return scoreElement;
};
