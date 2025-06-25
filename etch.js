const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');
const blackBtn = document.getElementById('blackBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const gradientBtn = document.getElementById('gradientBtn');
const eraseBtn = document.getElementById('eraseBtn');
const clearBtn = document.getElementById('clearBtn');
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
gradientBtn.addEventListener('click', function(){
    setMode('gradient');
});
eraseBtn.addEventListener('click', function(){
    setMode('erase');
});
clearBtn.addEventListener('click', function(){
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '#222'; // match initial
        square.style.opacity = 0; 
    });
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
        square.style.backgroundColor = '#222';
        square.style.opacity = 0;


        square.addEventListener('mouseover', function(){
            if (currentMode === 'black'){
                square.style.backgroundColor = '#222';
                square.style.opacity = '1';
            } else if (currentMode === 'rainbow'){
                square.style.backgroundColor = getRandomColor();
                square.style.opacity = '1';
            } else if (currentMode === 'gradient'){
                let currentOpacity = parseFloat(square.style.opacity) || 0;
                if (currentOpacity <1) {
                    currentOpacity += 0.1;
                    if (currentOpacity > 1) {
                        currentOpacity = 1;
                    }
                    square.style.backgroundColor = '#222';
                    square.style.opacity = currentOpacity;
                }
            } else if (currentMode === 'erase'){
                square.style.backgroundColor = '#fff';
                square.style.opacity = 1;
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