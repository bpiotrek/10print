const probability = 0.5;
const initialSpacing = {x: 10, y: 20};
const spacing = {};
const pos = {x: 0, y: 0};

function setup() {
    //frameRate(30);
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    Reset();
}

function draw() {
    if (random(1) < probability) {
        line(pos.x, pos.y, pos.x + spacing.x, pos.y + spacing.y);
    } else {
        line(pos.x, pos.y + spacing.y, pos.x + spacing.x, pos.y);
    }

    pos.x = pos.x + spacing.x;

    if (pos.x >= width) {
        pos.x = 0;
        pos.y = pos.y + spacing.y;
    }

    if (pos.y >= height) {
        pos.y = 0;
        background(0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Reset();
}

function Reset() {
    spacing.x = initialSpacing.x + (width % initialSpacing.x) / floor(width / initialSpacing.x);
    spacing.y = initialSpacing.y + (height % initialSpacing.y) / floor(height / initialSpacing.y);
    background(0);

    let t = {};
    moveObject(pos, t);

    while (pos.y < t.y || pos.x < t.x) {
        draw();
    }

    moveObject(t, pos);
}

function moveObject(a, b) {
    for (let field in a) {
        b[field] = a[field];
        a[field] = 0;
    }
}
