/**
 * @author Prajyot Walali
 * @date 28th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

class Ball {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.velX = 5;
        this.velY = 5;
        this.dim = 10;
    }

    drawBall() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    move(){
        this.x += this.velX;
        this.y += this.velY;
    }

    isVerticalCollision(gridWidth) {
        var isCollision = false;
        var nextCoordinates = this.nextCoordinates();
        if(nextCoordinates.x == gridWidth || nextCoordinates.x==0) {
            isCollision = isCollision || true;
            this.velX = -this.velX;
        }
        return isCollision;
    }

    isHorizontalWallCollision(gridHeight){
        var isCollision = false;
        var nextCoordinates = this.nextCoordinates();
        if(nextCoordinates.y+10 >= gridHeight || nextCoordinates.y-10<=0) {
            isCollision = isCollision || true;
            this.velY = -this.velY;
        }
        return isCollision;
    }

    isPaddleCollision(paddleCoordinates) {
        var isCollision = false;
        var nextCoordinates = this.currentCoordinates();
        if(this.velX > 0) {
            if(
                (nextCoordinates.x+10 >= paddleCoordinates.x) && 
                (nextCoordinates.y >= paddleCoordinates.y) &&
                (nextCoordinates.y <= paddleCoordinates.y+paddleCoordinates.height)
            ) {
                isCollision = isCollision || true;
            }
        }

        if(this.velX < 0) {
            if(
                (nextCoordinates.x-10 <= paddleCoordinates.x+paddleCoordinates.width) &&
                (nextCoordinates.y >= paddleCoordinates.y) &&
                (nextCoordinates.y <= paddleCoordinates.y+paddleCoordinates.height)
            ) {
                isCollision = isCollision || true;
            }
        }

        if(isCollision) {
            this.velX = -this.velX;
        }

        return isCollision;
    }

    nextCoordinates() {
        return {x: this.x+this.velX, y: this.y+this.velY};
    }

    currentCoordinates() {
        return {x: this.x, y: this.y};
    }

}