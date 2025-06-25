// References to DOM elements and buttons
const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');
const blackBtn = document.getElementById('blackBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const gradientBtn = document.getElementById('gradientBtn');
const eraseBtn = document.getElementById('eraseBtn');
const clearBtn = document.getElementById('clearBtn');
const CONTAINER_SIZE = 480;

// Current drawing mode
let currentMode = 'black';

// Set the current drawing mode
function setMode(mode) {
    currentMode = mode;
}

// Event listeners to change modes 
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

// Clear button resets all squares to their initial state
clearBtn.addEventListener('click', function(){
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '#222';
        square.style.opacity = 0; 
    });
});

// Create the grid
// @param {number} size = Number of squares per row/column
function makeGrid(size){

    // Removes any existing grid squares
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    // Set container styles for the grid
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    
    // Calculates each square's size
    const squareSize = CONTAINER_SIZE / size;

    // Creates the squares
    for (let i = 0; i < size * size; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.style.backgroundColor = '#222';
        square.style.opacity = 0;

        // Drawing behavior on mouseover
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

// Generates a random RBG string
// @returns {string} = An RGB color string
function getRandomColor(){
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    return 'rgb(' + a + ',' + b + ',' + c +')';
}

// Initialize the grid with a default size of 16x16
makeGrid(16);

// Handles the set grid size button
resizeBtn.addEventListener('click', function(){
    let newSize = prompt("Enter a size between 1 and 100:", 16);
    newSize = Number(newSize);

    if (newSize >= 1 && newSize <= 100){
        makeGrid(newSize);
    } else {
        alert("Please enter a number between 1 and 100.")
    }
});