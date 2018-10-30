// global variable
var interval;
var started = false;
var time = 0;
var ready = true;
var timer = document.getElementById('timer');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var record = document.getElementById('record');
var pastTimeList = document.getElementById('pastTimeList');

var lastRecord = null;


// execute functions 
setUp();

// functions definition

function startTimer() {
    if (started === false) {
        interval = setInterval(function () {
            time++;
            timer.innerHTML = 'Time: ' + time / 100;
        }, 10)
        started = true;
    } else {
        clearInterval(interval);
        started = false;
    }
}

function resetTimer() {
    if (!started) {
        time = 0;
        clearInterval(interval);
    }
    pastTimeList.innerHTML = '';
    timer.innerHTML = '0.00';
    started = false;
}

function pastRecord() {
    (time !== 0)
    pastTimeList.innerHTML += `<li>${time / 100}</li>`;

}

function setUp() {

    start.addEventListener('click', function () {
        if (ready === false)
            return;
        startTimer();
    })
    record.addEventListener('click', function () {
        pastTimeList.innerHTML += time / 100 + '<br>';
    })

    reset.addEventListener('click', function () {
        location.reload();
    })
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 's':
            startTimer();
            break;
        case 'r':
            resetTimer();
            break;
        case 't':
            pastRecord();
            break;
    }
});