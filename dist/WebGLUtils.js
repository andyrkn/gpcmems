class WebGLUtils {
    constructor() {
        this.drawstyles = [];
    }
    init(gl) {
        this.drawstyles["POINTS"] = gl.POINTS;
        this.drawstyles["LINES"] = gl.LINES;
        this.drawstyles["LINE_STRIP"] = gl.LINE_STRIP;
        this.drawstyles["LINE_LOOP"] = gl.LINE_LOOP;
        this.drawstyles["TRIANGLES"] = gl.TRIANGLES;
        this.drawstyles["TRIANGLE_STRIP"] = gl.TRIANGLE_STRIP;
        this.drawstyles["TRIANGLE_FAN"] = gl.TRIANGLE_FAN;
    }
    setPosition(positionInfo, positions, gl) {
        const positionBuffer = gl.createBuffer();
        if (positionBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionInfo);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            const size = 3; // 3 components per iteration
            const type = gl.FLOAT; // the data is 32bit floats
            const normalize = false; // don't normalize the data
            const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
            const offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(positionInfo, size, type, normalize, stride, offset);
        }
    }
    setColor(colorInfo, colors, gl) {
        const colorBuffer = gl.createBuffer();
        if (colorBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(colorInfo);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            const size = 3; // 3 components per iteration
            const type = gl.FLOAT; // the data is 8bit unsigned values
            const normalize = true; // normalize the data (convert from 0-255 to 0-1)
            const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
            const offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(colorInfo, size, type, normalize, stride, offset);
        }
    }
    setMatrix(matrixInfo, gl) {
        let matrix = m4.orthographic(-1, 1, -1, 1, -1, 1);
        matrix = m4.translate(matrix, 0, 0, 0);
        matrix = m4.xRotate(matrix, 0);
        matrix = m4.yRotate(matrix, 0);
        matrix = m4.zRotate(matrix, 0);
        matrix = m4.scale(matrix, 1, 1, 1);
        gl.uniformMatrix4fv(matrixInfo, false, matrix);
    }
    getDrawType(drawType) {
        return this.drawstyles[drawType];
    }
}
//# sourceMappingURL=WebGLUtils.js.map