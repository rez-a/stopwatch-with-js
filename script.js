let millisecondElement = document.getElementById('millisecond');
let secondElement = document.getElementById('second');
let minutesElement = document.getElementById('minutes');
let millisecond, second, minutes, interval;


//function Cookie review
function load() {
    document.getElementById('pause').disabled = true;

    //If millisecond & second & minutes is in a cookie
    if (Cookies.get('millisecond') && Cookies.get('second') && Cookies.get('minutes')) {
        millisecond = Number(Cookies.get('millisecond'));
        second = Number(Cookies.get('second'));
        minutes = Number(Cookies.get('minutes'));
        millisecondElement.innerHTML = showNumber(millisecond);
        secondElement.innerHTML = showNumber(second);
        minutesElement.innerHTML = showNumber(minutes);

    }

    //If millisecond & second & minutes is not in a cookie
    else {
        second = 0;
        minutes = 0;
        millisecond = 0;
        Cookies.set('second', second);
        Cookies.set('minutes', minutes);
        Cookies.set('millisecond', millisecond);
        millisecondElement.innerHTML = showNumber(millisecond);
        secondElement.innerHTML = showNumber(second);
        minutesElement.innerHTML = showNumber(minutes);
    }
}

// function start
function start() {
    document.getElementById('start').disabled = true;
    document.getElementById('pause').disabled = false;

    interval = setInterval(function() {

        //after 2 hour
        if (millisecondElement.innerHTML === '99' && secondElement.innerHTML === "59" && minutesElement.innerHTML === "59") {
            reset()
            return;
        } else if (millisecondElement.innerHTML === '99') {
            //after 1 minutes
            if (secondElement.innerHTML === "59") {
                minutes += 1;
                second = 0;
                minutesElement.innerHTML = showNumber(minutes);
                secondElement.innerHTML = showNumber(second);
                Cookies.set('minutes', minutes);
                Cookies.set('second', second);
                return;
            }
            second += 1;
            millisecond = 0;
            secondElement.innerHTML = showNumber(second);
            millisecondElement.innerHTML = showNumber(millisecond);
            Cookies.set('second', second);
            Cookies.set('millisecond', millisecond);
            return;
        }


        millisecond += 1;
        millisecondElement.innerHTML = showNumber(millisecond);
        Cookies.set('millisecond', millisecond);

    }, 10);
}

//function pause
function pause() {
    clearInterval(interval);
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
}

//function reset
function reset() {
    pause()
    millisecond = 0;
    second = 0;
    minutes = 0;
    Cookies.set('millisecond', millisecond);
    Cookies.set('second', second);
    Cookies.set('minutes', minutes);
    millisecondElement.innerHTML = '00';
    secondElement.innerHTML = '00';
    minutesElement.innerHTML = '00';
    document.getElementById('reset').disabled = true;
    setTimeout(function() {
        document.getElementById('reset').disabled = false;
    }, 100)
}


//function for show number from 0 to 00
function showNumber(number) {
    if (number < 10) {
        number = `0${number}`;
    }
    return number;
}