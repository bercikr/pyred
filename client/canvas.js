var imageMap = {};
var subreddits = [ 'pics', 'food', 'aww']
var matrix = [];
var dx = -5;
var pic_x_init = -90;
var pic_y_init = 50;
var frame_iteration=0;
var hgap  = 100;
var vgap  = 100;

var canvas, context, toggle;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
   return   window.requestAnimationFrame       ||
		    window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();

function init() {
  	canvas = document.getElementById('canvas');
  	context = canvas.getContext('2d');
  	context.canvas.width  = window.innerWidth; //512;
  	context.canvas.height = window.innerHeight; //512;
}

function animate() {
	requestAnimFrame( animate );
	frame_iteration = frame_iteration + 1;	
	redraw();	
}

function redraw(){
	var iteration = frame_iteration;
  	canvas.width = canvas.width;
	//console.log("context.canvas.width: " + context.canvas.width);
	context.strokeRect(0,0,context.canvas.width, context.canvas.height);	
	for(var i=0; i < matrix.length; i++){
		drawRow(iteration, i, matrix[i]);
	}
		
}

function drawRow(iteration, column_index, image_list){
	var max_translations = context.canvas.width/dx;
	var animation_offset = pic_x_init + ( (iteration%max_translations) * dx );
	for (var i=0; i<image_list.length; i++){
		tn_src = image_list[i]['thumbnail'];
		var imageObj = new Image();
		imageObj.src = tn_src;
        var imageWidth = imageObj.clientWidth;
        var imageHeight = imageObj.clientHeight;
        var height_offset = (column_index * imageHeight) + (column_index * vgap);
        var width_offset = (imageWidth * i) + (hgap * i);
        //console.log(height_offset + " : " + width_offset);
        var pic_y = pic_y_init + height_offset;
        var pic_x = pic_x_init + width_offset + animation_offset;
        context.drawImage(imageObj, pic_x, pic_y);
	}
}

function data_load(json_url, master_list){

  $.getJSON(json_url, function(json) {
    children = json.data.children;
    var url_info_list = [];
    for(var i=0; i<children.length;i++){
        var data = children[i]['data'];
        link = data['url'];
        link = link.replace(/.jpg.*/, '');
        link = link + "s.jpg";
        var map = {};
        map['permalink'] = 'http://reddit.com/' + data['permalink'];
        map['thumbnail'] = link;
        url_info_list.push(map);
        //console.log(map);
    }
    master_list.push(url_info_list);
   });

}

function main() {
	init();
	for(var i=0; i<subreddits.length;i++){
	    data_load('cache/' + subreddits[i] + '.json', matrix);
	}

	animate();
}

