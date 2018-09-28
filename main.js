/**
 * @author Prajyot Walali
 * @date 28th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

var canvas = document.getElementById("game-board");
var ctx = canvas.getContext("2d");
var globalGrid = undefined;

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

var setCanvasParameters = function(){
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = "white";
    this.ctx.font = "20px Georgia";
}

var gameLoop = function() {
    this.globalGrid.proceed();
    requestAnimationFrame(gameLoop);
}

var init = function() {
    setCanvasParameters();

    var b = new Ball(this.ctx, this.canvas.width/2, this.canvas.height/2);

    // AI Paddle
    var leftPaddle = new Paddle(this.ctx, 10, 210, canvas.height);
    // USER Paddle
    var rightPaddle = new Paddle(this.ctx, canvas.width-20, 210, canvas.height);

    var g = new Grid(this.ctx, canvas.width, canvas.height, b, leftPaddle, rightPaddle);

    g.drawGrid();
    b.drawBall();

    document.addEventListener('keydown', function(e) {
        g.userMove(e.keyCode);
    }, true);


    this.globalGrid = g;

    gameLoop();
}

init();
// setCanvasParameters();
