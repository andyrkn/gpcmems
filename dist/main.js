function start() {
    const canvas = document.getElementById("canvas");
    const renderer = new WebGLRenderer(canvas.getContext("webgl"));
    const tema = new Tema2(renderer);
    tema.start();
}
start();
//# sourceMappingURL=main.js.map