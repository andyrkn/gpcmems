function start(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    const renderer: WebGLRenderer = new WebGLRenderer(canvas.getContext("webgl"));
    
    const tema: ImplementedHomework = new ImplementedHomework(renderer);
    tema.start();
}
start();