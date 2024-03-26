// Symmetry corresponding to the number of reflections. Change the number for different number of reflections
const symmetry = 12;
const symmetryAngle = 360 / symmetry;

function setup() {
  createCanvas(1000, 1000);
  // console.log(windowWidth)
  // console.log(windowHeight)

  smallerDim = min(width, height)
  console.log(smallerDim)

  angleMode(DEGREES);
  clearScreen();
  draw();
  frameRate(1);
}

function draw() {
  // background(255);
  clearScreen();
  translate(width / 2, height / 2);
  stroke(190);
  noFill();

  push();
  stroke(genLineColor(0, 1));
  strokeWeight(5);
  circle(0, 0, 20)
  pop();

  let ringsCount = 8;

  let minRadius = 20;
  let radiusRange = 50;
  let radiusBuffer = 15;

  for (let c = 0; c < ringsCount; c += 1) {
    let minVal = minRadius
    let maxVal = minVal + radiusRange; // + (c * incrementalRadius);
    let detailCount = 10 //+ c * 5;
    let n = genIncRandomNums(detailCount, minVal, maxVal);
    let fullNums = genFullNumsList(n);

    push();
    colorMode(RGB)
    stroke(genLineColor(c, ringsCount - 1));
    strokeWeight(5 + 3 * c);
    drawPetalsFromAllNums(fullNums);
    pop();

    minRadius = maxVal + radiusBuffer; // set up next ring's smallest radius
    radiusBuffer += 2;
  }
  // noLoop();
}

// Clear Screen function
function clearScreen() {
  push();
  colorMode(RGB);
  background(color(87, 21, 61));
  pop();
}

function genLineColor(ringNum, maxNum) {
  let r = map(ringNum, 0, maxNum, 255, 161);
  let g = map(ringNum, 0, maxNum, 150, 40);
  let b = map(ringNum, 0, maxNum, 0, 63);
  return color(r, g, b);
}

function genFullNumsList(n) {
  let fullNums = [];
  for (let i = 0; i < symmetry; i += 1) {
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

function drawPetalsFromAllNums(allNums) {
  let incrementalAngle = 360 / allNums.length;
  beginShape();
  for (let i = 0; i < allNums.length; i += 1) {
    let r = allNums[i];
    let x = r * cos(i * incrementalAngle);
    let y = r * sin(i * incrementalAngle);
    vertex(x, y);
  }
  endShape(CLOSE);
}
