
const fire = [];

for(let i=0;i<4;i++){
    fire[i] = new Image();
    fire[i].src = `images/fireball/fireball_000${i}.png`;
}



class Fireball{
    constructor(x,y,direction,target){
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.vel = 100;
        this.target = target;
        this.dead = false;
        this.frame = Math.floor(Math.random()*4);
    }
    move(){
        if(this.target.x === null) return this.dead = true;

        this.x += this.direction === 0? this.vel*-1 : this.vel;
        const distance = Math.sqrt(Math.pow(this.x-this.target.x,2));
        if(distance < this.vel){
            this.dead = true;
        }
    }
    draw(ctx){
        const img = fire[this.frame];
        this.frame = (this.frame+1)%fire.length;
        ctx.drawImage(img,this.x-img.width/2,this.y-img.height/2);
    }
}

export default Fireball;