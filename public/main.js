var height = 5;
var width = 5;
var cellSize = 100;
var folderNames = "zz_linkCV";


var canvasMatrix = Array();
for (let i = 0; i < height; i++) {
    canvasMatrix.push(Array());
    for (let e = 0; e < width; e++) {
        canvasMatrix[i].push(0);
    }
}

var heightInput = document.querySelector(".height");
var widthInput = document.querySelector(".width");
heightInput.value = height;
widthInput.value = width;

document.querySelector(".submit").onclick = () => {
    let old = [width, height];

    height = heightInput.value;
    width = widthInput.value;
    if (height <= 0 || width <= 0) {
        width = old[0], height = old[1];
        return window.alert("Numbers must be above 0 dumbass");
    }
    if (height >= 15 || width >= 15) {
        window.alert("Those numbers are a little high - just make sure you know what you're doing");
    }

    canvas.width = width * cellSize;
    canvas.height = height * cellSize;

    canvasMatrix = Array();
    for (let i = 0; i < height; i++) {
        canvasMatrix.push(Array());
        for (let e = 0; e < width; e++) {
            canvasMatrix[i].push(0);
        }
    }

}

console.log(canvasMatrix);

let canvasEl = document.createElement('canvas');
canvasEl.height = height * 100;
canvasEl.width = width * 100;
document.body.appendChild(canvasEl);

let reminder = document.createElement('div');
reminder.innerHTML = `
<button class="export buttonCool" onclick="exportPixels()">Export as Code</button>
<label style="font-style: italic;">Note: Blank pixels will be drawn as white</label>
<br>
<button class="createFolders buttonCool" onclick="initCreateFolders()">Create folders</button>
<input type="number" style="width:75px;" placeholder="# of folders" id="folders">
<label style="font-style: italic;">in homepage - 100 is recommended</label>
<br>
<button class="deleteFolders buttonCool" onclick="initPurge()">Delete ALL folders</button>
<br><br>
<textarea placeholder="Copy the code that's here!" id="code"></textarea>`;
document.body.appendChild(reminder);


document.querySelector('.clear').onclick = () => {
    var context = canvas.getContext('2d');
    coloredCells = {};
    context.clearRect(0, 0, canvas.width, canvas.height);
}

console.log(functions);


function initCreateFolders() {
    let numFolders = document.querySelector("#folders").value;
    if (numFolders <= 0) return window.alert("Cannot be less than 1");
    let code = constructCode(functions.functionCode.createFolders, "var number = " + numFolders + ';');
    document.querySelector('textarea').value = code;
}
function initPurge() {
    let code = constructCode(functions.functionCode.deleteFolders, "");
    document.querySelector('textarea').value = code;
}

function exportPixels() {
    let pData = [];
    for (let i = 0; i < canvasMatrix.flat().length; i++) {
        pData.push({ name: folderNames + "0".repeat(i >= 100 ? 0 : i >= 10 ? 1 : 2) + i, color: "FFFFFF" });
    }

    let okeys = Object.keys(coloredCells);
    for (let e = 0; e < okeys.length; e++) {
        let k = okeys[e].split(',');
        let x = Number(k[0]), y = Number(k[1]);
        let index = (y * width) + x;
        console.log(x, y);
        if (!(y >= Number(height) || x  >= Number(width))) pData[index].color = coloredCells[okeys[e]].replace("#", "");
    }

    console.log(pData);
    
    let code = constructCode(functions.functionCode.editFolders, "var pixelData = "+JSON.stringify(pData));
    document.querySelector('textarea').value = code;

}



function constructCode(keys, code) {
    code += '\n';
    for (let i = 0; i < keys.length; i++) {
        code += functions.codeSnippets[keys[i]] + '\n';
    }
    return code + functions.library;
}

