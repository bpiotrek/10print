const probability = 0.5;
const initialSpacing = { x: 10, y: 20 };
const pos = { x: 0, y: 0 };
const borderCallback = function() { background(0); };
let drawing = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    Reset();
}

function draw() {
    drawing.create(
        random(1) < probability
    );
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Reset();
}

function Reset() {
    background(0);

    const ctx = new DrawingContext(
        initialSpacing.x + (width % initialSpacing.x) / floor(width / initialSpacing.x),
        initialSpacing.y + (height % initialSpacing.y) / floor(height / initialSpacing.y),
        { x: width, y: height, callback: borderCallback }
    );

    if (drawing) {
        drawing.reCreate();
        drawing.changeContext(ctx);
    } else {
        drawing = new Drawing(ctx, line);
    }
}
