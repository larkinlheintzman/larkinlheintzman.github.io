let slider;
function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent('sketch-holder');
  background(255);
  slider = createSlider(5, 50, 10, 0.1);
  slider.style('width', '50px');
  var canvasPosition = canvas.position();
  slider.position(canvasPosition.x + width - 50, canvasPosition.y);
}

// oh dont mind the sledgehammer
function mapX(val, wind) {
  return map(val, 0, width, -wind, wind);
}
function mapY(val, wind) {
  return map(val, 0, height, -wind, wind);
}

function draw() {
  if (mouseIsPressed) {
    var w = 1.25; // mandle window size
    var circleSize = slider.value();
    let cX = mapX(mouseX, w);
    let cY = mapY(mouseY, w);
    var mX = 0.0;
    var mY = 0.0;

    for (var i = 0; i < 20; i++) {
      mX = mX ** 2 - mY ** 2 + cX;
      mY = 2 * mY * mX + cY;
    }

    // write down how wibbly it was
    noStroke();
    if (sqrt(mX ** 2 + mY ** 2) < 4.0) {
      fill(3, 198, 252); // safe area
    } else {
      fill(181, 3, 252); // wack area
    }
    ellipse(mouseX, mouseY, circleSize, circleSize);

    fill(255);
    rect(20, 10, 65, 15);
    fill(0);
    text(str(round(cX, 2)) + ", " + str(round(cY, 2)), 20, 10, 65, 15);
  }
}
