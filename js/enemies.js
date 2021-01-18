import Enemy from './enemy.js';

class Enemies{
    constructor(){
        this.vel = .4;
        this.reset();
        this.initEnemies();
    }

    initEnemies(){
        const michael = new Enemy();
        michael.enemyType = "mmr";
        michael.x = 100;
        michael.y = 155;
        michael.word = 'Michael Myers'.split('');

        const freddy = new Enemy();
        freddy.enemyType = "fr";
        freddy.x = 100;
        freddy.y = 285;
        freddy.word = 'Freddy Krueger'.split('');

        const leather_face = new Enemy();
        leather_face.enemyType = "lfl";
        leather_face.x = 816;
        leather_face.y = 285;
        leather_face.word = 'Leather Face'.split('');

        const jason = new Enemy();
        jason.enemyType = "jl";
        jason.x = 816;
        jason.y = 155;
        jason.word = 'Jason Voorhees'.split('');

        this.list[0][0].push(michael);
        this.list[0][0].push(freddy);
        this.list[0][0].push(leather_face);
        this.list[0][0].push(jason);
    }
    reset(){
        this.list = new Array(5);
        for(let i=0;i<5;i++){
            this.list[i] = new Array(2);
            for(let j=0;j<2;j++){
                this.list[i][j] = [];
            }
        }    
    }
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
        this.list[index][dir].push(new Enemy(x,y,dir));
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
        
        const rand = Math.random() < 1 / 150;

        if(this.empty() || rand){
            this.addEnemy(c);
        }

        for(let i=0;i<5;i++){
            for(let j=0;j<2;j++){
                const dir = j===0? 1 : -1;
                this.list[i][j].forEach(e=>{
                    const moved = e.move(dir*this.vel, c);
                    if(!moved){
                        player.borders[j]--;
                        if(j === 0){
                            player.bh1 = true;
                        } else{
                            player.bh2 = true;
                        }
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