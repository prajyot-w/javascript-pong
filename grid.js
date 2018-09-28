/**
 * @author Prajyot Walali
 * @date 28th September, 2018
 * GITHUB :: github.com/prajyot-w
 */

class Grid {
    constructor(ctx, width, height, ball, leftPaddle, rightPaddle) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.ball = ball;
        this.leftPaddle = leftPaddle;
        this.rightPaddle = rightPaddle;
        this.scoreP1=0;
        this.scoreP2=0;

        this.initBallPosX = this.ball.x;
        this.initBallPosY = this.ball.y;

        this.adjustLevelDifficulty();
    }

    adjustLevelDifficulty() {
        // this.leftPaddle.speed = 5;
        // this.rightPaddle.speed = 6;
        // this.ball.velX = 7;
        // this.ball.velY = 7;
    }

    printScore() {
        this.ctx.fillStyle = "white";
        this.ctx.fillText(String(this.scoreP1), (this.width/4), 30);
        this.ctx.fillText(String(this.scoreP2), ((this.width*3)/4), 30);
    }

    drawGrid() {
        this.ctx.fillStyle = "#474747";
        this.ctx.fillRect(0,0, this.width, this.height);
        this.printScore();
    }

    clearGrid() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    isCollision() {
        var isCollision = false;
        if(this.ball.velX < 0) {
            isCollision = isCollision || this.ball.isPaddleCollision(this.leftPaddle.coordinates());
        } else {
            isCollision = isCollision || this.ball.isPaddleCollision(this.rightPaddle.coordinates());
        }

        isCollision = isCollision ||
        this.ball.isHorizontalWallCollision(this.height);
        return isCollision;
    }

    userMove(keyCode) {
        switch(keyCode){
            case 38:
                this.rightPaddle.moveUp();
                this.rightPaddle.moveUp();
                break;
            case 40:
                this.rightPaddle.moveDown();
                this.rightPaddle.moveDown();
                break;
        }
    }

    autoMoveLeftPaddle() {
        if(this.ball.velX < 0) {
            if(this.ball.velY > 0) {
                this.leftPaddle.moveDown();
            } else {
                this.leftPaddle.moveUp();
            }
        }
    }

    autoMoveRightPaddle() {
        if(this.ball.velX > 0) {
            if(this.ball.velY > 0) {
                this.rightPaddle.moveDown();
            } else {
                this.rightPaddle.moveUp();
            }
        }
    }

    proceed() {
        
        this.autoMoveLeftPaddle();
        // this.autoMoveRightPaddle();

        this.clearGrid();
        this.drawGrid();
        this.leftPaddle.drawPaddle();
        this.rightPaddle.drawPaddle();


        if(!this.isCollision()){
            this.ball.move();
        }
        this.ball.drawBall();

        var nextBallPosition = this.ball.nextCoordinates();
        if(nextBallPosition.x < 0) {
            this.scoreP2+=1;
            this.ball.x = this.initBallPosX;
            this.ball.y = this.initBallPosY;
            this.ball.velX = -this.ball.velX;
        }

        if(nextBallPosition.x > this.width) {
            this.scoreP1+=1;
            this.ball.x = this.initBallPosX;
            this.ball.y = this.initBallPosY;
            this.ball.velX = -this.ball.velX;
        }
    }
}