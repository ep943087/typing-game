
class Player{
    constructor(){
        this.index = 2;
        this.maxHealth = 360;
        this.borders = [this.maxHealth,this.maxHealth];
        this.radius = 30;
        this.direction = 1;
        this.nextIndex = null;
        this.enemy = null;
        this.moving = true;
        this.moveDir = null;
        this.movePerc = 15;
        this.kills = 0;
        this.score = 0;
    }

    resetEnemy(){
        if(this.enemy !== null){
            //this.enemy.index = 0;
        }
        this.enemy = null;
    }

    moveUp(){
        if(this.index > 0 && this.nextIndex === null){
            this.nextIndex = this.index - 1;
            this.pos = -this.moveDir;
            this.moveDir = -1;
            this.resetEnemy();
        }
    }

    moveDown(){
        if(this.index < 4 && this.nextIndex === null){
            this.nextIndex = this.index + 1;
            this.pos = this.moveDir;
            this.moveDir = 1;
            this.resetEnemy();
        }
    }

    lookLeft(){
        if(this.direction !== 0){
            this.direction = 0;
            this.resetEnemy();
        }
    }
    lookRight(){
        if(this.direction !== 1){
            this.direction = 1;
            this.resetEnemy();
        }
    }
    draw(ctx,x,top,rowHeight){
        let y = top+rowHeight*this.index+this.radius;
        if(this.nextIndex !== null){
            y = top+rowHeight*(this.index)+rowHeight*(this.pos/100)+this.radius;
            this.pos += this.movePerc*this.moveDir;
            if(Math.abs(this.pos) >= 100){
                this.index = this.nextIndex;
                this.nextIndex = null;
            }
        }

        // draw border
        const borderWidth = this.radius * 2;
        const bx1 = x - borderWidth * 1.5;
        const bx2 = x + borderWidth * .5;
        const height = 400 - top - 50;
        const btop = top + 25;
        ctx.fillStyle = `rgba(188,168,128,${this.borders[0]/this.maxHealth})`;
        ctx.fillRect(bx1,btop,borderWidth,height)
        ctx.fillStyle = `rgba(188,168,128,${this.borders[1]/this.maxHealth})`;
        ctx.fillRect(bx2,btop,borderWidth,height);

        // draw character
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x,y,this.radius,0,2*Math.PI);
        ctx.fill();

        // draw direction line
        const dir = this.direction === 0? -1 : 1;
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x + 300*dir,y);
        ctx.stroke();

    }
}

export default Player;