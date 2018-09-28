/**
 * @author Prajyot Walali
 * @date 28th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

class Paddle {
    constructor(ctx, x, y, gridthHeight) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.limit = gridthHeight;
        this.width = 10;
        this.height = 90;
    }

    coordinates() {
        return {x: this.x, y: this.y, width: this.width, height: this.height};
    }

    drawPaddle() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp() {
        if(this.ball == undefined){
            if(this.y-this.speed < 0) {
                this.y = 0;
            } else {
                this.y = this.y-this.speed;
            }
        }
    }

    moveDown() {
        if(this.ball == undefined){
            if(this.y+this.height+this.speed > this.limit) {
                this.y = this.limit-this.height;
            } else {
                this.y = this.y + this.speed;
            }
        }
    }

    setBall(ball) {
        this.ball = ball;
    }

    autoMove() {
        if(this.ball != undefined){
            debugger;
            if(this.ball.velY > 0) {
                this.moveDown();
            }

            else {
                this.moveUp();
            }
        }
    }
}