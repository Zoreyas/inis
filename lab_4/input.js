function getTarget(e) {
    var targ

    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;

    return targ;
}

function restorePosition(targ, lastX, lastY) {
    targ.style.top = lastX;
    targ.style.left = lastY;
    targ = null;
}

let expired;
let fastExpired = null;
var dblFlag = false;
var isActive = false;
var isDblTouched = false;
var isColorChangeActive = false;
var targ;
var lastX, lastY;

let doubleClick = function () {
    console.log('double click')
    isDblTouched = true;
    dblFlag = true;
}

let fastClick = function () {
    console.log('fasttouch');
    isDblTouched = false;
    tart = null;
    isActive = false;
}

let doubleTouch = function (e) {
    if (e.touches.length === 1) {
        if (!expired) {
            expired = e.timeStamp + 400
        } else if (e.timeStamp <= expired) {
            e.preventDefault()
            doubleClick()
            expired = null
        } else {
            expired = e.timeStamp + 400
        }
    }
}

let fastTouch = function (e) {
    if (e.touches.length === 1) {
        fastExpired = e.timeStamp + 400
    }
    if ((e.touches.length === 0) && (e.timeStamp <= fastExpired) && (dblFlag == false)) {
        e.preventDefault()
        fastClick();
        fastExpired = null
    }
    if (e.touches.length === 0) {
        dblFlag = false;
    }
}

function prepareDivs() {
    const Divs = document.getElementsByClassName("target");

    for (let i = 0; i < Divs.length; i++) {
        Divs[i].addEventListener('mousedown', function(e) {
            targ = getTarget(e);
            lastX = targ.style.top;
            lastY = targ.style.left;

            isActive = true;
            offset = [
                targ.offsetLeft - e.clientX,
                targ.offsetTop - e.clientY
            ];
        }, true);

        Divs[i].addEventListener("dblclick", function(e) {
            targ = getTarget(e);
            lastX = targ.style.top;
            lastY = targ.style.left;
            isActive = true;
            isColorChangeActive = true;
        });

        Divs[i].addEventListener('mouseup', function() {
            if (isDblTouched == false) {
                isActive = false;
                isColorChangeActive = false;
            }
        }, true);  

        Divs[i].addEventListener("touchstart", function(e) {
            if (isDblTouched == false) {
                targ = getTarget(e);
                lastX = targ.style.top;
                lastY = targ.style.left;

                isActive = true;
                offset = [
                    targ.offsetLeft - e.touches[0].clientX,
                    targ.offsetTop - e.touches[0].clientY
                ];
            }
        });

        Divs[i].addEventListener("touchend", function(e) {
            if (isDblTouched == false) {
                isActive = false;
            } 
        });

        Divs[i].addEventListener("touchstart", doubleTouch);
    }

    document.addEventListener("touchstart", fastTouch);

    document.addEventListener("touchend", fastTouch);

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            isActive = false;
            isColorChangeActive = false;
            restorePosition(targ, lastX, lastY);
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isActive) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };

            targ.style.left = (mousePosition.x + offset[0]) + 'px';
            targ.style.top  = (mousePosition.y + offset[1]) + 'px';
        }      
    }, true);

    document.addEventListener('mousemove', function(e) {
        if (isColorChangeActive) {
            x = e.clientX;
            y = e.clientY;
            red = x;
            green = y;
            blue = (x + y) / 2; 
            color = [red, green, blue].join(", ");
            targ.style.backgroundColor = 'rgb(' + color + ')';
        }      
    }, true);

    document.addEventListener("touchmove", function(e) {
        if (isActive == true) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;

            targ.style.left = (x + offset[0]) + 'px';
            targ.style.top  = (y + offset[1]) + 'px'; 

            if (e.touches.length === 2) {
                restorePosition(targ, lastX, lastY);
            }
        }  
    });
}

prepareDivs();