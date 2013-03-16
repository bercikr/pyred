function load() {
    //request('http://localhost:8989/r/pics/.json');
    request('nada')
    draw();
}

function request(url){
  $.getJSON('test.json', function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push('<li id="' + key + '">' + val + '</li>');
    });

    $('<ul/>', {
      'class': 'my-new-list',
      html: items.join('')
    }).appendTo('body');
  });
}

function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 100, 150);
        context.drawImage(imageObj, 200, 300);

    };
    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';


};