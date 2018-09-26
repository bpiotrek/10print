class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw(func) {
        func(this.x1, this.y1, this.x2, this.y2);
    }
}

class DrawingContext {
    constructor(spacingX, spacingY, boundary) {
        this.spacingX = spacingX;
        this.spacingY = spacingY;
        this.boundary = boundary;
    }

    getLine(pos, isRL) {
        if (isRL) {
            return new Line(pos.x, pos.y + this.spacingY, pos.x + this.spacingX, pos.y);
        } else {
            return new Line(pos.x, pos.y, pos.x + this.spacingX, pos.y + this.spacingY);
        }
    }

    advance(pos) {
        pos.x = pos.x + this.spacingX;

        if (pos.x >= this.boundary.x) {
            pos.x = 0;
            pos.y = pos.y + this.spacingY;

            if (pos.y >= this.boundary.y) {
                pos.y = 0;
                this.boundary.callback();
                return true;
            }
        }
        return false;
    }
}

class Drawing {
    constructor(ctx, fnc) {
        this.picture = [];
        this.context = ctx;
        this.drwfnc = fnc;
        this.pos = {x: 0, y: 0};
    }

    changeContext(ctx) {
        this.context = ctx;
    }

    reCreate() {
        for(let l of this.picture) {
            l.draw(this.drwfnc);
        }
    }

    create(isRL) {
        const ln = this.context.getLine(this.pos, isRL);
        this.picture.push(ln);
        ln.draw(this.drwfnc);
        if (this.context.advance(this.pos)) {
            this.clear();
        }
    }

    clear() {
        this.picture = [];
    }
}