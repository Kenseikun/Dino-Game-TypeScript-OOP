import "./scss/app.scss";

// ALL SIZES
import {
  WIDTH,
  HEIGHT,
  DINOSAUR_WIDTH,
  DINOZAUR_HEIGHT,
  DINOZAUR_STEP_LENGTH,
} from "./variables/sizes";
// ALL SIZES | END

// LOCAL STORAGE GETTER
import { getScoreFromLocalScore } from "./utils/localStorageGetter";

// MAIN CANVAS CREATING
import { createCanvas } from "./app/createCanvas";
// SCORE COUNTER SECTION
import { createScore } from "./app/scoreCounter";
// GAME OVER SIGN AFTER TOUCHING AND OBSTACLE
import { createGameOver } from "./app/gameOverSign";

// DINOSAUR AND OBSTACLES OBJECTS
import { Dinosaur } from "./classes/dinosaur";
import { tree, bird, rock, cloud } from "./classes/obstacle";

// COLLISION ALGORITHM
import { collides } from "./app/colision";

const canvas = createCanvas(WIDTH, HEIGHT);
const scoreEl = createScore();
const ctx = canvas.getContext("2d");

// SOUNDS EFFECT

const smallJumpAudio = new Audio(require("./assets/music/jump.mp3"));
const loseGameAudio = new Audio(require("./assets/music/next-time.wav"));
const gettingPointsAudio = new Audio(require("./assets/music/points.wav"));

if (ctx) {
  // CREATING DINOSAUR OBJECT
  const dinosaur = new Dinosaur(DINOSAUR_WIDTH, DINOZAUR_HEIGHT);

  // // ACTION FOR HIHER JUMP BY LONG PRESSING BUTTON
  let jumpActionCheck = true;

  // // DINOSAUR MOVE KEYS
  document.addEventListener("keydown", (ev) => {
    if (jumpActionCheck === true) {
      jumpActionCheck = false;
      switch (ev.code) {
        // DINOSAUR JUMP HIGHT
        case "KeyW":
          dinosaur.superJump();
          break;

        // DINOSAUR TURN LEFT LENGTH
        case "KeyA":
          // BLOCKING LEFT GAME FIELD FOR DINOSAUR
          if (dinosaur.x > 200) {
            dinosaur.x -= DINOZAUR_STEP_LENGTH;
            dinosaur.turnLeft();
          }
          break;

        // DINOSAUR TURN RIGHT LENGTH
        case "KeyD":
          dinosaur.x += DINOZAUR_STEP_LENGTH;
          dinosaur.turnRight();

          break;
        // DINOSAUR FASTER LANDING
        case "KeyS":
          dinosaur.fastLanding();
          break;

        default:
          break;
      }
    }
  });

  document.addEventListener("keyup", (ev) => {
    jumpActionCheck = true;

    switch (ev.code) {
      // DINOSAUR JUMP HIGHT
      case "KeyW":
        dinosaur.jump();
        smallJumpAudio.play();

        break;
      default:
        break;
    }
  });

  // VARIABLES FOR SCORE COUTING AND BOLLEAN TO CHECK IF DINOSAUR TOUCHED OBSTACLE
  let score = 0;
  let isGameOver = false;

  // LOCAL STORAGE
  const saveToLocalStorage = () => {
    localStorage.setItem("score", JSON.stringify(score));
  };

  const render = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (rock.x <= 0) {
      // UPDATING COORDINATE OF OBSTACLE AFTER JUMP
      rock.newCoordinate();
      rock.newObstacleSpeed();
      // RENDERING SCORE AFTER JUMPING AN OBSTACLE
      gettingPointsAudio.play();
      score++;
    }

    if (tree.x <= 0) {
      tree.newCoordinate();
      tree.newObstacleSpeed();

      gettingPointsAudio.play();
      score++;
    }
    if (bird.x <= 0) {
      bird.newCoordinate();
      bird.newObstacleSpeed();

      gettingPointsAudio.play();
      score++;
    }

    // UPDATING AND RENDERING ALL OBJECTS
    rock.update();
    tree.update();

    rock.render(ctx);
    tree.render(ctx);

    if (score >= 5) {
      bird.update();
      bird.render(ctx);
    }

    cloud.update();
    cloud.render(ctx);

    dinosaur.update();
    dinosaur.render(ctx);

    // RENDERING AND UPDATING ALL OBJECTS | END

    // CHECKING IF DINOSAUR TOUCHED SOME OBSTACLE
    if (
      collides(dinosaur, rock) ||
      collides(dinosaur, tree) ||
      collides(dinosaur, bird)
    ) {
      isGameOver = true;

      loseGameAudio.play();
      createGameOver();
    }

    // RENDERING GAME AND COUNTING POINTS
    if (!isGameOver) {
      // DISPLAY SCORE ON THE SCREEN
      scoreEl.innerText = `Your score: ${score} ${
        score === 1 ? "point!" : "points!"
      }`;

      requestAnimationFrame(render);
    } else {
      if (score > JSON.parse(localStorage.getItem("score") || "0")) {
        saveToLocalStorage();
      }
    }
  };

  render();

  // GETTING BEST SCORE INFO FROM LOCAL STORAGE
  getScoreFromLocalScore();
}
