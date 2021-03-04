import { Collideable } from "../app/colision";
import { WIDTH } from "../variables/sizes";

export class Obstacle implements Collideable {
  public x: number = WIDTH;
  public y: number = this.position;
  public obstaclespeed: number = Math.floor(Math.random() * (10 - 2)) + 2;

  constructor(
    public width: number,
    public height: number,
    public position: number,
    public image: string,
    public obstacleWidth: number,
    public obstacleHeight: number
  ) {}

  update() {
    this.x -= this.obstaclespeed;
  }

  newCoordinate() {
    this.x = WIDTH;
  }

  // OBSTACLE SPEED AFTER RENDERING
  newObstacleSpeed() {
    this.obstaclespeed = Math.floor(Math.random() * (20 - 2)) + 2;
  }

  render(ctx: CanvasRenderingContext2D) {
    const img = new Image();
    img.src = this.image;
    ctx.drawImage(img, this.x, this.y, this.obstacleWidth, this.obstacleHeight);
  }
}

export const rock = new Obstacle(80, 20, 480, "../../rock.png", 80, 80);
export const tree = new Obstacle(120, 120, 360, "../../tree.png", 100, 180);
export const bird = new Obstacle(120, 30, 300, "../../bird.png", 120, 80);
export const cloud = new Obstacle(20, 10, 0, "../../clouds.png", 100, 100);
