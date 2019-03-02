declare var webglUtils: any;
declare var m4: any;
class WebGLRenderer {

    private gl: WebGLRenderingContext;
    private webGLUtils: WebGLUtils = new WebGLUtils();

    private positionInfo: number;
    private colorInfo: number;
    private matrixInfo: WebGLUniformLocation;

    constructor(gl: WebGLRenderingContext | null) {
        if (gl) {
            this.gl = gl;
            this.webGLUtils.init(this.gl);
            this.start();
        } else {
            console.error("null WebGLRenderingContext");
        }
    }

    private start(): void {
        const program = webglUtils.createProgramFromScripts(this.gl, ["3d-vertex-shader", "3d-fragment-shader"]);

        this.positionInfo = this.gl.getAttribLocation(program, "a_position");
        this.colorInfo = this.gl.getAttribLocation(program, "a_color");
        this.matrixInfo = <WebGLUniformLocation>this.gl.getUniformLocation(program, "u_matrix");

        this.gl.useProgram(program);
    }

    private resize(): void {
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    private draw(coordinates: Float32Array, colors: Float32Array, drawType: string): void {
        this.webGLUtils.setPosition(this.positionInfo, coordinates, this.gl);
        this.webGLUtils.setColor(this.colorInfo, colors, this.gl);
        this.webGLUtils.setMatrix(this.matrixInfo, this.gl);

        this.gl.drawArrays(this.webGLUtils.getDrawType(drawType), 0, coordinates.length / 3);
    }

    public renderOver(coordinates: Float32Array, colors: Float32Array, drawType: string): void {
        this.resize();
        this.draw(coordinates, colors, drawType);
    }

    public clearAndRender(coordinates: Float32Array, colors: Float32Array, drawType: string): void {
        this.resize();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.draw(coordinates, colors, drawType);
    }
}