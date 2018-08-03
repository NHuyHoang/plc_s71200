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

function reqListener () {
    console.log(this.responseText);
  }

function send_request() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", '/view/screen.html?"M_START"=1&"M_START"=0');
    oReq.send();
}