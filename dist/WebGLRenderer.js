class WebGLRenderer {
    constructor(gl) {
        this.webGLUtils = new WebGLUtils();
        if (gl) {
            this.gl = gl;
            this.webGLUtils.init(this.gl);
            this.start();
        }
        else {
            console.error("null WebGLRenderingContext");
        }
    }
    start() {
        const program = webglUtils.createProgramFromScripts(this.gl, ["3d-vertex-shader", "3d-fragment-shader"]);
        this.positionInfo = this.gl.getAttribLocation(program, "a_position");
        this.colorInfo = this.gl.getAttribLocation(program, "a_color");
        this.matrixInfo = this.gl.getUniformLocation(program, "u_matrix");
        this.gl.useProgram(program);
    }
    resize() {
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
    draw(coordinates, colors, drawType) {
        this.webGLUtils.setPosition(this.positionInfo, coordinates, this.gl);
        this.webGLUtils.setColor(this.colorInfo, colors, this.gl);
        this.webGLUtils.setMatrix(this.matrixInfo, this.gl);
        this.gl.drawArrays(this.webGLUtils.getDrawType(drawType), 0, coordinates.length / 3);
    }
    renderOver(coordinates, colors, drawType) {
        this.resize();
        this.draw(coordinates, colors, drawType);
    }
    clearAndRender(coordinates, colors, drawType) {
        this.resize();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.draw(coordinates, colors, drawType);
    }
}
//# sourceMappingURL=WebGLRenderer.js.map