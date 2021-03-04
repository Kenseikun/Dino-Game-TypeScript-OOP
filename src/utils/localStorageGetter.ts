export const getScoreFromLocalScore = () => {
  let localStorageScore: number = 0;

  if (localStorage.getItem("score")) {
    localStorageScore = JSON.parse(localStorage.getItem("score") || "0");
  } else {
    localStorageScore = 0;
  }

  //  SHOW BEST SCORE RATING
  const bestScore = document.createElement("div");
  bestScore.classList.add("best-score");

  bestScore.innerText = `Best score: ${localStorage.score.toString()}`;
  document.body.appendChild(bestScore);

  return localStorageScore;
};
