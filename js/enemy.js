
import Sprites from './sprites.js';

const {mmwr,mmwl,jwl,jwr,fwl,fwr,lfl,lfr} = Sprites;

let words = ['beans','doritos','chicken','jalapenos','tostitos'];

(async () => {
    try{
        const result = await fetch('https://random-word-api.herokuapp.com/word?number=1000')
        words = await result.json();
    } catch(err){
        console.log(err);
    }
})();

class Enemy{
    constructor(x,y,direction){
        this.x = x;
        this.color = "gray";
        this.radius = 50;
        this.y = y+this.radius*.4;
        this.index = 0;
        this.direction = direction;
        this.chooseEnemyType();
        this.walkIndex = 0;
        this.setWord();
    }

    chooseEnemyType(){
        const r = Math.floor(Math.random()*4);
        switch(r){
            case 0: this.enemyType = "mm"; break;
            case 1: this.enemyType = "j"; break;
            case 2: this.enemyType = "f"; break;
            case 3: this.enemyType = "lf"; break;
        }
        if(this.direction === 1)
            this.enemyType += 'l';
        else   
            this.enemyType += 'r';
    }


    getImage(){
        let img;
        switch(this.enemyType){
            case 'mml': img = mmwl; break;
            case 'mmr': img = mmwr; break;
            case 'jr': img = jwr; break;
            case 'jl': img = jwl; break;
            case 'fr': img = fwr; break;
            case 'fl': img = fwl; break;
            case 'lfl': img = lfl; break;
            case 'lfr': img = lfr; break;
            default: return null;
        }
        const fps = 30;
        this.walkIndex = (this.walkIndex + 1) % fps;

        const index = Math.floor(this.walkIndex / fps * img.length);
        return img[index];
    }

    move(xVel,c){
        const dist = Math.sqrt(Math.pow(c.width/2- this.x,2));
        if(dist < 100){
            return false;
        }
        this.x += xVel;
        return true;
    }
    setWord(){
        const index = Math.floor(words.length*Math.random());
        this.word = words[index].split('');
    }
    draw(ctx,player){
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        // ctx.fill();


        const img = this.getImage();
        // image
        const imgw = img.width*.9;
        const imgh = img.height*.9;
        ctx.drawImage(img,this.x-imgw/2,this.y-imgh/2,imgw,imgh);

        // word
        const sp = 9;
        const width = this.word.length * sp;
        const start = this.x - width / 2;
        const wordTop = this.y - this.radius*.75;

        ctx.fillStyle = "rgba(0,0,0,.75)";
        ctx.fillRect(start-10,wordTop-10,width+20,20)
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "16px Monospace";
        this.word.forEach((ch,index)=>{
            ctx.fillStyle = "white";
            if(player !== null && index < this.index){
                ctx.fillStyle = "red";
            }
            ctx.fillText(ch,start + sp/2 + index*sp,wordTop);
        })
    }
}

export default Enemy;