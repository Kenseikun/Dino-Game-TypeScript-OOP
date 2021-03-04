import { Collideable } from "../app/colision";
import { ELEMENT_VERTICAL_POSITION, GRAVITY } from "../variables/sizes";

export class Dinosaur implements Collideable {
  // STARTING HORIZONTAL LEVEL
  public x: number = 300;
  // STARTING HORIZONTAL LEVEL
  public y: number = ELEMENT_VERTICAL_POSITION;

  protected targetY: number = 0;
  // protected speed: number = 10;
  protected isAirbone: boolean = false;

  protected acceleration: number = 0;

  protected run: number = 0;

  constructor(public width: number, public height: number) {
    this.targetY = this.y;
  }

  jump() {
    if (this.isAirbone) return;

    this.acceleration = -20;

    this.isAirbone = true;
  }

  superJump() {
    if (this.isAirbone) return;
    this.acceleration = -40;
  }

  fastLanding() {
    this.acceleration = 50;
  }

  turnLeft() {
    this.acceleration = -6;
  }

  turnRight() {
    this.acceleration = -6;
  }

  update() {
    this.y += this.acceleration;
    // MAIN OBJECT DESCENT SPEED
    if (this.y < ELEMENT_VERTICAL_POSITION) {
      this.acceleration += GRAVITY;
    } else {
      this.acceleration = 0;
      this.isAirbone = false;
    }
    if (this.y > ELEMENT_VERTICAL_POSITION) {
      this.y = ELEMENT_VERTICAL_POSITION;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const img = new Image();
    img.src = "../../dino.png";
    ctx.drawImage(img, this.x, this.y, 80, 100);
  }
}
