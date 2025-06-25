const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');
const blackBtn = document.getElementById('blackBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const CONTAINER_SIZE = 480;

let currentMode = 'black';

function setMode(mode) {
    currentMode = mode;
}

blackBtn.addEventListener('click', function(){
    setMode('black');
});
rainbowBtn.addEventListener('click', function(){
    setMode('rainbow');
});

function makeGrid(size){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    
    const squareSize = CONTAINER_SIZE / size;

    for (let i = 0; i < size * size; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.addEventListener('mouseover', function(){
            if (currentMode === 'black'){
                square.style.backgroundColor = '#222'
            } else if (currentMode === 'rainbow'){
                square.style.backgroundColor = getRandomColor();
            }         
        });
        container.appendChild(square);
    }
}

function getRandomColor(){
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    return 'rgb(' + a + ',' + b + ',' + c +')';
}

makeGrid(16);

resizeBtn.addEventListener('click', function(){
    let newSize = prompt("Enter a size between 1 and 100:", 16);
    newSize = Number(newSize);

    if (newSize >= 1 && newSize <= 100){
        makeGrid(newSize);
    } else {
        alert("Please enter a number between 1 and 100.")
    }
});