// global variable
var clickedArr = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

// execute functions
setUp();


// functions definition

function randomDistribute() {
    var distribute = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    distribute.sort(function (item) {
        return 0.3 - Math.random(); // proizvoljan korak od 0.3 jer Math.random() bez koraka daje iste vrednosti
    })
    return distribute;
}

function reveal(cell) {
    cell.style.backgroundColor = 'red';
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer() {
    if (started === false) {
        interval = setInterval(function () {
            time++;
            document.getElementById('timer').innerHTML = 'Proteklo vreme: ' + time;
        }, 1000)
        started = true;
    }
}

function hide(cell) {
    cell.style.backgroundColor = 'rgb(17,17,231)';
    cell.innerHTML = '';
    cell.clicked = false;
}

function match(cell) {
    numCompleted++;
    cell.complete = true;
    cell.style.backgroundColor = 'purple';
}

function setUp() {
    var grid = document.getElementsByTagName('td');
    var distribute = randomDistribute();
    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];
        cell.complete = false;
        cell.clicked = false;
        cell.value = distribute[i];
        
        cell.addEventListener("mouseenter", function () {
            if (this.complete === false && this.clicked === false)
                this.style.background = 'orange';
        });

        cell.addEventListener("mouseleave", function () {

            if (this.complete === false && this.clicked === false)
                this.style.background = 'rgb(17,17,231)';
        });

        cell.addEventListener('click', function () {
            if (ready === false)
                return;
            startTimer();
            if (this.clicked === false && this.complete === false) {
                clickedArr.push(this);
                reveal(this);
            }

            if (clickedArr.length === 2) {
                if (clickedArr[0].value === clickedArr[1].value) {
                    match(clickedArr[0]);
                    match(clickedArr[1]);
                    clickedArr = [];
                    if (numCompleted === 16) {
                        alert('Uspešno rešeno za ' + time + ' sekundi !!!');
                        clearInterval(interval);
                    }

                } else {
                    ready = false;
                    document.getElementById('gridTable').style.border = '5px solid red';
                    setTimeout(function () {
                        hide(clickedArr[0]);
                        hide(clickedArr[1]);
                        clickedArr = [];
                        ready = true;
                        document.getElementById('gridTable').style.border = '5px solid black';
                    }, 500);

                }
            }
        })
    }
    document.getElementById('restart').addEventListener('click', function () {
        location.reload();
    })
}



