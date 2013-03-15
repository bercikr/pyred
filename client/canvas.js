function load() {

    request('http://localhost:8989/r/pics/.json');
    draw();
}

function request(url){
    console.log(url);
    request = new XMLHttpRequest();

}

function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 100, 150);
    };
    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

}