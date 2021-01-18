

const grave = [];

for(let i=0;i<3;i++){
    grave[i] = new Image();
    grave[i].src = `images/grave/grave_000${i}.png`;
}


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
        this.bh1 = false;
        this.bh2 = false;
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

        // draw direction line
        const dir = this.direction === 0? -1 : 1;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x + 250*dir,y);
        ctx.stroke();

        // draw border
        const borderWidth = this.radius * 2;
        const bx1 = x - borderWidth * 1.5;
        const bx2 = x + borderWidth * .5;
        const height = 400 - top - 50;
        const btop = top + 10;
        // ctx.fillStyle = `rgba(188,168,128,${this.borders[0]/this.maxHealth})`;
        // ctx.fillRect(bx1,btop,borderWidth,height)
        // ctx.fillStyle = `rgba(188,168,128,${this.borders[1]/this.maxHealth})`;
        // ctx.fillRect(bx2,btop,borderWidth,height);

        let i1 = 0;
        const h1 = this.borders[0]/this.maxHealth;
        if(h1 < .5) i1 = 1;
        if(this.borders[0] <= 0) i1 = 2;
        
        let i2 = 0;
        const h2 = this.borders[1]/this.maxHealth;
        if(h2 < .5) i2 = 1;
        if(this.borders[1] <= 0) i2 = 2;

        
        let shake1 = 0;
        if(this.bh1 && this.borders[0] > 0){
            const ch = Math.random() < .5? -1 : 1;
            shake1 = ch;
            this.bh1 = false;
        }
        let shake2 = 0;
        if(this.bh2 && this.borders[1] > 0){
            const ch = Math.random() < .5? -1 : 1;
            shake2 = ch;
            this.bh2 = false;
        }
        ctx.drawImage(grave[i1],bx1 + shake1,btop,grave[i1].width*3,grave[i1].height*3);
        ctx.drawImage(grave[i2],bx2 + shake2,btop,grave[i2].width*3,grave[i2].height*3);

        // draw character
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x,y,this.radius,0,2*Math.PI);
        ctx.fill();



    }
}

export default Player;