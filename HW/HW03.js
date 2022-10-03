"use strict";
var gl;
var morph = false;
var I;
var U;

var Param = 0.0;
var tParamLoc;

var color = vec4(Param, 0.0, 1.0, 1.0);
var colorLoc;

var delay = 100;

var deltaT = 1.0;

init();

function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL isn't available"); }

    I = [
        vec2(-0.5, -0.7),
        vec2(0.5, -0.7),
        vec2(0.5, -0.4),
        vec2(0.2, -0.4),
        vec2(0.2, 0.4),
        vec2(0.5, 0.4),
        vec2(0.5, 0.7),
        vec2(-0.5, 0.7),
        vec2(-0.5, 0.4),
        vec2(-0.2, 0.4),
        vec2(-0.2, -0.4),
        vec2(-0.5, -0.4)
    ]

    U = [
        vec2(-0.5, -0.7),
        vec2(0.5, -0.7),
        vec2(0.5, 0),
        vec2(0.5, 0.7),
        vec2(0.2, 0.7),
        vec2(0.2, 0),
        vec2(0.2, -0.4),
        vec2(-0.2, -0.4),
        vec2(-0.2, 0),
        vec2(-0.2, 0.7),
        vec2(-0.5, 0.7),
        vec2(-0.5, 0)
    ]

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    tParamLoc = gl.getUniformLocation( program, "tParam" );

    //define the uniform variable in the shader, aColor

    colorLoc = gl.getUniformLocation( program, "aColor" );

    // Load the data into the GPU

    var bufferi = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferi);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(I), gl.STATIC_DRAW);

    var ipositionLoc = gl.getAttribLocation(program, "iPosition");
    gl.vertexAttribPointer(ipositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ipositionLoc);

    var bufferu = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferu);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(U), gl.STATIC_DRAW);

    var upositionLoc = gl.getAttribLocation(program, "uPosition");
    gl.vertexAttribPointer(upositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(upositionLoc);


    // Initialize event handlers
    document.getElementById("Morph").onclick = function () {
        morph = !morph;
    };

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if(morph){
        Param += 0.015*deltaT;
        if(Param >= 1.0 || Param <= 0.0){
        deltaT = -deltaT;
    }
    }
   

    color = vec4(Param, 0.0, 1.0-Param, 1.0);
    
    gl.uniform1f(tParamLoc, Param);

    gl.uniform4fv(colorLoc, color);

    gl.drawArrays(gl.LINE_LOOP, 0, 12);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}