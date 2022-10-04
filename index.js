class SortShape {
  #width = 0;
  #shapeObj = {};
  #x = 0;
  #y = 0;
  constructor(value, width, velx, startingXPos, startingYPos, color) {
    this.value = value;
    this.#width = width;
    this.velx = velx;
    this.#x = startingXPos;
    this.#y = startingYPos;
    this.color = color;
    this.#shapeObj = {
      isShowStart: true,
      shape: "rect",
      radius: this.height / 2,
      radiusX: this.#width / 2,
      parent: "#squares",
      x: {},
      y: this.#y - this.height / 2,
      fill: color,
    };
    this.#shapeObj.x[startingXPos] = startingXPos + velx;
    this.shape = new mojs.Shape(this.#shapeObj);
  }
  get height() {
    return this.value * 10;
  }
  move() {
    this.shape.el.remove(); // remove from dom
    delete this.#shapeObj.x; // delete previous indication of x pos
    this.#shapeObj.x = {};
    this.#shapeObj.x[this.#x] = this.#x + this.velx;
    this.#x += this.velx;
    this.shape = new mojs.Shape(this.#shapeObj);
    this.shape.play();
  }
}
let i = 0;
function selectionSortShapes(inputArrayShapes) {
  // base case
  if (i >= inputArrayShapes.length) {
    i = 0;
    return;
  }
  let localMin = i;
  for (let j = i + 1; j < inputArrayShapes.length; j++) {
    if (inputArrayShapes[j].value < inputArrayShapes[localMin].value) {
      localMin = j;
    }
  }
  inputArrayShapes[i].velx = 40 * (localMin - i);
  inputArrayShapes[i].move();

  inputArrayShapes[localMin].velx = 40 * (i - localMin);
  inputArrayShapes[localMin].move();

  // swap
  let temp = inputArrayShapes[i];
  inputArrayShapes[i] = inputArrayShapes[localMin];
  inputArrayShapes[localMin] = temp;
  if (i < inputArrayShapes.length) {
    i++;
    setTimeout(() => {
      selectionSortShapes(inputArrayShapes);
    }, 200);
  } else {
    return inputArrayShapes;
  }
}
let sampleArray = [];
for (let i = 0; i < 10; i++) {
  sampleArray.push(Math.floor(Math.random() * 10 + 1));
}
document.getElementById("resetArray").addEventListener("click", () => {
  for (let i = 0; i < sampleArray.length; i++) {
    sampleArrayShapes[i].shape.el.remove();
  }
  sampleArray = [];
  for (let i = 0; i < 10; i++) {
    sampleArray.push(Math.floor(Math.random() * 10 + 1));
  }
  sampleArrayShapes = [];
  for (let i = 0; i < sampleArray.length; i++) {
    sampleArrayShapes.push(
      new SortShape(sampleArray[i], 30, 0, -200 + 40 * i, 0, "red")
    );
  }
});
let sampleArrayShapes = [];
for (let i = 0; i < sampleArray.length; i++) {
  sampleArrayShapes.push(
    new SortShape(sampleArray[i], 30, 0, -200 + 40 * i, 0, "red")
  );
}
document.getElementById("selectionSort").addEventListener("click", async () => {
  selectionSortShapes(sampleArrayShapes);
});
