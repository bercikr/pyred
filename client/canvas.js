function load() {
    request('http://localhost:8989/r/pics/.json');
    draw();
}

function request(url){
    console.log(url);
    var request;
    var READYSTATE_COMPLETE = 4;
    if (typeof(XMLHttpRequest) == "undefined") {
        XMLHttpRequest =
            function()   {
                try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
                try { return new ActiveXObject("Msxml2.XMLHTTP"); }     catch(e) {}
                try { return new ActiveXObject("Microsoft.XMLHTTP"); }  catch(e) {}
                    throw new Error("This browser does not support XMLHttpRequest.");
            };
    }

}

function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 100, 150);
    };
    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
};