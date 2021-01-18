
// michael myers walk left / right
const mmwl = [];
const mmwr = [];
const jwl = [];
const jwr = [];
const fwl = [];
const fwr = [];
const lfl = [];
const lfr = [];

for(let i=0;i<4;i++){
    mmwl[i] = new Image();
    mmwl[i].src = `images/michael_myers/michael_myers_walk000${i}.png`;
    mmwr[i] = new Image();
    mmwr[i].src = `images/michael_myers/michael_myers_walk000${i+4}.png`;

    jwl[i] = new Image();
    jwl[i].src = `images/jason/jason_walk_000${i}.png`;
    jwr[i] = new Image();
    jwr[i].src = `images/jason/jason_walk_000${i+4}.png`;

    fwl[i] = new Image();
    fwl[i].src = `images/freddy/freddy_walk_000${i}.png`;
    fwr[i] = new Image();
    fwr[i].src = `images/freddy/freddy_walk_000${i+4}.png`;

    lfl[i] = new Image();
    lfl[i].src = `images/leather_face/leather_face_walk_000${i}.png`;
    lfr[i] = new Image();
    lfr[i].src = `images/leather_face/leather_face_walk_000${i+4}.png`;
}


export default {
    mmwl,
    mmwr,
    jwl,
    jwr,
    fwl,
    fwr,
    lfl,
    lfr
}