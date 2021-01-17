
let words = ['beans','doritos','chicken','jalapenos','tostitos'];

(async () => {
    try{
        const result = await fetch('https://random-word-api.herokuapp.com/word?number=200')
        words = await result.json();
    } catch(err){
        console.log(err);
    }
    
})();

class Enemy{
    constructor(x,y){
        this.x = x;
        this.color = "gray";
        this.radius = 50;
        this.y = y+this.radius*.4;
        this.index = 0;
        this.setWord();
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();

        // word
        const sp = 8;
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