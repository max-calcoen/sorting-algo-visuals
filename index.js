function selectionSortClick() {
  if (!click) return;
  selectionSortShapes(arrayShapes);
  click = false;
}

function insertionSortClick() {
  if (!click) return;
  i = 1;
  insertionSortShapes(arrayShapes);
  click = false;
}

function resetArray() {
  if (!click) return;
  for (let i = 0; i < sampleArray.length; i++) arrayShapes[i].shape.el.remove();
  sampleArray = [];
  for (let i = 0; i < 10; i++)
    sampleArray.push(Math.floor(Math.random() * 10 + 1));
  arrayShapes = [];
  for (let i = 0; i < sampleArray.length; i++) {
    arrayShapes.push(
      new SortShape(sampleArray[i], 30, 0, -200 + 40 * i, 0, "red")
    );
  }
}

document.getElementById("resetArray").addEventListener("click", resetArray);
document
  .getElementById("selectionSort")
  .addEventListener("click", selectionSortClick);
document
  .getElementById("insertionSort")
  .addEventListener("click", insertionSortClick);

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
      duration: 500,
    };
    this.#shapeObj.x[startingXPos] = startingXPos + velx;
    this.shape = new mojs.Shape(this.#shapeObj);
  }
  get height() {
    return this.value * 10;
  }
  move(newColor) {
    if (newColor) this.#shapeObj.color = newColor;
    this.shape.el.remove(); // remove from dom
    delete this.#shapeObj.x; // delete previous indication of x pos
    this.#shapeObj.x = {};
    this.#shapeObj.x[this.#x] = this.#x + this.velx;
    this.#x += this.velx;
    this.shape = new mojs.Shape(this.#shapeObj);
    this.shape.play();
  }
}

// global iterator
let i = 0;
let click = true;
function selectionSortShapes(arrayShapes) {
  // base case
  if (i >= arrayShapes.length) {
    i = 0;
    click = true;
    return;
  }
  let localMin = i;
  for (let j = i + 1; j < arrayShapes.length; j++) {
    if (arrayShapes[j].value < arrayShapes[localMin].value) {
      localMin = j;
    }
  }
  arrayShapes[i].velx = 40 * (localMin - i);
  arrayShapes[i].move();

  arrayShapes[localMin].velx = 40 * (i - localMin);
  arrayShapes[localMin].move();

  // swap
  let temp = arrayShapes[i];
  arrayShapes[i] = arrayShapes[localMin];
  arrayShapes[localMin] = temp;
  i++;
  setTimeout(() => {
    selectionSortShapes(arrayShapes);
  }, 1000);
}

function insertionSortShapes(arrayOfShapes) {
  // base case
  if (i >= arrayOfShapes.length) {
    i = 0;
    click = true;
    return;
  }
  if (arrayOfShapes[i].value < arrayOfShapes[i - 1].value) {
    let insInd = 0;
    for (let j = 0; j < i; j++) {
      if (arrayOfShapes[j].value < arrayOfShapes[i].value) {
        insInd += 1;
      }
    }
    for (let j = insInd; j < i; j++) {
      // move right
      arrayOfShapes[j].velx = 40;
      arrayOfShapes[j].move();
    }
    arrayOfShapes[i].velx = -40 * (i - insInd);
    arrayOfShapes[i].move();
    // insert
    element = arrayOfShapes.splice(i, 1);
    arrayOfShapes.splice(insInd, 0, element[0]);
  }
  i++;

  setTimeout(() => {
    insertionSortShapes(arrayOfShapes);
  }, 1000);
}

let sampleArray = [];
for (let i = 0; i < 10; i++) {
  sampleArray.push(Math.floor(Math.random() * 10 + 1));
}

let arrayShapes = [];
for (let i = 0; i < sampleArray.length; i++) {
  arrayShapes.push(
    new SortShape(sampleArray[i], 30, 0, -200 + 40 * i, 0, "red")
  );
}
