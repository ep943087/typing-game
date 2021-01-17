import Enemy from './enemy.js';

class Enemies{
    constructor(){
        this.vel = .4;
        this.reset();
    }
    reset(){
        this.list = new Array(5);
        for(let i=0;i<5;i++){
            this.list[i] = new Array(2);
            for(let j=0;j<2;j++){
                this.list[i][j] = [];
            }
        }    }
    searchEnemy(player){
        const list = this.list[player.index][player.direction];
        if(list.length === 0){
            player.resetEnemy();
        }
        else
            player.enemy = list[0];
    }

    takeDamage(player,key){
        if(player.enemy === null) return false;
        const {enemy} = player;
        const {index,word} = enemy;
        if(index < word.length && word[index] === key){
            enemy.index++;
            if(enemy.index >= word.length){
                this.list[player.index][player.direction].shift();
                player.kills++;
                player.score += enemy.word.length*10;
                player.resetEnemy();
            }
            return true;
        }
        return false;
    }

    addEnemy(c){
        const rowHeight = 65;
        const top = c.height - 5*rowHeight;

        const dir = Math.random() < .5? 0 : 1;
        const index = Math.floor(5*Math.random());

        const x = dir===0? 0 : c.width;
        const y = top + rowHeight*index;
        this.list[index][dir].push(new Enemy(x,y));
    }

    empty(){
        for(let i=0;i<5;i++){
            for(let j=0;j<2;j++){
                if(this.list[i][j].length > 0)
                    return false;
            }
        }
        return true;
    }

    update(c,player){
        
        if(this.empty() || Math.random() < 1 / 150){
            this.addEnemy(c);
        }

        for(let i=0;i<5;i++){
            for(let j=0;j<2;j++){
                const dir = j===0? 1 : -1;
                this.list[i][j].forEach(e=>{
                    const moved = e.move(dir*this.vel, c);
                    if(!moved){
                        player.borders[j]--;
                    }
                })
            }
        }
    }

    draw(ctx,player){
        for(let i=0;i<5;i++){
            for(let j=0;j<2;j++){
                this.list[i][j].slice().reverse().forEach(e=>{
                    e.draw(ctx,player);
                })
            }
        }
    }
}

export default Enemies;