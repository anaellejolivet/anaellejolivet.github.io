
var canvas;
var gl;

var positions;

var numTimesToSubdivide = 0;

var bufferId;

init();

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three positions.


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    document.getElementById("slider").onchange = function (event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};

function line(a, b) {
    positions.push(a, b);
}

function divideLine(a, b, count) {

    // check for end of recursion

    if (count == 0) {
        line(a, b);
    }
    else {

        //bisect the sides

        var c = mix(a, b, 1/3);
        var e = mix(a, b, 2/3);

        var len = e[0] - c[0];
        var x = c[0] + len/2;
        var y = len * Math.sqrt(3) / 2;
        var d = vec2(x, y);
        positions.push(c, d);
        positions.push(d, e);

        --count;

        
        // two new lines

        divideLine(a, c, count);
        divideLine(e, b, count);
    }
}

function render() {
    var vertices = [
        vec2(-1, 0),
        vec2(1, 0)
    ];
    positions = [];
    divideLine(vertices[0], vertices[1],
        numTimesToSubdivide);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINES, 0, positions.length);
    positions = [];
}
