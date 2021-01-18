const backgroundColor = "#182945";
const colorLayer = ["rgba(30,134,40,1)","rgba(19,89,23,1)"]

const drawBackground = (c,ctx,player) => {
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const rowHeight = 65;
    const top = c.height - 5*rowHeight;

    ctx.fillStyle = backgroundColor;
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillRect(0,0,c.width,c.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for(let i=0;i<5;i++){
        ctx.fillStyle = colorLayer[i%2];
        ctx.fillRect(0,top+rowHeight*i,c.width,top+rowHeight*(i+1));

        ctx.beginPath();
        ctx.moveTo(0,top+rowHeight*i);
        ctx.lineTo(c.width,top+rowHeight*i);
        ctx.stroke();
    }

    if(player === null) return;

    player.draw(ctx,c.width/2,top,rowHeight);
}

export default drawBackground;