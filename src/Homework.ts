abstract class Homework {

    private renderer: WebGLRenderer;
    private functions: Function[];
    private counter: number;

    constructor(renderer: WebGLRenderer) {

        this.renderer = renderer;
        this.counter = 0;
        this.functions = [];
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowRight") {
                if (this.counter == this.functions.length - 1) {
                    this.counter = 0;
                    this.functions[this.counter](this.renderer);
                }
                else this.counter++;
            } else if (e.key == "ArrowLeft") {
                if (this.counter == 0) {
                    this.counter = this.functions.length - 1;
                    this.functions[this.counter](this.renderer);
                }
                else this.counter--;
            }
            this.functions[this.counter](this.renderer);
        });
    }

    public addFunctions(f: Function[]): void {
        this.functions = this.functions.concat(f);
    }

    public start(): void {
        this.functions[this.counter](this.renderer);
    }
}