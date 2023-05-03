var height = 5;
var width = 5;
var cellSize = 100;

var canvasMatrix = Array();
for(let i =0; i < height; i++){
    canvasMatrix.push(Array());
    for(let e = 0; e< width; e++){
        canvasMatrix[i].push(0);
    }
}

var heightInput = document.querySelector(".height");
var widthInput = document.querySelector(".width");
heightInput.value = height;
widthInput.value = width;

document.querySelector(".submit").onclick = ()=>{
    let old = [width, height];

    height = heightInput.value;
    width = widthInput.value;
    if(height <= 0 || width <= 0){
        width = old[0], height = old[1];
        return window.alert("Numbers must be above 0 dumbass");
    }
    if(height >= 30 || width >=15){
        width = old[0], height = old[1];
        return window.alert("Woah buddy that's a little much");
    }

    canvas.width = width * cellSize;
    canvas.height = height * cellSize;

}

console.log(canvasMatrix);

let canvasEl = document.createElement('canvas');
canvasEl.height = height*100;
canvasEl.width = width*100;
document.body.appendChild(canvasEl);

document.querySelector('.clear').onclick = ()=>{
    var context = canvas.getContext('2d');
    coloredCells = {};
    context.clearRect(0, 0, canvas.width, canvas.height);
}













