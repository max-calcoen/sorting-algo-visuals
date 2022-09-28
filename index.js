let rectangleObj = {
  isShowStart: true,
  parent: "#rect",
  shape: "rect",
  width: 100,
  height: 100,
  x: { 0: 100 },
};

let rectx = 0;

let rectangle = new mojs.Shape({
  ...rectangleObj,
});

document.getElementById("moveRightButton").addEventListener("click", () => {
  rectangle.el.remove(); // remove from dom
  delete rectangleObj.x; // delete previous indication of x/y pos
  rectangleObj.x = {};
  rectangleObj.x[rectx] = rectx + 100;
  rectx += 100;
  rectangle = new mojs.Shape({
    ...rectangleObj,
  });
  rectangle.play();
});
