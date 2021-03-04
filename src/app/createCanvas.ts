export const createCanvas = (
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas");

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  return canvas;
};
