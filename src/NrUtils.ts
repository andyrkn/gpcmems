class Complex {
    private re: number;
    private im: number;

    constructor(re: number = 0, im: number = 0) { this.re = re; this.im = im; }

    public static set(x: Complex): Complex {
        const res: Complex = new Complex(0, 0);
        res.re = x.re;
        res.im = x.im;
        return res;
    }

    public modul(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    public square(): Complex {
        return new Complex(this.re * this.re - this.im * this.im, 2 * this.re * this.im);
    }

    public sum(b: Complex): Complex {
        return new Complex(this.re + b.re, this.im + b.im);
    }

    public prod(b: Complex): Complex {
        return new Complex(this.re * b.re - this.im * b.im, this.re * b.im + this.im * b.re);
    }

    public complexEquals(b: Complex): boolean {
        if (this.re == b.re && this.im == b.im) {
            return true;
        }
        return false;
    }
}

class Square {
    public maxlevel: number;

    constructor(level: number) {
        this.maxlevel = level + 1;
    }

    public async draw(cx: number, cy: number, level: number, linelenght: number, callback: Function): Promise<void> {
        // top line left right
        await this.drawSlice(cx - linelenght / 2, cy + linelenght / 2, 0, linelenght, callback);
        // right line top down
        await this.drawSlice(cx + linelenght / 2, cy + linelenght / 2, -90 * Math.PI / 180, linelenght, callback);
        // bottom line
        await this.drawSlice(cx - linelenght / 2, cy - linelenght / 2, 0, linelenght, callback);
        // left line top down
        await this.drawSlice(cx - linelenght / 2, cy + linelenght / 2, 270 * Math.PI / 180, linelenght, callback);

        if (level < this.maxlevel) {
            let margin = linelenght;
            await this.draw(cx - margin, cy + margin, level + 1, margin / 3, callback);
            await this.draw(cx, cy + margin, level + 1, margin / 3, callback);
            await this.draw(cx + margin, cy + margin, level + 1, margin / 3, callback);
            await this.draw(cx + margin, cy, level + 1, margin / 3, callback);
            await this.draw(cx + margin, cy - margin, level + 1, margin / 3, callback);
            await this.draw(cx, cy - margin, level + 1, margin / 3, callback);
            await this.draw(cx - margin, cy - margin, level + 1, margin / 3, callback);
            await this.draw(cx - margin, cy, level + 1, margin / 3, callback);
        }
    }

    private async drawSlice(cx: number, cy: number, angle: number, linelenght: number, rawdraw: Function): Promise<void> {

        const x2 = cx + linelenght * Math.cos(angle);
        const y2 = cy + linelenght * Math.sin(angle);
        //console.table(cx, cy, x2, y2);
        rawdraw(new Float32Array([cx, cy, 0, x2, y2, 0]), new Float32Array([1, 0, 0, 1, 0, 0]));
    }
}

class Vector {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public normalise(): Vector {
        const d: number = Math.sqrt(this.x * this.x + this.y * this.y);
        if (d != 0.0) {
            return new Vector(this.x / d, this.y / d);
        }
        return new Vector(this.x, this.y);
    }

    public rotate(grade: number): Vector {
        const t: number = 2 * (4 * Math.atan(1) * grade / 360);
        return new Vector(this.x * Math.cos(t) - this.y * Math.sin(t), this.x * Math.sin(t) + this.y * Math.cos(t)).normalise();
    }
}

class FractalTree {
    public maxlevel: number;
    constructor(level: number) {
        this.maxlevel = level + 1;
    }

    public draw(cx: number, cy: number, level: number, linelenght: number, callback: Function, vec: Vector): void {
        if (level < this.maxlevel) {
            let margin = linelenght;

            //orange
            vec = vec.rotate(50);
            const b = this.drawSlice(cx, cy, margin, callback, [1, 0.5, 0], vec);

            //red
            vec = vec.rotate(-100);
            const a = this.drawSlice(cx, cy, margin, callback, [1, 0, 0], vec);
            this.draw(a[0], a[1], level + 1, margin / 2, callback, vec);

            //purple
            vec = vec.rotate(50);
            const d = this.drawSlice(b[0], b[1], margin, callback, [0.3, 0, 0.5], vec);

            //blue
            vec = vec.rotate(70);
            const c = this.drawSlice(b[0], b[1], margin, callback, [0.3, 0.5, 1], vec);
            this.draw(c[0], c[1], level + 1, margin / 2, callback, vec);

            //light blue
            vec = vec.rotate(-30);
            const e = this.drawSlice(d[0], d[1], margin / 2, callback, [0, 0.7, 1], vec);
            this.draw(e[0], e[1], level + 1, margin / 2, callback, vec);

            //cadet
            vec = vec.rotate(-130);
            const f = this.drawSlice(d[0], d[1], margin / 2, callback, [0.4, 0.6, 0.6], vec);
            this.draw(f[0], f[1], level + 1, margin / 2, callback, vec);
        }
    }

    private drawSlice(cx: number, cy: number, linelenght: number, rawdraw: Function, color: [number, number, number], vec: Vector): [number, number] {

        const x2 = vec.x * linelenght + cx;
        const y2 = vec.y * linelenght + cy;

        rawdraw(new Float32Array([cx, cy, 0, x2, y2, 0]), new Float32Array([color[0], color[1], color[2], color[0], color[1], color[2]]));
        return [x2, y2];
    }
}

class WeirdTriangle {
    public maxlevel: number;
    constructor(level: number) {
        this.maxlevel = level + 1;
    }

    public draw(cx: number, cy: number, level: number, linelenght: number, callback: Function, vec: Vector, sign: number): void {
        if (level < this.maxlevel) {
            vec = vec.rotate(60 * sign);
            this.draw(cx, cy, level + 1, linelenght, callback, vec, -sign);
            const a = this.drawSlice(cx, cy, linelenght, callback, [1, 0.5, 0], vec);

            vec = vec.rotate(60 * -sign);
            this.draw(a[0], a[1], level + 1, linelenght, callback, vec, sign);

            const b = this.drawSlice(a[0], a[1], linelenght, callback, [1, 0, 0], vec);
            this.draw(b[0], b[1], level + 1, linelenght, callback, vec, sign);

            vec = vec.rotate(-sign * 60);
            const c = this.drawSlice(b[0], b[1], linelenght, callback, [1, 0, 0], vec);
            this.draw(c[0], c[1], level + 1, linelenght, callback, vec, -sign);

            vec = vec.rotate(sign * 60);
        }
    }

    private drawSlice(cx: number, cy: number, linelenght: number, rawdraw: Function, color: [number, number, number], vec: Vector): [number, number] {

        const x2 = vec.x * linelenght + cx;
        const y2 = vec.y * linelenght + cy;

        rawdraw(new Float32Array([cx, cy, 0, x2, y2, 0]), new Float32Array([color[0], color[1], color[2], color[0], color[1], color[2]]));
        return [x2, y2];
    }
}