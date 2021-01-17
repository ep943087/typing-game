const getMousPos = (e,c) => {
    const rect = c.getBoundingClientRect();
    return{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

export default {
    getMousPos
}