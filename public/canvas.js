let canvas = document.querySelector("canvas");
var activeCell;
let aspX;
let aspY;
let activeColor = document.querySelector(".color").value;
var coloredCells = Object();
canvas.onmousemove = function (e) {
    var cw = this.width;
    var ch = this.height;
    aspX = cw / width;
    aspY = ch / height;

    let px = e.offsetX / aspX;
    let py = e.offsetY / aspY;

    let pixelX = Math.floor(px) * aspX;
    let pixelY = Math.floor(py) * aspY;

    activeCell = [Math.floor(px), Math.floor(py)];

    px = pixelX > width ? pixelX -= 1 : pixelX;
    py = pixelY > height ? pixelY -= 1 : pixelY;

    var ctx = this.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
    fillActive();
    let fill = getFill(activeCell);
    ctx.fillStyle = fill;
    ctx.fillRect(px, py, cellSize, cellSize);

}

canvas.onclick = function () {
    if (!activeCell) return;

    let px = activeCell[0];
    let py = activeCell[1];

    console.log(activeCell);

    coloredCells[`${px},${py}`] = activeColor;

    var ctx = this.getContext("2d");
    ctx.fillStyle = getFill([px, py]);
    ctx.fillRect(px * cellSize, py * cellSize, 100, 100);

}


function getFill(cell) {
    let key = `${cell[0]},${cell[1]}`, color;
    if (Object.keys(coloredCells).indexOf(key) !== -1) {
        color = coloredCells[key];
    } else {
        color = "EEEEEE";
    }
    let rgb = hexToRgb(color);
    rgb.r /= (100 / 92)
    rgb.g /= (100 / 92)
    rgb.b /= (100 / 92)

    let hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    console.log(hex);
    return hex;
}

function fillActive() {
    let keys = Object.keys(coloredCells);
    for (let i = 0; i < keys.length; i++) {
        let pos = keys[i].split(',');
        let px = Number(pos[0]);
        let py = Number(pos[1]);

        var ctx = canvas.getContext("2d");
        let fill = coloredCells[keys[i]];
        ctx.fillStyle = fill;
        ctx.fillRect(px * cellSize, py * cellSize, cellSize, cellSize);
    }
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
