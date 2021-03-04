import "./scss/app.scss";
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DINOSAUR_SIZE = 50;
const createCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};
createCanvas(WIDTH, HEIGHT);
//# sourceMappingURL=index.js.map