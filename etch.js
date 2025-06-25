const container = document.getElementById('container');

for (let i = 0; i < 16 * 16; i++){
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', function(){
        square.style.backgroundColor = '#222';
    });

    container.appendChild(square);
}