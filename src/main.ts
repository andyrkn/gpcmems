function start(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    const renderer: WebGLRenderer = new WebGLRenderer(canvas.getContext("webgl"));

    let counter = 0;
    const functions: Function[] = [f1, f2, f3, f4, f5, f6, f7, f8];

    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowRight") {
            if (counter == functions.length - 1) counter = 0;
            else counter++;
        } else if (e.key == "ArrowLeft") {
            if (counter == 0) counter = functions.length - 1;
            else counter--;
        }
        functions[counter](renderer);
    });
}
start();

function f1(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];

    for (let x = 0; x < 100; x = x + 0.1) {
        coordinates.push((x / 100));
        if (x != 0)
            coordinates.push((Math.abs(Math.round(x) - x) / x));
        else coordinates.push(1);

        coordinates.push(0);

        colors.push(1, 0, 0);
    }

    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}

function f2(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.3;
    const b = 0.2;


    for (let t = -Math.PI; t <= Math.PI; t = t + 0.05) {
        const x = 2 * (a * Math.cos(t) + b) * Math.cos(t) / 1.2;
        const y = 2 * (a * Math.cos(t) + b) * Math.sin(t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }

    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_LOOP");
}

function f3(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.2;

    coordinates.push(-1, 1, 0);
    colors.push(1, 0, 0);
    for (let t = -Math.PI / 2; t <= Math.PI / 2; t = t + 0.05) {

        if (Math.abs(t) != Math.PI / 6) {
            const x = a / (4 * Math.cos(t) * Math.cos(t) - 3) / 5;
            const y = (a * Math.tan(t)) / (4 * Math.cos(t) * Math.cos(t) - 3) / 5;

            coordinates.push(x, y, 0);
            colors.push(1, 0, 0);
        }
    }
    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "TRIANGLE_FAN");
}

function f4(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.1;
    const b = 0.2;

    for (let t = -9.5; t <= 9.5; t = t + 0.05) {
        const x = a * t - b * Math.sin(t);
        const y = a - b * Math.cos(t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }
    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}

function f5(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.1;
    const b = 0.3;

    for (let t = 0; t <= Math.PI * 2; t = t + 0.05) {
        const x = (a + b) * Math.cos(b / a * t) - b * Math.cos(t + b / a * t);
        const y = (a + b) * Math.sin(b / a * t) - b * Math.sin(t + b / a * t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }
    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}

function f6(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.1;
    const b = 0.3;

    for (let t = 0; t <= Math.PI * 2; t = t + 0.05) {
        const x = (a - b) * Math.cos(b / a * t) - b * Math.cos(t - b / a * t);
        const y = (a - b) * Math.sin(b / a * t) - b * Math.sin(t - b / a * t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }
    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}

function f7(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.4;

    for (let t = - Math.PI / 4; t <= Math.PI / 4; t = t + 0.05) {

        const r = a * Math.sqrt(2 * Math.cos(2 * t));

        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }
    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");

    coordinates = [];
    colors = [];
    for (let t = - Math.PI / 4; t <= Math.PI / 4; t = t + 0.05) {

        const r = -a * Math.sqrt(2 * Math.cos(2 * t));

        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }
    renderer.renderOver(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}

function f8(renderer: WebGLRenderer) {
    let coordinates = [];
    let colors = [];
    const a = 0.02;

    for (let t = 0; t <= 10; t = t + 0.05) {

        const r = a * Math.pow(Math.E, 1 + t);

        const x = r * Math.cos(t);
        const y = r * Math.sin(t);

        coordinates.push(x, y, 0);
        colors.push(1, 0, 0);
    }

    renderer.clearAndRender(new Float32Array(coordinates), new Float32Array(colors), "LINE_STRIP");
}