export const collides = (
  firstColider: Collideable,
  secondColider: Collideable
): boolean => {
  if (
    firstColider.x <= secondColider.x + secondColider.width &&
    firstColider.x + firstColider.width >= secondColider.x &&
    firstColider.y <= secondColider.y + secondColider.height &&
    firstColider.y + firstColider.height >= secondColider.y
  ) {
    return true;
  }
  return false;
};

export interface Collideable {
  /*ELEMENT VERTICAL VALUE*/
  x: number;

  /*ELEMENT HORIZONTAL VALUE*/
  y: number;

  /*ELEMENT WIDTH*/
  width: number;

  /*ELEMENT HEIGHT*/
  height: number;
}
