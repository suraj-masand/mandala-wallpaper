// Symmetry corresponding to the number of reflections. Change the number for different number of reflections
const symmetry = 8;
const symmetryAngle = 360 / symmetry;
const fps = 30;
const animationTimeS = 4;
const oneCycle = fps * animationTimeS;

let ringsCount = 7;
let minRadius, radiusRange, radiusBuffer;
let flowers;
let completedFlowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(fps);
  resetRingParams();
  flowers = genAllFlowers();
}

function draw() {
  clearScreen();
  translate(width / 2, height / 2);
  stroke(190);
  noFill();

  push();
  colorMode(RGB)
  stroke(genLineColor(0, 1));
  strokeWeight(5);
  circle(0, 0, 20)
  pop();

  // persist the completed rings by redrawing then without animation
  for (const f of completedFlowers.values()) {
    f.drawFlower();
  }
  
  if (flowers.length > 0) {
    flowers[0].animateFlower(oneCycle);
  }

  if (frameCount > 0 && frameCount % oneCycle === 0) {
    // one ring has been successfully drawn, move to next
    completedFlowers.push(flowers.shift());
  }

  if (flowers.length === 0) {
    flowers = genAllFlowers();
    animS.reset();
  }
}

// Clear Screen function
function clearScreen() {
  push();
  colorMode(RGB);
  background(color(87, 21, 61));
  pop();
}

function resetRingParams() {
  minRadius = 20;
  radiusRange = 50;
  radiusBuffer = 15;
  c = 0;
  completedFlowers = [];
}

function genLineColor(ringNum, maxNum) {
  let r = map(ringNum, 0, maxNum, 255, 161);
  let g = map(ringNum, 0, maxNum, 150, 40);
  let b = map(ringNum, 0, maxNum, 0, 63);
  return color(r, g, b);
}

function genFullNumsList(n) {
  let fullNums = [];
  for (let s = 0; s < symmetry; s += 1) {
    fullNums = fullNums.concat(n);
    fullNums = fullNums.concat(n.toReversed());
  }
  return fullNums;
}

function genIncRandomNums(count, minVal, maxVal) {
  let nums = [];
  for (let i = 0; i < count; i += 1) {
    nums.push(random());
  }
  nums.sort();
  for (let n = 0; n < nums.length; n += 1) {
    nums[n] = map(nums[n], 0, 1, minVal, maxVal);
  }
  return nums;
}

function genAllFlowers() {
  resetRingParams();

  let flowerList = [];
  for (let i = 0; i < ringsCount; i += 1) {
    let minVal = minRadius
    let maxVal = minVal + radiusRange + (i * 2);
    let detailCount = 10 + i * 5;
    let n = genIncRandomNums(detailCount, minVal, maxVal);
    let fullNums = genFullNumsList(n);

    let lineColor = genLineColor(i, ringsCount - 1);
    let thickness = 5 + (3 * i);

    let flower = new Flower(i, fullNums, lineColor, thickness);
    flowerList.push(flower);

    minRadius = maxVal + radiusBuffer; // set up next ring's smallest radius
    radiusBuffer += 2;
  }
  return flowerList;
}
