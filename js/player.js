import Fireball from './fireball.js';

const grave = [];

for(let i=0;i<3;i++){
    grave[i] = new Image();
    grave[i].src = `images/grave/grave_000${i}.png`;
}


// elias image
const elias_dead = new Image();
elias_dead.src = `images/elias/elias_0010.png`;
const elias_wr = [];
const elias_wl = [];
const elias_fl = [];
const elias_fr = [];
elias_fl.src = `images/elias/elias_0009.png`;
elias_fr.src = `images/elias/elias_0008.png`;
for(let i=0;i<4;i++){
    elias_wr[i] = new Image();
    elias_wr[i].src = `images/elias/elias_000${i}.png`;
    elias_wl[i] = new Image();
    elias_wl[i].src = `images/elias/elias_000${i+4}.png`;

    elias_fr[i] = new Image();
    elias_fr[i].src = `images/elias_fire/elias_fire000${i}.png`;
    elias_fl[i] = new Image();
    elias_fl[i].src = `images/elias_fire/elias_fire000${i+4}.png`;
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
        this.frame = 0;
        this.fireballs = [];
        this.fireIndex = 0;
    }

    dead(){
        return this.borders[0] <= 0 || this.borders[1] <= 0;
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
            this.fireball = 0;
            this.resetEnemy();
        }
    }

    moveDown(){
        if(this.index < 4 && this.nextIndex === null){
            this.nextIndex = this.index + 1;
            this.pos = this.moveDir;
            this.moveDir = 1;
            this.fireball = 0;
            this.resetEnemy();
        }
    }

    lookLeft(){
        if(this.direction !== 0){
            this.direction = 0;
            this.fireball = 0;
            this.resetEnemy();
        }
    }
    lookRight(){
        if(this.direction !== 1){
            this.direction = 1;
            this.fireball = 0;
            this.resetEnemy();
        }
    }
    addFireball(c){
        const rowHeight = 65;
        const top = c.height - 5*rowHeight;
        let y = top+rowHeight*this.index+this.radius;
        const ball = new Fireball(c.width/2,y,this.direction,this.enemy);
        this.fireballs.push(ball);

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
        // ctx.fillStyle = "white";
        // ctx.beginPath();
        // ctx.arc(x,y,this.radius,0,2*Math.PI);
        // ctx.fill();

        const img = this.getImage();
        const width = img.width*.9;
        const h = img.height*.9;
        ctx.drawImage(img,x-width/2-5,y-h/2-25);
    }

    drawFireballs(ctx){
        for(let i=this.fireballs.length-1;i>=0;i--){
            this.fireballs[i].move();
            this.fireballs[i].draw(ctx);
            if(this.fireballs[i].dead){
                this.fireballs.splice(i,1);
            }
        }
    }

    getImage(){

        if(this.dead()){
            return elias_dead;
        }

        if(this.fireball > 0){
            const fps = 30;
            this.frame = (this.frame + 1) % fps;
    
            const i = Math.floor(this.frame / fps * 4);
            this.fireball--;
            return this.direction === 0? elias_fl[i] : elias_fr[i];
        }

        let img = elias_wr;

        if(this.direction === 0){
            img = elias_wl;
        }

        const fps = 30;
        this.frame = (this.frame + 1) % fps;

        const index = Math.floor(this.frame / fps * img.length);
        return img[index];
    }
}

export default Player;