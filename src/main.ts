function start(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    const renderer: WebGLRenderer = new WebGLRenderer(canvas.getContext("webgl"));
    
    const tema: Tema2 = new Tema2(renderer);
    tema.start();
}
start();