class ImplementedHomework extends Homework {
    constructor(renderer: WebGLRenderer) {
        super(renderer);
        this.addFunctions([this.f1]);
    }

    private f1(renderer: WebGLRenderer) {
        const display: CartezianDisplay = new CartezianDisplay(15);
        display.drawGrid((coord: Float32Array, color: Float32Array) => { renderer.clearAndRender(coord, color, "LINES") });

        const lo = new gLcoords(0, 15);
        const ln = new gLcoords(15, 10);
        display.drawLine(lo.x, lo.y, ln.x, ln.y, (coord: Float32Array, color: Float32Array) => { renderer.renderOver(coord, color, "TRIANGLE_FAN") });

        const l1 = display.toGlCoords(lo.x, lo.y);
        const l2 = display.toGlCoords(ln.x, ln.y);
        renderer.renderOver(new Float32Array([l1.x, l1.y, 0, l2.x, l2.y, 0]), new Float32Array([0, 0.5, 0, 0, 0.5, 0]), "LINES");
        
        const lo1 = new gLcoords(15, 8);
        const ln1 = new gLcoords(7, 3);
        display.drawLine(lo1.x, lo1.y, ln1.x, ln1.y, (coord: Float32Array, color: Float32Array) => { renderer.renderOver(coord, color, "TRIANGLE_FAN") });

        const l11 = display.toGlCoords(lo1.x, lo1.y);
        const l21 = display.toGlCoords(ln1.x, ln1.y);
        renderer.renderOver(new Float32Array([l11.x, l11.y, 0, l21.x, l21.y, 0]), new Float32Array([0, 0.5, 0, 0, 0.5, 0]), "LINES");
    }
}

class CartezianDisplay {
    public size: number;
    constructor(size: number) {
        this.size = size;
    }

    public toGlCoords(x: number, y: number): gLcoords {
        return new gLcoords(x / this.size * 2 - 1, y / this.size * 2 - 1);
    }

    public drawGrid(callback: Function): void {
        let colors = [];
        let coords = [];
        for (let i = 0; i <= this.size; i++) {
            const horiz = this.toGlCoords(-1, i);
            coords.push(-1, horiz.y, 0, 1, horiz.y, 0);
            colors.push(0, 0, 0, 0, 0, 0);

            const vertic = this.toGlCoords(i, 1);
            coords.push(vertic.x, 1, 0, vertic.x, -1, 0);
            colors.push(0, 0, 0, 0, 0, 0);
        }
        callback(new Float32Array(coords), new Float32Array(colors));
    }

    public drawLine(x0: number, y0: number, xn: number, yn: number, callback: Function): void {
        if (x0 <= xn && y0 <= yn) { this.drawNE(x0, y0, xn, yn, callback); }
        else if (x0 <= xn && y0 > yn) { this.drawSE(x0, y0, xn, yn, callback); }
        else if (x0 >= xn && y0 >= yn) { this.drawNE(xn, yn, x0, y0, callback); }
        else this.drawSE(xn, yn, x0, y0, callback);
    }

    private drawNE(x0: number, y0: number, xn: number, yn: number, callback: Function): void {
        this.markPoint(x0, y0, callback);
        const dx = xn - x0;
        const dy = yn - y0;
        let d, dE, dNE;

        if (dx < dy) {
            d = 2 * dx - dy;
            dE = 2 * dx;
            dNE = 2 * (dx - dy);

            while (y0 < yn) {
                if (d < 0) { d += dE; y0++; }
                else { d += dNE; x0++; y0++; }
                this.markPoint(x0, y0, callback);
            }
        } else {
            d = 2 * dy - dx;
            dE = 2 * dy;
            dNE = 2 * (dy - dx);

            while (x0 < xn) {
                if (d < 0) { d += dE; x0++; }
                else { d += dNE; x0++; y0++; }
                this.markPoint(x0, y0, callback);
            }
        }
    }

    private drawSE(x0: number, y0: number, xn: number, yn: number, callback: Function): void {
        this.markPoint(x0, y0, callback);
        const dx = xn - x0;
        const dy = Math.abs(yn - y0);
        let d, dE, dSE;

        if (dx < dy) {
            d = 2 * dx - dy;
            dE = 2 * dx;
            dSE = 2 * (dx - dy);

            while (y0 > yn) {
                if (d < 0) { d += dE; y0--; }
                else { d += dSE; x0++; y0--; }
                this.markPoint(x0, y0, callback);
            }
        } else {
            d = 2 * dy - dx;
            dE = 2 * dy;
            dSE = 2 * (dy - dx);

            while (x0 < xn) {
                if (d < 0) { d += dE; x0++; }
                else { d += dSE; x0++; y0--; }
                this.markPoint(x0, y0, callback);
            }
        }
    }

    private markPoint(x: number, y: number, callback: Function): void {
        let coords = [];
        let colors = [];
        let step = 0.1;
        let radius = 0.012;
        const point = this.toGlCoords(x, y);
        for (let d = 0; d <= 2 * Math.PI - step; d = d + step) {
            coords.push(Math.sin(d) * radius + point.x, Math.cos(d) * radius + point.y, 0);
            colors.push(1, 0, 0);
        }
        callback(new Float32Array(coords), new Float32Array(colors));
    }

}

class gLcoords {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}