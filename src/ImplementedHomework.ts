class ImplementedHomework extends Homework {

    public static nivel: number;

    constructor(renderer: WebGLRenderer) {
        super(renderer);
        ImplementedHomework.nivel = 0;
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                ImplementedHomework.nivel++;
                this.start();
            }
            if (e.key == "ArrowDown") {
                ImplementedHomework.nivel > 0 ? ImplementedHomework.nivel-- : ImplementedHomework.nivel = 0;
                this.start();
            }

        })
        this.addFunctions([this.img1, this.img2, this.MandelBrot, this.img3]);
        //this.addFunctions([this.img1, this.MandelBrot, this.JuliaFatou]);
    }

    private static juliaConverge(x: Complex, c: Complex): number {

        let z1: Complex = Complex.set(x);
        let z2: Complex = new Complex(0, 0);

        for (let i = 0; i < 29; i++) {
            z2 = z1.square().sum(c);

            if (z2.complexEquals(z1)) return 0;
            if (z2.modul() > 10000) return 1;
            z1 = z2;
        }
        return 2;
    }

    private static mandelbrotConverge(x: Complex): number {

        let z1: Complex = new Complex(0, 0);
        let z2: Complex = new Complex(0, 0);

        for (let i = 0; i < 1000; i++) {
            z2 = z1.square().sum(x);

            if (z2.modul() > 2) {
                return i;
            }
            z1 = z2;
        }
        return -1;
    }

    private JuliaFatou(renderer: WebGLRenderer): void {
        let coordinates = [];
        let colors = [];

        const ratio = 0.001;
        const limits = [-1, 1, -1, 1];
        const conq: Complex = new Complex(-0.012, 0.74);

        for (let x = limits[0]; x < limits[1]; x = x + ratio) {
            for (let y = limits[2]; y < limits[3]; y = y + ratio) {
                const c: Complex = new Complex(x, y);
                let conv: number = ImplementedHomework.juliaConverge(c, conq);

                if (conv == 2) {
                    coordinates.push(x, y, 0);
                    colors.push(1, 0.5, 0);
                }
                else if (conv == 1) {
                    coordinates.push(x, y, 0);
                    colors.push(0.0, 0, 0.0);
                } else {
                    coordinates.push(x, y, 0);
                    colors.push(1, 1, 1);
                }
            }
        }
        renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "POINTS");
    }

    private MandelBrot(renderer: WebGLRenderer): void {
        let coordinates = [];
        let colors = [];

        const ratio = 0.005;
        const limits = [-2.0, 2.0, -2.0, 2.0];

        for (let x = limits[0]; x < limits[1]; x = x + ratio) {
            for (let y = limits[2]; y < limits[3]; y = y + ratio) {
                const c: Complex = new Complex(x, y);
                const conv: number = ImplementedHomework.mandelbrotConverge(c);

                if (conv == -1) {
                    coordinates.push(x / 2, y / 2, 0);
                    colors.push(1, 0.5, 0);
                }
                else {
                    coordinates.push(x / 2, y / 2, 0);
                    colors.push(0.5, conv / 1000, 1);
                }
            }
        }
        renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "POINTS");
    }

    private img1(renderer: WebGLRenderer): void {
        renderer.clearAndRender(new Float32Array([]), new Float32Array([]), "POINTS");
        const square = new Square(ImplementedHomework.nivel);
        square.draw(0, 0, 1, 0.5, (coord: Float32Array, cl: Float32Array) => { renderer.renderOver(coord, cl, "LINES"); });
    }

    private img2(renderer: WebGLRenderer): void {
        const ftree = new FractalTree(ImplementedHomework.nivel);
        renderer.clearAndRender(new Float32Array([-0.3, 1, 0, -0.3, 0.8, 0]), new Float32Array([1, 0, 0, 1, 0, 0]), "LINES");
        ftree.draw(-0.3, 0.8, 1, 0.3, (coord: Float32Array, cl: Float32Array) => { renderer.renderOver(coord, cl, "LINES"); }, new Vector(0, -1));
    }

    private img3(renderer: WebGLRenderer): void {
        renderer.clearAndRender(new Float32Array([]), new Float32Array([]), "POINTS");
        const trengle = new WeirdTriangle(ImplementedHomework.nivel);
        trengle.draw(0, 0, 1, 0.1, (coord: Float32Array, cl: Float32Array) => { renderer.renderOver(coord, cl, "LINES"); }, new Vector(0, 1), 1);
    }
}