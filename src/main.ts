function start(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    const renderer: WebGLRenderer = new WebGLRenderer(canvas.getContext("webgl"));

    let counter = 0;
    const functions: Function[] = [f1, f7];
    functions[counter](renderer);
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
