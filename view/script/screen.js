var isEmergency = false;
var isStart = false;
var isAuto = true;

var isLightOn = false;
var isFogOn = false;
var isSunClose = false;
var isDoorOpen = false;
var isCoolPadOpen = false;

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


function checkLight(command) {
    var light_on = document.getElementById('light_on');
    var light_off = document.getElementById('light_off');

    if ((command === "light_on" && isLightOn) ||
        (command === "light_off" && !isLightOn)) return false;

    isLightOn = !isLightOn;
    if (isLightOn) {
        light_on.setAttribute('class', "btn btn-success btn-block");
        light_off.setAttribute('class', "btn btn-outline-danger btn-block");
    }
    else {
        light_on.setAttribute('class', "btn btn-outline-success btn-block");
        light_off.setAttribute('class', "btn btn-danger btn-block");
    }
    return true;
}

function checkManual(command, command1, command2, memory) {

    console.log(command, command1, command2, memory);
    var a = document.getElementById(command1);
    var b = document.getElementById(command2);

    if ((command === command1 && memory) ||
        (command === command2 && !memory)) return memory;

    memory = !memory;
    if (memory) {
        a.setAttribute('class', "btn btn-success btn-block");
        b.setAttribute('class', "btn btn-outline-danger btn-block");
    }
    else {
        a.setAttribute('class', "btn btn-outline-success btn-block");
        b.setAttribute('class', "btn btn-danger btn-block");
    }
    return memory;
}


function send_request(command) {
    var oReq = new XMLHttpRequest();
    var url = "";
    var prefix = "/awp";

    oReq.addEventListener("load", function () { });
    switch (command) {
        case 'start': url = '/screen.html?"M_START"=1&"M_START"=0'; break;
        case 'stop': url = '/screen.html?"M_STOP"=1&"M_STOP"=0'; break;
        case 'auto': url = '/screen.html?"M_MANU"=0'; break;
        case 'manual': url = '/screen.html?"M_MANU"=1'; break;
        case 'emergency': url = getEmergencyUrl(); break;

        case 'light_on': url = '/screen.html?"M_MANU_DONG_K0"=1&"M_MANU_MO_K0"=0'; break;
        case 'light_off': url = '/screen.html?"M_MANU_MO_K0"=1&"M_MANU_DONG_K0"=0'; break;
        case 'fog_on': url = '/screen.html?"M_MANU_DONG_K1"=1&"M_MANU_MO_K1"=0'; break;
        case 'fog_off': url = '/screen.html?"M_MANU_MO_K1"=1&"M_MANU_DONG_K1"=0'; break;
        case 'sun_close': url = '/screen.html?"M_MANU_DONG_K2"=1&"M_MANU_DONG_K2"=0'; break;
        case 'sun_open': url = '/screen.html?"M_MANU_DONG_K3"=1&"M_MANU_DONG_K3"=0'; break;
        case 'door_open': url = '/screen.html?"M_MANU_DONG_K4"=1&"M_MANU_MO_K4"=0'; break;
        case 'door_close': url = '/screen.html?"M_MANU_MO_K4"=1&"M_MANU_DONG_K4"=0'; break;
        case 'coolpad_open': url = '/screen.html?"M_MANU_DONG_K5"=1&"M_MANU_MO_K5"=0'; break;
        case 'coolpad_close': url = '/screen.html?"M_MANU_MO_K5"=1&"M_MANU_DONG_K5"=0'; break;
    }

    var makeRequest = true;
    if (command === 'start' || command === 'stop') makeRequest = checkStart(command);
    if (command === 'auto' || command === 'manual') makeRequest = checkAuto(command);


    if (command === 'light_on' || command === 'light_off') isLightOn = checkManual(command, 'light_on', 'light_off', isLightOn);
    if (command === 'fog_on' || command === 'fog_off') isFogOn = checkManual(command, 'fog_on', 'fog_off', isFogOn);
    //if (command === 'sun_close' || command === 'sun_open') isSunClose = checkManual(command, 'sun_close', 'sun_open', isSunClose);
    if (command === 'door_open' || command === 'door_close') isDoorOpen = checkManual(command, 'door_open', 'door_close', isDoorOpen);
    if (command === 'coolpad_open' || command === 'coolpad_close') isCoolPadOpen = checkManual(command, 'coolpad_open', 'coolpad_close', isCoolPadOpen);

    if (!makeRequest) return;

    url = prefix + url;
    oReq.open("GET", url);
    console.log(url);
    oReq.send();
}