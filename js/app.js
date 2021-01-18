import drawBackground from './background.js';
import funcs from './functions.js';
import Player from './player.js';
import Enemies from './enemies.js';
import Enemy from './enemy.js';

window.onload = () => draw();

const c = document.querySelector('#myCanvas');
const menu = document.querySelector('.game__menu');
const playButton = document.querySelector('.play-button');
const kills = document.querySelector('.kills');
const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');

const ctx = c.getContext('2d');
let state = 'menu';
let player = new Player();
const enemies = new Enemies();

(() => {
    const hs = localStorage.getItem('high-score');
    if(hs === null){
        localStorage.setItem('high-score','0');
    }
    highScore.textContent = `Highest: ${hs}`;
})();

document.addEventListener('keydown',e=>{
    if(state !== "game" || player === null) return;
    e.preventDefault();
    switch(e.keyCode){
        case 37:
            player.lookLeft();
            break;
        case 38:
            player.moveUp();
            break;
        case 39:
            player.lookRight();
            break;
        case 40:
            player.moveDown();
            break;
        default:
            const hit = enemies.takeDamage(player,e.key);
    }
})

playButton.onclick = (e) => {
    if(!menu.classList.contains('remove')){
        menu.classList.add('remove');
        state = 'game';
        player = new Player();
        enemies.reset();
    }
}

const checkGameover = () => {
    if(player === null) return;
    
    if(player.borders[0] <= 0 || player.borders[1] <= 0){
        state = "menu";
        menu.classList.remove('remove');
        const hs = player.score > parseInt(localStorage.getItem('high-score'))? player.score : parseInt(localStorage.getItem('high-score'));
        localStorage.setItem('high-score',hs.toString());
    }
}

const draw = () => {
    requestAnimationFrame(draw);
    if(state === "game" && player !== null){
        checkGameover();
        kills.textContent = `Kills: ${player.kills}`;
        score.textContent = `Score: ${player.score}`;
        const hs = player.score > parseInt(localStorage.getItem('high-score'))? player.score : parseInt(localStorage.getItem('high-score'));
        highScore.textContent = `Highest: ${hs}`;
        enemies.searchEnemy(player);
        enemies.update(c,player);
    }
    drawBackground(c,ctx,player);

    enemies.draw(ctx,player);
}