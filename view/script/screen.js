var isEmergency = false;
var isStart = false;
var isAuto = false;

function change_video(numb) {
    let source = document.getElementById("source_video");
    var video_source = "./public/videos/1.mp4"
    switch (numb) {
        case 1: break;
        case 2: video_source = "./public/videos/2.mp4"; break;
        case 3: video_source = "./public/videos/3.mp4"; break;
    }
    source.src = video_source;
}

/* function reqListener() {
    console.log(this.responseText);
} */


function getEmergencyUrl() {
    var emergency_btn = document.getElementById('emergency_btn');
    isEmergency = !isEmergency;
    if (isEmergency) {
        emergency_btn.setAttribute('class', "btn btn-danger btn-block");
    }
    else {
        emergency_btn.setAttribute('class', "btn btn-outline-danger btn-block");
    }
    return isEmergency ? '/screen.html?"M_E_STOP"=1' : '/screen.html?"M_E_STOP"=0';
}

function checkStart(command) {
    var start_btn = document.getElementById('start_btn');
    var stop_btn = document.getElementById('stop_btn');

    if ((command === "start" && isStart) ||
        (command === "stop" && !isStart)) return false;

    isStart = !isStart;
    if (isStart) {
        start_btn.setAttribute('class', "btn btn-success btn-block");
        stop_btn.setAttribute('class', "btn btn-outline-danger btn-block");
    }
    else {
        start_btn.setAttribute('class', "btn btn-outline-success btn-block");
        stop_btn.setAttribute('class', "btn btn-danger btn-block");
    }
    return true;
}

function checkAuto(command) {
    var auto_btn = document.getElementById('auto_btn');
    var manual_btn = document.getElementById('manual_btn');

    if ((command === "auto" && isAuto) ||
        (command === "manual" && !isAuto)) return false;

    isAuto = !isAuto;
    if (isAuto) {
        auto_btn.setAttribute('class', "btn btn-warning btn-block");
        manual_btn.setAttribute('class', "btn btn-outline-warning btn-block");
    }
    else {
        auto_btn.setAttribute('class', "btn btn-outline-warning btn-block");
        manual_btn.setAttribute('class', "btn btn-warning btn-block");
    }
    return true;
}

function send_request(command) {
    var oReq = new XMLHttpRequest();
    var url = "";
    var prefix = "/view";

    oReq.addEventListener("load", function () { });
    switch (command) {
        case 'start': url = '/screen.html?"M_START"=1&"M_START"=0'; break;
        case 'stop': url = '/screen.html?"M_STOP"=1&"M_STOP"=0'; break;
        case 'auto': url = '/screen.html?"M_MANU"=0'; break;
        case 'manual': url = '/screen.html?"M_MANU"=1'; break;
        case 'emergency': url = getEmergencyUrl(); break;
    }

    var makeRequest = true;
    if (command === 'start' || command === 'stop') makeRequest = checkStart(command);
    if (command === 'auto' || command === 'manual') makeRequest = checkAuto(command);

    if (!makeRequest) return;

    url = prefix + url;
    oReq.open("GET", url);
    console.log(url);
    oReq.send();
}