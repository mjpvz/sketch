// Everything is scaled to the width you want to present the sketch in. Aspectratios are maintained.
var sketch_width = 600;

// radius of the aperture
var radius = 50;


function preload() {
  image_sharp = loadImage('https://i.imgur.com/7xM2Mxo.jpg');

}

function setup() {
  noCursor();

  // set correct width, hight and create canvas
  aspact_ratio = image_sharp.height / image_sharp.width;
  sketch_height = sketch_width * aspact_ratio;
  canvas = createCanvas(sketch_width, sketch_height);
  canvas.parent('brownianDemo'); 

  console.log(canvas.size);
  // set the sharp image
  image_sharp.resize(sketch_width, sketch_height);

  // create the blurry image
  image_blur = image_sharp.get(); // no need to resize anymore, since image_sharp is at the desired size
  image_blur.filter(BLUR, 10);

  // create apeture to see through
  aperture = createImage(2 * radius, 2 * radius);

  // initialize data table
  data = new p5.Table();
  for (let i = 0; i < header.length; i++) {
    data.addColumn(header[i]);
  }

  // add event listener to our submit button
  document.getElementById('pre-submit-button').addEventListener('click', function() {console.log('clcicky')}
)
}

function JustBeforeSubmit() {
  console.log("submittttting")
}

function revealApature() {
  imageMode(CENTER); //  change default
  image(aperture, data.getNum(trial - 1, "x"), data.getNum(trial - 1, "y"));
  imageMode(CORNER); // return to default
}

function keyPressed() {
  if (keyCode === ENTER) {
    clicked = false;
    output_target = document.getElementById('output_target');
    output_target.value = table2csv();
  }
}



function showApatureBoundaries() {
  noFill();
  stroke(255, 0, 0);
  ellipse(mouseX, mouseY, 2 * radius, 2 * radius);
}

function draw() {
  image(image_blur, 0, 0);


  if (clicked) {
    revealApature()
  }

  showApatureBoundaries()

}


function table2csv() {
  // todo refactor
  let outstrheader = join(header, ',');

  let nrows = data.getRowCount();
  let ncols = header.length;

  let outstr = [];
  for (let j = 0; j < nrows; j++) {
    let tempArray = [];
    for (let i = 0; i < ncols; i++) {
      tempArray[i] = data.get(j, i);
    }
    outstr[j] = join(tempArray, ',');
  }
  return outstrheader + '\n' + join(outstr, '\n');
}
