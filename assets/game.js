
var totalAssetCount = 0, loadedAssetCount = 0, gameSpeed = 15;
var canvas, ctx , scaleRatio = 1;
var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};
var _isMobile = isMobile.any();
var topCanvas = document.createElement("CANVAS");
var testing = false, lvlText = "";
var waiting = false, moving = false, overAlpha = 0;
var curLvl =0,
lvls = [
	"ball-96-128-28-end-280-500-128-32-0-block-64-192-224-64-block-352-128-64-288-block-0-320-224-64-spike-288-128-64-64",
	"ball-64-288-30-end-320-480-160-32-0-block-0-384-256-64-block-320-160-64-288-block-0-0-384-64-block-448-0-64-448-spike-288-256-0-0-spike-192-192-128-64",
	"ball-64-96-14-end-448-448-128-32-0-block-0-160-224-32-block-32-224-224-32-block-224-288-32-32-block-224-352-224-32-block-288-224-32-96-block-288-0-32-192-block-512-128-32-128-block-160-288-32-192",
	"ball-288-128-16-end-544-512-64-64-0-block-128-384-384-32-block-224-192-128-128-block-128-96-32-256-block-480-96-32-256-block-384-32-32-224-spike-416-288-0-0-spike-384-288-96-32-block-224-96-128-32-block-544-160-32-320-block-32-128-32-96-block-96-448-160-32-block-0-544-96-32-spike-64-352-32-0-spike-96-384-0-0-spike-64-352-0-0-spike-32-384-0-0-spike-32-384-0-0-spike-32-352-0-32-spike-32-384-0-0-spike-64-352-32-32-block-32-352-32-128-block-32-32-352-32-block-0-256-96-64-block-480-416-32-96",
	"ball-160-128-16-end-320-96-32-128-1-block-0-0-160-32-block-0-32-32-128-block-96-160-96-32-block-192-64-32-128-block-192-0-32-32-block-64-64-96-64-block-256-32-32-224-block-96-224-128-64-block-96-416-192-32-block-64-224-32-32-block-96-320-128-64-block-0-224-64-32-block-32-256-32-32-block-0-256-32-64-block-0-320-32-128-block-320-0-192-32-block-320-0-128-32-block-0-512-544-32-block-0-480-544-32-block-512-448-32-32-block-416-64-128-32-block-448-96-96-32-block-480-128-64-32-block-512-160-32-32-block-384-384-64-32-block-352-256-128-128",
	"ball-32-96-14-end-480-512-64-32-0-block-288-128-32-224-block-192-128-32-256-block-192-32-256-32-block-96-416-224-32-block-32-288-96-32-block-64-352-32-32-block-96-32-32-224-block-384-128-32-160-block-416-320-96-96-block-544-320-32-160-block-448-192-96-32-block-448-256-96-32-block-480-32-32-96-block-544-288-32-32",
	"ball-0-330-14-end-160-0-288-32-1-block-180-210-180-30-block-150-270-300-30-block-30-540-210-30-block-330-450-30-120-block-150-420-120-30-block-300-360-60-60-block-390-330-30-90-block-390-450-30-150-block-30-390-30-60-block-60-420-30-30-block-0-390-30-60-block-0-360-30-30-block-60-330-210-30-block-120-420-30-30-block-510-0-90-30-block-540-30-60-30-block-570-60-30-30-block-480-330-90-30-block-480-390-30-180-block-450-330-30-30-block-510-210-90-30-block-120-30-30-90-block-120-150-30-90-block-0-90-60-30-block-210-120-90-30-block-210-60-210-30-block-420-120-30-90-block-360-150-30-30-block-540-570-30-30-block-570-540-30-30-block-570-570-30-30-block-0-0-30-30-block-0-180-30-90-block-0-270-150-30-block-300-300-60-60",
	"ball-100-40-8-end-320-560-140-20-0-block-60-60-240-20-block-160-40-20-20-block-220-80-20-60-block-0-100-60-20-block-0-0-60-20-block-0-20-40-20-block-0-40-20-20-block-440-0-160-20-block-460-20-120-20-block-580-20-20-20-block-480-20-120-40-block-500-60-100-20-block-520-80-80-20-block-540-100-60-20-block-560-120-40-20-block-580-140-20-20-block-360-100-120-20-block-480-100-20-20-block-480-140-60-20-spike-500-120-20-20-block-300-140-20-20-block-160-160-200-20-block-0-140-20-160-block-20-220-60-20-block-100-200-20-60-block-340-20-80-20-block-360-40-20-20-block-0-320-140-20-block-140-220-20-220-block-160-380-60-20-block-160-260-60-20-block-280-220-200-20-block-560-540-40-40-block-540-560-20-20-block-520-580-20-20-block-540-580-60-20-block-580-520-20-20-block-300-340-100-20-block-460-300-20-180-block-200-440-180-20-block-340-320-20-120-block-380-440-20-20-block-540-260-20-220-block-40-520-60-60-block-120-540-40-40-block-20-440-100-20-block-60-480-280-20-block-420-400-20-100-block-360-260-40-20-block-240-320-20-40-block-380-300-60-20",
	"ball-40-60-8-end-580-260-20-80-0-block-60-20-20-260-block-120-0-180-20-block-160-100-220-20-block-40-180-20-20-block-0-120-40-20-block-80-440-200-20-block-120-400-20-40-block-20-580-220-20-block-0-580-20-20-block-100-500-20-80-block-40-360-60-20-block-60-340-20-20-block-180-240-80-20-block-120-300-40-20-block-160-180-20-200-block-200-60-20-40-block-280-120-20-60-block-260-300-140-20-block-320-240-20-60-block-340-320-20-220-block-220-500-120-20-block-360-400-100-20-block-420-40-20-220-block-360-200-60-20-block-400-60-20-20-block-460-360-20-140-block-540-200-20-80-block-540-300-20-80-block-500-180-20-100-block-500-300-20-40-block-500-440-80-20-block-520-460-40-140-block-420-540-60-20-block-440-560-20-40-block-340-580-20-20-block-320-560-60-20-block-520-0-40-100-block-500-100-80-40-spike-260-280-20-20-spike-440-280-0-0-spike-420-260-20-20-block-440-320-60-20-block-440-300-60-20",
	"ball-300-300-8-end-340-40-40-20-1-block-240-240-40-20-block-300-240-40-20-block-320-320-20-20-block-300-320-20-20-block-240-320-40-20-block-240-260-20-20-block-220-340-20-40-block-200-360-20-40-block-340-340-20-40-block-360-360-20-40-block-380-380-20-40-block-400-400-20-40-block-340-200-20-40-block-360-180-20-40-block-380-160-20-40-block-400-140-20-40-block-220-200-20-40-block-200-180-20-40-block-180-160-20-40-block-160-140-20-40-block-240-80-60-20-block-200-160-80-20-block-120-60-100-20-block-80-240-160-20-block-60-100-20-260-block-80-180-40-20-block-140-260-20-40-block-320-260-20-20-block-340-260-140-20-block-480-100-20-300-block-400-280-20-40-block-460-380-20-20-block-500-380-40-20-block-280-480-160-20-block-100-540-220-20-block-180-500-20-40-block-0-400-80-20-block-40-420-20-100-block-60-460-60-20-block-240-440-20-20-block-320-520-20-60-block-200-520-20-20-block-400-0-200-20-block-420-20-20-40-block-320-120-20-20-block-420-140-60-20-block-560-480-40-120-block-480-560-40-40-block-520-520-40-80-spike-420-320-0-0-spike-400-320-20-20-spike-420-440-0-0-spike-400-440-20-20-spike-180-520-0-0-spike-160-520-20-20-block-240-300-20-20-block-300-260-20-20-spike-400-380-20-20-block-280-320-20-20-block-240-280-20-20-block-220-40-20-80-block-300-40-20-200-block-300-20-20-20-block-220-20-20-20-block-20-300-40-20-block-220-0-20-20-block-140-560-20-40-block-320-280-20-20-block-200-400-20-40-block-220-420-20-40-block-220-380-20-40-block-240-340-20-100-block-260-340-20-160-block-320-300-20-20"
];
document.body.appendChild(topCanvas);

canvas = document.getElementById("gameCanvas");
canvas.width = 1000;
canvas.height = 600;
canvas.center={
	x: canvas.width/2,
	y: canvas.height/2
};
ctx = canvas.getContext("2d");

var mouse={
	x: canvas.width/2,
	y: canvas.height/2,

	previousX: 0,
	previousY: 0
};

var mouseDown = false;
var mouseClick = false;
document.addEventListener(_isMobile? "touchstart" : "mousedown", function(e){
	e.preventDefault();
	mouse.previousX = mouse.x;
	mouse.previousY = mouse.y;
	var __x = _isMobile? e.targetTouches[0].pageX : e.pageX,
	 __y = _isMobile? e.targetTouches[0].pageY : e.pageY;
	mouse.x = Math.min(canvas.width/ scaleRatio, Math.max(__x - parseInt(canvas.style.left,10), 0)) * scaleRatio;
	mouse.y = Math.min(canvas.height/ scaleRatio, Math.max(__y - parseInt(canvas.style.top,10), 0)) * scaleRatio;

	mouseClick = true;
	if (typeof(mouseClearInterval)!="undefined"){
		window.clearInterval(mouseClearInterval);
	}
	mouseClearInterval = window.setTimeout(function(){mouseClick = false;}, gameSpeed);
	mouseDown = true;
});
document.addEventListener(_isMobile? "touchend" :"mouseup", function(){
		//alert(mouseClick + " " + mouseDown);
		mouseDown = false;
		mouseClick = false;
});


document.addEventListener("load" , preload());

document.onload = function(e){
    mouse.x = Math.min(canvas.width, Math.max(e.pageX - parseInt(canvas.style.left,10), 0));
    mouse.y = Math.min(canvas.height, Math.max(e.pageY - parseInt(canvas.style.top,10), 0));
}
document.addEventListener (_isMobile? "touchmove" : "mousemove", function(e){
		e.preventDefault();
		mouse.previousX = mouse.x;
		mouse.previousY = mouse.y;
		var __x = _isMobile? e.targetTouches[0].pageX : e.pageX,
		 __y = _isMobile? e.targetTouches[0].pageY : e.pageY;
    mouse.x = Math.min(canvas.width/ scaleRatio, Math.max(__x - parseInt(canvas.style.left,10), 0)) * scaleRatio;
    mouse.y = Math.min(canvas.height/ scaleRatio, Math.max(__y - parseInt(canvas.style.top,10), 0)) * scaleRatio;

});
var par = document.getElementById("displayText");
var sprs = [];

function vct(_x,_y){
	var self = this;
	self.x = _x;
	self.y = _y;
}

function r_vct(_x,_y){
	var self = this;
	self.x = _y;
	self.y = _x;
}
function image(src, width, height){
	totalAssetCount++;
	var myImg = new Image();
	myImg.src = src;
	myImg.width = width;
	myImg.height = height;
	myImg.addEventListener("load" , function(){
		loadedAssetCount++;
		console.log("an asset loaded");
	});
	return myImg;
}

function preload(){

	//Loading assets and whatever code that should run before the game start goes here
	console.log("preload started");
	var imgs = {//Add game assets here
	};

	var preloadCheckInterval = window.setInterval(function(){
		//Loader is displayed here
		ctx.fillStyle = canvas.style.bacgroundColor;
		ctx.fillRect(0,0,canvas.width, canvas.height);
		var w=400;
		ctx.fillStyle = "#d8d8d8";
		ctx.fillRect(canvas.width/2-w/2,canvas.height*5/6,w,5);
		ctx.fillStyle = "#dd8822";
		ctx.fillRect(canvas.width/2-w/2,canvas.height*5/6,w*loadedAssetCount/totalAssetCount,5);
		if(loadedAssetCount >= totalAssetCount){
			ctx.clearRect(0,0,canvas.width, canvas.height);
			window.clearInterval(preloadCheckInterval);
			//Game just finished loading
			startGame();
		}
	} , 50);

	function startGame(){

		var rooms = [
			"rmMenu",
			"rmGame",
			"rmTest",
		];
		var roomId = 0;
		var sPath = window.location.pathname;
		var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
		if(sPage == "test.html"){
			testing = true;
			lvlText = readURL("lvl");
			roomId = 2;
		}
		var roomStarted = false;
		var world;

		var box ={
			create: function(){
				sprs.push(box);
			},
			position: {
				x: canvas.width/2 - 300,
				y: canvas.height/2 - 300
			},
			width: 600,
			height: 600,
			rot: 0,
			targetRot: 0,
			atEnd: false,
			drawBack: function(){
				ctx.beginPath();
				ctx.fillStyle = "rgb(40, 50, 62)";
				q.gfx.drawFixedRect({x: box.position.x + box.width/2, y: box.position.y + box.height/2}, box.width, box.height, box.rot);
				ctx.closePath();
			},
			update: function(){
				if(rooms[roomId]=="rmGame"  || rooms[roomId]=="rmTest"){
					box.position ={
							x: canvas.width/2 - 300,
							y: canvas.height/2 - 300
					};
				}
				if(box.targetRot >= Math.PI*2){box.rot -= Math.PI*2; box.targetRot -= Math.PI*2;}
				else if(box.targetRot < 0){box.rot += Math.PI*2; box.targetRot += Math.PI*2;}
				if(box.targetRot > box.rot){
					box.rotating = true;
					box.rotAmount = Math.min(0.2, box.targetRot-box.rot);
					box.rot +=box.rotAmount;
				}else if(box.targetRot < box.rot){
					box.rotating = true;
					box.rotAmount = Math.max(-0.2, box.targetRot-box.rot);
					box.rot +=box.rotAmount;
				}else{
					 box.rotating = false;
				}
				if(rooms[roomId] == "rmGame"|| rooms[roomId]=="rmTest"){
					ctx.globalAlpha = overAlpha;
				
					ctx.fillStyle = "#232628";
					ctx.fillRect(box.position.x + box.width, 0, 8, 600);
					ctx.fillRect(box.position.x -8, 0, 8, 600);

					ctx.fillStyle = "#5B636A";
					ctx.fillRect(box.position.x + box.width+8,0,(canvas.width - 616)/2, 600);
					ctx.fillRect(0,0,(canvas.width - 616)/2, 600);

					ctx.fillStyle = "#BFC6CC";
					ctx.fillRect(box.position.x + box.width+8, 0,(canvas.width - 616)/2, 130);
					ctx.fillRect(0,0,(canvas.width - 616)/2, 130);
					ctx.fillRect(box.position.x + box.width+8, 500,(canvas.width - 616)/2, 115);
					ctx.fillRect(0,500,(canvas.width - 616)/2, 115);

					ctx.fillStyle = "#9BA1A5";
					ctx.fillRect(box.position.x + box.width+8, 114,(canvas.width - 616)/2, 13);
					ctx.fillRect(0,114,(canvas.width - 616)/2, 13);
					ctx.fillRect(box.position.x + box.width+8, 501,(canvas.width - 616)/2, 13);
					ctx.fillRect(0,501,(canvas.width - 616)/2, 13);

					ctx.fillStyle = "#3F4549";
					ctx.fillRect(box.position.x + box.width+8, 128,(canvas.width - 616)/2, 7);
					ctx.fillRect(0,128,(canvas.width - 616)/2, 7);
					ctx.fillRect(box.position.x + box.width+8, 493,(canvas.width - 616)/2, 7);
					ctx.fillRect(0,493,(canvas.width - 616)/2, 7);



					ctx.fillStyle = "rgba(56, 57, 59, 0.66)";
					ctx.fillRect(box.position.x + box.width+8, 0, 8, 600);
					ctx.fillRect(box.position.x -16, 0, 8, 600);

				}
					var brush = {fill: true, color:"rgb(255, 0, 0)"},
					pen = {outline:false};
					var _x = box.position.x+ box.width/2- box.width/2* Math.cos(box.rot),
					_y=  box.position.y + box.height/2 -box.height/2  * Math.sin(box.rot);
					q.gfx.drawCircle({x:_x, y:_y}, 3, brush, pen);
			}
		};

		{//OBJECTS DEFINED HERE
		{//[OBJECT] parObst
			function parObst(position, width, height, rot){
				var self = this;
				self.oPos={
					x: position.x,
					y: position.y
				}
				self.name = "parObst";
				self.position = position;
				self.width = width;
				self.height = height;
				self.rot = rot;
				self.img = rectShape;
				
			}
			parObst.prototype.create = function(){
				var self = this;
				sprs.push(self);
			}
			parObst.prototype.update = function(){
				var self = this;
				self.position = q.mth.rotateAbout({x:self.oPos.x, y:self.oPos.y}, {x:box.width/2, y: box.height/2}, self.rot + box.rot);
				self.drawSelf();
			}
			parObst.prototype.drawSelf = function(){
				var self = this;
				self.position.x += box.position.x;
				self.position.y += box.position.y;
				
				
				ctx.fillStyle = "#00ff00";
				ctx.translate(self.position.x, self.position.y);
				ctx.rotate(self.rot + box.rot);
				//ctx.fillRect(0, 0, self.width, self.height);
				//ctx.drawImage(self.img, 0, 0, self.width, self.height);
				ctx.fillStyle = "#5059D7";
				ctx.strokeStyle = "#233279";
				q.gfx.roundRect(ctx,0, 0, self.width, self.height, 6, true, true);
				ctx.fillStyle = "#7C82E1";
				q.gfx.roundRect(ctx,5, 5, self.width-10, self.height-10, 6, true, false);
				ctx.rotate(-self.rot - box.rot);
				ctx.translate(-self.position.x, -self.position.y);
				
				ctx.fillStyle = "#ff0000";
				//q.gfx.drawText(self.position, self.rot + box.rot);
				
				ctx.fillStyle = "#ff0000";
				var _w = Math.max(self.width, self.height),
				_h = Math.min(self.width, self.height);
				var _pos = {
					x: self.position.x,
					y: self.position.y
				};
				switch(self.rot+box.rot % (Math.PI*2) ){
					case Math.PI/2:
					_pos = {
						x: self.position.x - self.height,
						y: self.position.y
					};	
					_w = self.height;
					_h = self.width;
					break;
					case Math.PI:
					_pos = {
						x: self.position.x - self.width,
						y: self.position.y - self.height
					};						
					_w = self.width;
					_h = self.height;
					break;
					case 3*Math.PI/2:
					_pos = {
						x: self.position.x,
						y: self.position.y - self.width
					};						
					_w = self.height;
					_h = self.width;
					
					break;
				}
				
				self.position.x -= box.position.x;
				self.position.y -= box.position.y;
				
			}
		}
	
		{//[OBJECT] parBall
			function parBall(position, radius){
				var self = this;
				self.name = "parBall";
				self.position = position;
				self.radius = Math.min(40,radius);
				self.width = self.radius*2;
				self.height = self.radius*2;
				self.hSpd = 0;
				self.vSpd = 0;
				self.maxSpd = 16;
				self.gravDir = q.mth.d2r(270);
				self.grav = 10;
				self.brush = {fill: true, color:"#C5322D"};
				self.pen = {outline: true, color:"#8C2020",  width:4};
				self.highlightBrush = {fill: true, color:"#D75550"}
				self.highlightPen = {outline: false};
				self.seated = false;
				self.winTimeout = null;
			}
			parBall.prototype.win = function(){
				var self = this;
				q.gm.roomDestruct();
				curLvl++;
				roomStarted = false;
				box.targetRot = box.rot = 0;
			}
			parBall.prototype.create = function(){
				var self = this;
				box.atEnd = false;
				self.winTimeout = null;
				sprs.push(self);
			}
			parBall.prototype.collisionCheck = function(){
				var self = this;
				//collision with obstacles
				self.atEnd = false;
				self.seated = false;
				for(var i=0; i<sprs.length; i++){
					var other = sprs[i],
					_hSpd =  q.mth.lengthDirX(self.grav, self.gravDir),
					_vSpd =  q.mth.lengthDirY(self.grav, self.gravDir);
					if(other.name =="parObst" || other.name =="parEnd" || other.name == "parSpike"){
					
						var _pos = {
							x: other.position.x,
							y: other.position.y
						},
						_w = other.width,
						_h = other.height;
						switch(other.rot+box.rot % (Math.PI*2) ){
							case Math.PI/2:
							_pos = {
								x: other.position.x - other.height,
								y: other.position.y
							};	
							_w = other.height;
							_h = other.width;
							break;
							case Math.PI:
							_pos = {
								x: other.position.x - other.width,
								y: other.position.y - other.height
							};						
							_w = other.width;
							_h = other.height;
							break;
							case 3*Math.PI/2:
							_pos = {
								x: other.position.x,
								y: other.position.y - other.width
							};						
							_w = other.height;
							_h = other.width;
							
							break;
						}
						/*
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(_pos.x + other.tX, _pos.y +other.tY, 5,5);
				ctx.fillStyle = "#ffff00";
				ctx.fillRect(_pos.x +other.tW, _pos.y +other.tH, 5,5);
								if(!box.rotating && other.name == "parEnd" &&
								q.mth.rectCollidesRect({x:self.position.x-box.position.x, y:self.position.y+self.vSpd-box.position.y}, self.width, self.height+self.vSpd, {x:_pos.x+other.tX, y:_pos.y+other.tY}, Math.floor(other.tW),Math.floor(other.tH))){
							
									self.win();
								}
						ctx.fillRect(self.position.x, self.position.y, 5,5);*/
						//q.gfx.drawText(self.position, self.vSpd);
						if(q.mth.rectCollidesRect({x:self.position.x, y:self.position.y+self.vSpd}, self.width, self.height+self.vSpd, _pos, Math.floor(_w),Math.floor(_h))){
							if(other.name =="parObst" || other.name =="parEnd"){
								if(other.name == "parEnd"){
									self.win();
								}
								self.seated= true;
								self.position.y =_pos.y- self.height-1;
								self.hSpd = 0;
								self.vSpd =0;
							}
							else if(other.name == "parSpike"){
								console.log("koko lose");
								q.gm.roomDestruct();
								box.targetRot = box.rot = 0;
								roomStarted = false;
							}
						}
					}
				}
			}

			parBall.prototype.update = function(){
				var self = this;
				
				self.width = self.radius*2;
				self.height = self.radius*2;

				//jump to mouse
				//if(mouseDown && q.mth.withinRect(mouse, box.position, box.width, box.height))self.position = {x:mouse.x-box.position.x,y:mouse.y-box.position.y};

				if(box.rotating)
				{
					var rot = box.rotAmount;
					var s = Math.sin(rot),
					c = Math.cos(rot);
					self.position.x += self.width/2;
					self.position.y += self.height/2;
					self.position.x -= box.width/2;
					self.position.y -= box.height/2;
					var newX = (self.position.x * c - self.position.y * s),
					newY = (self.position.x * s + self.position.y * c);
					self.position.x = newX + box.width/2;
					self.position.y = newY + box.height/2;
					self.position.x -= self.width/2;
					self.position.y -= self.height/2;

				}
				if(!box.rotating && ! mouseDown){
						self.position.x += self.hSpd;
						self.position.y += self.vSpd;
						//console.log(self.vSpd);
						if( Math.abs( self.vSpd ) < 1 )self.vSpd =0;

					if(self.position.x<=1)self.position.x = 1;
					if(self.position.x>=box.width - self.width-1)self.position.x = box.width - self.width -1;
					if(self.position.y>=box.height - self.height-1)self.position.y = box.height - self.height -1;
					if(self.position.y<=1)self.position.y = 1 ;

					self.seated = false;


					self.position.x = Math.round(self.position.x);
					self.position.y = Math.round(self.position.y);

					var cPosX = self.position.x + self.hSpd + q.mth.lengthDirX(1, self.gravDir),
					cPosY = self.position.y + self.vSpd + q.mth.lengthDirY(1, self.gravDir) ;

					if (cPosY> box.height - self.height){
							self.position.y = box.height - self.height;
							self.hSpd = 0;
							self.vSpd = 0;
					}else if(!self.seated && cPosY< box.height - self.height){
						self.hSpd += (self.hSpd > self.maxSpd)? 0 : q.mth.lengthDirX(self.grav, self.gravDir);
						self.vSpd += (self.vSpd > self.maxSpd)? 0 : q.mth.lengthDirY(self.grav, self.gravDir);
					}
					self.collisionCheck();
				}
				//q.gfx.drawText(box.position, "Mouse is "+/* Math.round(mouse.x) + " " + Math.round(mouse.y));*/(mouseDown? "Down" : " ") + (mouseClick? "Clicked" : " "));

				
				
				//translate then draw
				self.position.x += box.position.x;
				self.position.y += box.position.y;
				
				q.gfx.drawCircle({x:self.position.x+ self.width/2, y:self.position.y+self.height/2}, self.radius-1, self.brush, self.pen);
				q.gfx.drawCircle({x:self.position.x+self.height/2+3, y:self.position.y+self.height/2-3}, Math.max(1,self.radius -10), self.highlightBrush, self.highlightPen);
				
				
				/*ctx.fillStyle = "#f0f5f8";
				ctx.fillRect(self.position.x, self.position.y, self.width,self.height);*/
				
				self.position.x -= box.position.x;
				self.position.y -= box.position.y;
				
			}
		}

		{//[OBJECT] parSpike
			function parSpike(position, width, height,rot){
				var self = new parObst(position, width,height,rot);
				self.name = "parSpike";
				self.drawSelf = function(){
					var self = this;
					self.position.x += box.position.x;
					self.position.y += box.position.y;
					
					ctx.fillStyle = "#ff0000";
					ctx.translate(self.position.x, self.position.y);
					ctx.rotate(self.rot + box.rot);
					ctx.fillRect(0, 0, self.width, self.height);
					ctx.rotate(-self.rot - box.rot);
					ctx.translate(-self.position.x, -self.position.y);
					
					self.position.x -= box.position.x;
					self.position.y -= box.position.y;
				}
				return self;
				
			}
		}

		{//[OBJECT] parBtn
			function parBtn(position, width, height, image, text){
				var self = this;
				self.name = "parBtn";
				self.position = position;
				self.width = width;
				self.height = height;
				self.img = image;
				self.text = text;
			}
			parBtn.prototype.click = function(){

			};
			parBtn.prototype.create = function(){
				var self = this;
				sprs.push(self);
			};
			parBtn.prototype.xtraUpdate = function(){

			};
			parBtn.prototype.update = function(){
				var self = this;
				self.drawSelf();
				ctx.fillStyle = "#ff0f00";
				ctx.fillRect(self.position.x, self.position.y, 5,5);
				ctx.fillRect(self.position.x+ self.width, self.position.y+ self.height, 5,5);
				self.xtraUpdate();
				if (mouse.x > self.position.x && mouse.x < self.position.x + self.width && 
					mouse.y > self.position.y && mouse.y < self.position.y + self.height){
					if(mouseClick)
						self.click();
				}
				//q.gfx.drawText(self.position,self.position.x + " " + self.position.y);
			};
			parBtn.prototype.drawSelf = function(){
				var self = this;
				if(self.img != null){
					q.gfx.drawImage(self.img, self.position.x, self.position.y);
				}else{
					ctx.fillStyle = "rgb(33, 19, 0)";
					ctx.fillRect(self.position.x-4, self.position.y-4, self.width+8, self.height+8);
					ctx.fillStyle = "rgb(214, 139, 40)";
					ctx.fillRect(self.position.x, self.position.y, self.width, self.height);
					ctx.fillStyle = "rgb(180, 232, 255)";
					q.gfx.drawText({x:self.position.x+5, y: self.position.y+20}, self.text);
				}
			}

		}

		{//[OBJECT] parEnd
			function parEnd(position, width, height,facing){
				var self = new parObst(position, width, height, 0);
				self.name = "parEnd";
				self.img = endShape;
				self.facing = facing;
				self.tX =0;
				self.tY = 0;
				self.tW = self.width;
				self.tH = self.height;
				self.create = function(){
					sprs.push(self);
					var myObst1 ,myObst2, myObst3;
					switch(self.facing){
						case 0:
							if(self.width > self.height){
								myObst1 = new parObst({x:self.position.x-20, y:self.position.y}, 20,self.height,0);
								myObst2 = new parObst({x:self.position.x+self.width, y:self.position.y}, 20,self.height,0);
								myObst3 = new parObst({x:self.position.x, y:self.position.y+self.height}, self.width,20,0);
								myObst1.create();
								myObst2.create();
								myObst3.create();
							}else{
								myObst1 = new parObst({x:self.position.x, y:self.position.y-20}, self.width,20,0);
								myObst2 = new parObst({x:self.position.x, y:self.position.y+self.height}, self.width,20,0);
								myObst3 = new parObst({x:self.position.x+self.width, y:self.position.y}, 20,self.height,0);
								myObst1.create();
								myObst2.create();
								myObst3.create();
							}
						break;
						
						case 1:
							if(self.width > self.height){
								myObst1 = new parObst({x:self.position.x-20, y:self.position.y}, 20,self.height,0);
								myObst2 = new parObst({x:self.position.x+self.width, y:self.position.y}, 20,self.height,0);
								myObst3 = new parObst({x:self.position.x, y:self.position.y-20}, self.width,20,0);
								myObst1.create();
								myObst2.create();
								myObst3.create();
							}else{
								myObst1 = new parObst({x:self.position.x, y:self.position.y-20}, self.width,20,0);
								myObst2 = new parObst({x:self.position.x, y:self.position.y+self.height}, self.width,20,0);
								myObst3 = new parObst({x:self.position.x-20, y:self.position.y}, 20,self.height,0);
								myObst1.create();
								myObst2.create();
								myObst3.create();
							}
						break;
					}
				};
				self.drawSelf = function(){
					var self = this;
					self.position.x += box.position.x;
					self.position.y += box.position.y;
					
					ctx.translate(self.position.x, self.position.y);
					ctx.rotate(self.rot + box.rot);
					var _xScl , _yScl;
					switch(self.facing){
						case 0:
							if(self.width > self.height){
								self.img = endShape;
								self.tX = 0;
								self.tY = 0;
								self.tW = self.width ;
								self.tH = (self.width)/self.img.width*self.img.height;
								_xScl = 1, _yScl =1;
							}else{
								self.img = endShapeVer;
								self.tX = 0;
								self.tY = 0;
								self.tH = self.height;
								self.tW = (self.height)/self.img.height*self.img.width;
								_xScl = 1, _yScl =1;
							}
						break;
						
						case 1:
							if(self.width > self.height){
								self.img = endShapeFlip;
								self.tX = 0;
								self.tY = 0;
								self.tW = self.width ;
								self.tH = (self.width)/self.img.width*self.img.height;
								_xScl = 1, _yScl =-1;
							}else{
								self.img = endShapeVerFlip;
								self.tX = 0;
								self.tY = 0;
								self.tH = self.height;
								self.tW = (self.height)/self.img.height*self.img.width;
								_xScl = -1, _yScl = 1;
							}
						break;
					}
					ctx.drawImage(self.img, self.tX,self.tY,self.width, self.height);
					
					//ctx.fillStyle = "#98B100";
					//ctx.fillRect(0, 0, self.width, self.height);
					//ctx.fillStyle = "#ffffff";
					//ctx.fillRect(self.tX,self.tY, self.tW, self.tH);
					
					ctx.rotate(-self.rot - box.rot);
					ctx.translate(-self.position.x, -self.position.y);
					
					self.position.x -= box.position.x;
					self.position.y -= box.position.y;
				}
				return self;
			}
		}
		
		}//OBJECT DEFINITION END HERE!!!!!!!!

		{//DEFINE SOME SHAPES AND PATTERNS , SMOOTHE THEM AND CREATE IMAGE DATA FROM THEM

				{//[SHAPE] arrowShape , arrowShapeFlip
					var pos = {x:200, y: 200 },
					verts = [
						new vct(80,183-183),
						new vct(117,183-158),
						new vct(117,183-144),
						new vct(111,183-139),
						new vct(89,183-114),
						new vct(84,183-100),
						new vct(83,183-88),
						new vct(108,183-82),
						new vct(111,183-81),
						new vct(112,183-66),
						new vct(105,183-60),
						new vct(87,183-39),
						new vct(79,183-20),
						new vct(78,183-4),
						new vct(74,183-0),
						new vct(68,183-1),
						new vct(47,183-17),
						new vct(25,183-41),
						new vct(2,183-81),
						new vct(0,183-105),
						new vct(5,183-107),
						new vct(14,183-106),
						new vct(32,183-98),
						new vct(34,183-118),
						new vct(46,183-147),
						new vct(54,183-168),
						new vct(70,183-182)
						];
					var myBrush = {fill: true, color: "rgb(208, 111, 14)"},
					myPen = {outline: true, color: "rgb(110, 49, 0)", width:5};
					arrowShape = q.gfx.createShape(verts, true, true, myBrush, myPen, 0, 0, 0, 120,184),
				  arrowShapeFlip = q.gfx.createShape(verts, true, true, myBrush, myPen, 1, 0, 0, 120,184);
				}

				{//[SHAPE] endShape
					var pos = {x:200, y: 200 },
					verts = [
						new vct(0,47),
						new vct(83,0),
						new vct(106,18),
						new vct(140,24),
						new vct(176,18),
						new vct(200,0),
						new vct(280,47),
						];
					var myBrush = {fill: true, color:"rgb(152, 177, 0)"},
					myPen = {outline: true, color: "rgb(5, 130, 55)", width:5};
					endShape = q.gfx.createShape(verts, true, true, myBrush, myPen, 0, 0, 0, 280,47);
				}

				{//[SHAPE] endShapeFlip
					var pos = {x:200, y: 200 },
					verts = [
						new vct(0,0),
						new vct(83,47),
						new vct(106,29),
						new vct(140,23),
						new vct(176,29),
						new vct(200,47),
						new vct(280,0),
						];
					var myBrush = {fill: true, color:"rgb(152, 177, 0)"},
					myPen = {outline: true, color: "rgb(5, 130, 55)", width:5};
					endShapeFlip = q.gfx.createShape(verts, true, true, myBrush, myPen, 0, 0, 0, 280,47);
				}
				
				{//[SHAPE] endShapeVer
					var pos = {x:200, y: 200 },
					verts = [
						new r_vct(0,47),
						new r_vct(83,0),
						new r_vct(106,18),
						new r_vct(140,24),
						new r_vct(176,18),
						new r_vct(200,0),
						new r_vct(280,47),
						];
					var myBrush = {fill: true, color:"rgb(152, 177, 0)"},
					myPen = {outline: true, color: "rgb(5, 130, 55)", width:5};
					endShapeVer = q.gfx.createShape(verts, true, true, myBrush, myPen, 0, 0, 0, 47,280);
				}

				{//[SHAPE] endShapeVerFlip
					var pos = {x:200, y: 200 },
					verts = [
						new r_vct(0,0),
						new r_vct(83,47),
						new r_vct(106,29),
						new r_vct(140,23),
						new r_vct(176,29),
						new r_vct(200,47),
						new r_vct(280,0),
						];
					var myBrush = {fill: true, color:"rgb(152, 177, 0)"},
					myPen = {outline: true, color: "rgb(5, 130, 55)", width:5};
					endShapeVerFlip = q.gfx.createShape(verts, true, true, myBrush, myPen, 0, 0, 0, 47,280);
				}
				{//[SHAPE] rectShape
					var verts = [
						new vct(10, 41),
						new vct(130,41),
						new vct(140, 36),
						new vct(140, 6),
						new vct(130, 0),
						new vct(10, 0),
						new vct(0, 6),
						new vct(0, 36)

					];
					var myBrush = {fill: true, color:"#5059D7"},
					myPen = {outline: true, color: "#243273", width:5};
					rectShape = q.gfx.createShape(verts, true, false, myBrush, myPen, 0, 0, 0, 280,47);
				}

				{//[SHAPE] rectShapeHighlight
					var verts = [
						new vct(8, 26),
						new vct(110, 26),
						new vct(120, 23),
						new vct(120, 4),
						new vct(111, 0),
						new vct(8, 0),
						new vct(0, 4),
						new vct(0, 23)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5};
					rectShapeHighlight = q.gfx.createShape(verts, true, false, myBrush, myPen, 0, 0, 0, 280,47);
				}
		
			
				var y_b = {fill: true, color:"#FFD800"},
				y_p = {outline: false, color: "#CC7D00", width:3};
				
				{//[SHAPE] ltrM
					var verts = [
						new vct(0,50),
						new vct(2.5,54),
						new vct(8.5,54),
						new vct(12.5,51),
						new vct(12.5,26),
						new vct(16,24),
						new vct(23,31),
						new vct(27,31),
						new vct(33,25.5),
						new vct(35.5,27),
						new vct(35.5,47.5),
						new vct(39,51),
						new vct(58,51),
						new vct(62,46.5),
						new vct(61,3),
						new vct(56.5,0),
						new vct(43,0),
						new vct(38,1.5),
						new vct(27,12.5),
						new vct(23,11.5),
						new vct(12.5,1),
						new vct(5.5,1),
						new vct(0.5,6),
						new vct(0.5,12.5)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrM = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 66,57);
				}
		
				{//[SHAPE] ltrV
					var verts = [
						new vct(18.5,51.5),
						new vct(24.5,54),
						new vct(33,55),
						new vct(41,49),
						new vct(58,12.5),
						new vct(59,4),
						new vct(53,1),
						new vct(39.5,0),
						new vct(33.5,3),
						new vct(26.5,24.5),
						new vct(22.5,29),
						new vct(19.5,27),
						new vct(12.5,5),
						new vct(8.5,1),
						new vct(0.5,1.5),
						new vct(0.5,9),
						new vct(7,29.5)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrV = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 61,57);
				}	

				{//[SHAPE] ltrE
					var verts = [
						new vct(4,31),
						new vct(6.5,32),
						new vct(40,53.5),
						new vct(44.5,53.5),
						new vct(47.5,51),
						new vct(48.3,28),
						new vct(47.5,5),
						new vct(39,0.5),
						new vct(14,0.7),
						new vct(4,3.2),
						new vct(0.6,6.2),
						new vct(1,10.7),
						new vct(5.8,14.5),
						new vct(15.6,14),
						new vct(18.6,17),
						new vct(18.6,20.7),
						new vct(14,23.6),
						new vct(8,23),
						new vct(4,26)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrE = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 52,57);
				}
				
				{//[SHAPE] ltrY
					var verts = [
						new vct(0,19),
						new vct(4,22),
						new vct(12.6,22),
						new vct(23.7,29.5),
						new vct(28,30),
						new vct(29.7,27),
						new vct(29.7,18.8),
						new vct(19.7,12),
						new vct(28,7),
						new vct(28,1.5),
						new vct(26,0.7),
						new vct(12.4,8.8),
						new vct(4.6,8.4),
						new vct(0.6,11.3)

					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrY = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 30,30);
				}
				
				{//[SHAPE] ltrR
					var verts = [
						new vct(2, 51.4),
						new vct(3.4,54),
						new vct(8,56.6),
						new vct(12.5,55),
						new vct(19,40),
						new vct(23,39),
						new vct(26,42),
						new vct(26,51),
						new vct(31.8,55.7),
						new vct(44.8,56),
						new vct(52.3,52.5),
						new vct(54,46.7),
						new vct(54,7.5),
						new vct(49,1.6),
						new vct(32,0),
						new vct(17,1.7),
						new vct(6.4,5.7),
						new vct(0,12.8),
						new vct(0.4,26),
						new vct(3.6,31.6),
						new vct(9.3,35.3),
						new vct(6.8,39.8)

					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrR = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 55,57);
				}	

				{//[SHAPE] ltrL
					var verts = [
						new vct(0.7,49),
						new vct(3.5,53.8),
						new vct(15,55.6),
						new vct(34.8,55.6),
						new vct(45,53),
						new vct(48,46),
						new vct(47.8,8.7),
						new vct(44,1.9),
						new vct(44,2),
						new vct(37.5,0),
						new vct(22,0),
						new vct(18.7,3),
						new vct(17,39),
						new vct(15.7,41.3),
						new vct(3,40.8),
						new vct(0.5,43)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrL = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 50,57);
				}	
				
				{//[SHAPE] ltrD
					var verts = [
						new vct(0.5,52.4),
						new vct(6.2,55.4),
						new vct(29.2,56.3),
						new vct(38.5,52.4),
						new vct(47.6,43.8),
						new vct(51.5,35),
						new vct(51.7,22),
						new vct(47.3,11.5),
						new vct(38.9,4.7),
						new vct(28,1),
						new vct(7,0),
						new vct(0.5,4.7)
					];
					var myBrush = {fill: true, color:"#7C82E1"},
					myPen = {outline: false, color: "#475dc7", width:5},
					ltrD = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 53,56);
				}	

				{//[SHAPE] ltr_d
					var verts = [
						new vct(0,22.2),
						new vct(3,25.6),
						new vct(7,24.3),
						new vct(11.8,19.3),
						new vct(12,11.8),
						new vct(10.7,5.2),
						new vct(4,0.6),
						new vct(0.7,3)
					];
					ltr_d = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 16,30);
				}					
		
				{//[SHAPE] shapeStart
					var verts = [
						new vct(5,78),
						new vct(14.5,79.7),
						new vct(53,60),
						new vct(74,43.7),
						new vct(75.7,40.5),
						new vct(68,31),
						new vct(25,5),
						new vct(8,0),
						new vct(3,8.6)
					];
					shapeStart = q.gfx.createShape(verts, true, true, y_b, y_p, 0, 0, 0, 80,80);
				}
		
		}
		//SHAPE DEFINITION ENDS HERE!!!!


		//DEFINE SOME INSTANCES OF OBJECTS THAT'LL BE USED OFTEN
		{
			{//[INSTANCE] objBtnStart
			var objBtnStart = new parBtn({x: 200, y: 200}, 120, 120, shapeStart, "start");
				objBtnStart.drawSelf = function(){
					var self = this;
					q.gfx.drawCircle({x:self.position.x + 60, y:self.position.y+60}, 60, {fill:true, color:"#EA8800"}, {outline:true, width:8, color:"#B53300"});
					q.gfx.drawImage(self.img, self.position.x +25, self.position.y +15);
				};
				objBtnStart.click = function(){
					if(!moving){
						moving = true;
						var inter = window.setInterval(function(){
							box.position.x = Math.max(box.position.x-15,canvas.width/2 -300);
							objLogo.position.y -=20;
							objBtnStart.position.y +=20;
							overAlpha+= 0.05;
							if(box.position.x == canvas.width/2 -300){
								window.clearInterval(inter);
								window.setTimeout(function(){
									roomId++;
									q.gm.roomDestruct();
									box.rot = 0;
									box.targetRot = 0;
									roomStarted = false;
								},300);
							}
						}, gameSpeed);
					}
				}
			
			}
			{//[INSTANCE] objLogo
				var objLogo = {
					position:{
						x:0,
						y:0
					},
					width:485,
					height:135,
					create: function(){
						sprs.push(objLogo);
					},
					update: function(){
						var _ = objLogo.position,
						_b = {fill: true, color:"#C5322D"},
						_p = {outline: true, color:"#8C2020",  width:4},
						_hb = {fill: true, color:"#D75550"},
				        _hp = {outline: false},
						_bb = {fill: true, color:"rgba(0,0,0,1)"};
						
						q.gfx.drawImage(ltrM, _.x, _.y);
						
						q.gfx.drawCircle({x:_.x+98, y:_.y+30}, 25, _b, _p);
						q.gfx.drawCircle({x:_.x+103, y:_.y+26}, 15, _hb, _hp);
				
						q.gfx.drawImage(ltrV, _.x+130, _.y,-1);
						q.gfx.drawImage(ltrE, _.x+195, _.y,-1);
						
						
						q.gfx.drawImage(ltrM, _.x+185, _.y+80,-1,-1);
						
						q.gfx.drawCircle({x:_.x+280, y:_.y+106}, 25, _b, _p);
						q.gfx.drawCircle({x:_.x+284, y:_.y+102}, 15, _hb, _hp);
						
						q.gfx.drawImage(ltrR, _.x+318, _.y+74,-1,1);
						q.gfx.drawImage(ltrL, _.x+377, _.y+76,-1,1);
						q.gfx.drawImage(ltrD, _.x+428, _.y+76,1,1);
						q.gfx.drawImage(ltr_d, _.x+456, _.y+93,1,1);
						
						q.gfx.drawCircle({x:_.x+220, y:_.y+60}, 30, _bb, _hp);
						q.gfx.drawImage(ltrY, _.x+200	, _.y+52, 0.7,0.7,0);
						q.gfx.drawImage(ltrM, _.x+188, _.y+20, 0.35,0.35,Math.PI/2);
					}
				};
			
			}
		
			{//[INSTANCE] objBall
				var  objBall = new parBall({x:60, y:20}, 27);
			}

			{//[INSTANCE] objBtnRotateCW , objBtnRotateCCW
				var objBtnRotateCW = new parBtn({x: box.position.x + box.width +50, y: box.position.y+200}, 120, 184, arrowShapeFlip, "Rot CW"),
				objBtnRotateCCW = new parBtn({x: box.position.x  - 180, y: box.position.y+200}, 120, 184, arrowShape, "Rot CCW");
				objBtnRotateCW.drawSelf =  objBtnRotateCCW.drawSelf  = function(){
					var self = this,
					rot =0;

					self.width = self.img.width;
					self.height = self.img.height;
					if(box.rotating){
						if(box.targetRot > box.rot && self.text=="Rot CW")rot = 45/180 * Math.PI;
						if(box.targetRot < box.rot && self.text=="Rot CCW")rot = -45/180 * Math.PI;
					}
					ctx.translate(self.position.x+self.width/2, self.position.y+self.height/2);
					ctx.rotate(rot);
					q.gfx.drawImage(self.img, -self.width/2, -self.height/2);
					ctx.rotate(-rot);
					ctx.translate(-(self.position.x+self.width/2), -(self.position.y+self.height/2));
				};

				objBtnRotateCW.click = function(){
					if(!box.rotating && objBall.vSpd == 0 &&!box.atEnd)
						box.targetRot += Math.PI/2;
				}
				objBtnRotateCCW.click = function(){
					if(!box.rotating && objBall.vSpd == 0&&!box.atEnd)
						box.targetRot -= Math.PI/2;
				}

				objBtnRotateCW.xtraUpdate = function(){
					var self = this;
					self.position.x = box.position.x + 600 +  (canvas.width - 600)/4 - self.width/2;
					ctx.fillRect(self.position.x, self.position.y, 5, 5);

				};

				objBtnRotateCCW.xtraUpdate = function(){
					var self = this;
					self.position.x = (canvas.width - 600)/4- self.width/2 -10;
					ctx.fillRect(self.position.x, self.position.y, 5, 5);

				};

			}

			{//[INSTANCE] objBtnRestart
				var objBtnRestart = new parBtn({x: box.position.x - 96, y: box.position.y}, 96, 32, null, "Restart");
				objBtnRestart.click = function(){
					q.gm.roomDestruct();
					box.rot = 0;
					box.targetRot = 0;
					roomStarted = false;
				}
			}

			{//[INSTANCE] objBtnGravity
				var objBtnGravity = new parBtn({x: box.position.x - 96, y: box.position.y+108}, 96, 32, null, "Gravity");
				objBtnGravity.click = function(){
					if(!box.atEnd)objBall.gravDir += Math.PI;
				}
			}
		}
		//INSTANCE DEFINITION ENDS HERE!!!!!!

		//building function
		function buildLvl(str){
			var lvlArr = q.gm.arrFromStr(str);
			for(var i=0; i<lvlArr.length; i++){
				console.log(lvlArr[i]);
				switch(lvlArr[i]){
					case "ball":
					objBall.position.x = parseInt(lvlArr[++i],10);
					objBall.position.y = parseInt(lvlArr[++i],10);
					objBall.radius = parseInt(lvlArr[++i],10)-4;
					objBall.create();
					break;
					case "end":
					var _x = parseInt(lvlArr[++i],10),
					_y = parseInt(lvlArr[++i],10),
					_w = parseInt(lvlArr[++i],10),
					_h = parseInt(lvlArr[++i],10),
					_r =  parseInt(lvlArr[++i],10);
					var objEnd = new parEnd({x:_x,y:_y},_w, _h,_r);
					objEnd.img = endShape;
					objEnd.create();
					break;
					case "block":
					var _block = new parObst({x:parseInt(lvlArr[++i],10), y:parseInt(lvlArr[++i],10)},parseInt(lvlArr[++i],10),parseInt(lvlArr[++i],10),0);
					console.log("fat7i");
					
					_block.create();
					break;
					case "spike":
					var _block = new parSpike({x:parseInt(lvlArr[++i],10), y:parseInt(lvlArr[++i],10)},parseInt(lvlArr[++i],10),parseInt(lvlArr[++i],10),0);
					
					_block.create();
					break;
				}
			}
		};

		
		//Start game logic
		var updateGameInterval = window.setInterval(
		function(){
			updateGame();
		} , gameSpeed);

		function updateGame(){

			//resize canvas and clear context , THIS GOES BEFORE ANY GRAPHICAL MANIPLUATION
			canvas.style.position = "absolute";
			var w = window.innerWidth,
			h = window.innerHeight,
			ratio = w/h;
			if(w>h){
				topCanvas.style.display = "none";
				canvas.style.display = "block";
				canvas.width = ratio * 600;
				canvas.style.height = h.toString() + "px";
				scaleRatio = 600/h;
				canvas.style.left = "0px";
				canvas.style.top = "0px";
			}else{
				canvas.style.display = "none";
				topCanvas.style.display = "block";
				topCanvas.width = w;
				topCanvas.height = h;
				var t_ctx = topCanvas.getContext("2d");
				t_ctx.font="30px Georgia";
				t_ctx.fillStyle = "rgb(0, 0, 0)";
				t_ctx.textAlign="start";
				var _x = w/2 - 157;
				t_ctx.fillText("Please rotate the",_x,h/2);
				t_ctx.fillText(" device to play the game",_x-40,h/2+50);
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
			canvas.style.left = "0px";
			canvas.style.top = "0px";
			canvas.style.backgroundColor = "#5b636a";

			ctx = canvas.getContext("2d");
			ctx.fillStyle =  "#5b636a";
			ctx.fillRect(0,0,canvas.width, canvas.height);

			canvas.center={
				x: canvas.width/2,
				y: canvas.height/2
			};


			console.log("updateGame - "+rooms[roomId]+" -- objs: "+sprs.length);
			//GAME LOGIC GOES HERE
			switch(rooms[roomId])
			{
				case "rmMenu":
				if(!roomStarted){
					overAlpha = 0;
					objLogo.position.x = (canvas.width-600-objLogo.width)/2;
					objLogo.position.y = 150;
					objBtnStart.position.x = (canvas.width-600-objBtnStart.width)/2;
					objBtnStart.position.y = 350;
					box.position.x = canvas.width -600;
					var lvlStr = 
					"ball-48-48-18-end-336-528-0-0-block-48-120-120-24-block-240-24-24-120-block-120-216-216-24-block-408-48-24-312-block-144-432-336-24-block-264-288-24-240-block-24-192-24-264-block-48-504-120-24-block-168-576-216-24-block-528-240-24-312-block-480-120-120-24-block-312-96-48-24-block-120-312-72-72";
					buildLvl(lvlStr);
					objLogo.create();
					objBtnStart.create();
					box.create();
					roomStarted = true;
				}else{
					if(!box.rotating && !waiting && !moving){
						waiting = true;
						window.setTimeout(function(){waiting=false;},500+Math.random()*500);
						//if(Math.floor(Math.random()*10)==0)
						box.targetRot += (Math.round(Math.random()))? Math.PI/2 : -Math.PI/2;
					}
					objLogo.position.x = Math.max(0,(box.position.x-objLogo.width)/2);
					objBtnStart.position.x = (box.position.x-objBtnStart.width)/2;
					if(!moving){
							objBtnStart.position.y = 350;
							objLogo.position.y = 150;
							box.position.x = canvas.width -600;
							
					}
					ctx.fillStyle = "#28323E";
					ctx.fillRect(box.position.x,0,600,600);
					
					ctx.fillStyle = "#5B636A";
					ctx.fillRect(0,0,box.position.x,600);
					
					ctx.fillStyle = "#44484B";
					ctx.fillRect(box.position.x-10,0,10,600);
					
					ctx.fillStyle = "#25282B";
					ctx.fillRect(box.position.x-5,0,5,600);
					
					
					
					//25282B
					
					
				}
				break;
				
				case "rmGame":
				if(!roomStarted){
						overAlpha = 0;
						var lvlStr = lvls[curLvl];
						if(lvlStr == "" || lvlStr == null || typeof(lvlStr)=="undefined"){
							roomId =0;
							q.gm.roomDestruct();
							roomStarted = false;
						}else{
							buildLvl(lvlStr);
							box.create();

							objBtnRestart.create();
							objBtnRotateCW.create();
							objBtnRotateCCW.create();
							//objBtnGravity.create();
							roomStarted = true;
						}
				
				}else{
					if(overAlpha<1)overAlpha+=0.08;
				}
				break;
				
				
				default:
				break;
			}


			//update all existing objects
			box.drawBack();
			for(var i=0; i<sprs.length; i++)
			{
				sprs[i].update();
			}
			if(rooms[roomId]=="rmMenu"){
				ctx.fillStyle = "rgba(40,50,62,"+ overAlpha.toString() + ")";
				ctx.fillRect(box.position.x, box.position.y, 600,600);
			}


		}
	}

}

//SOME FUNCTIONS

var q={

	gm:{
		arrFromStr: function(str){
			str+="-";
			var arr = [],
			curWord = "",
			cur = 0;
			for(var i =0; i<str.length; i++){
				if(str.charAt(i) == '-'){
					arr[cur] = curWord;
					cur++;
					curWord = "";
				}else{
					curWord += str.charAt(i);
				}
			}
			return arr;
		},
		cloneArr: function(src, dst){
		  for(var i=0; i<src.length; i++)
			dst[i] = src[i];
		},
		instanceCount: function(name){
			var num=0;
			for(var i=0; i<sprs.length; i++)
			{
				if(sprs[i].name==name)num++;
			}
			return num;
		},
		roomDestruct: function(){
				sprs.splice(0,sprs.length);//destroy all objects
		}
	},

	gfx: {
	
		roundRect: function (ctx, x, y, width, height, radius, fill, stroke) {
		//~Juan Mendes : http://js-bits.blogspot.com.eg/2010/07/canvas-rounded-corner-rectangles.html 
		  if (typeof stroke == "undefined" ) {
			stroke = true;
		  }
		  if (typeof radius === "undefined") {
			radius = 5;
		  }
		  ctx.beginPath();
		  ctx.moveTo(x + radius, y);
		  ctx.lineTo(x + width - radius, y);
		  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		  ctx.lineTo(x + width, y + height - radius);
		  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		  ctx.lineTo(x + radius, y + height);
		  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		  ctx.lineTo(x, y + radius);
		  ctx.quadraticCurveTo(x, y, x + radius, y);
		  ctx.closePath();
		  if (stroke) {
			ctx.stroke();
		  }
		  if (fill) {
			ctx.fill();
		  }        
		},
		drawImage: function(image, x, y,xscale,yscale, rot){
			var _rot =0,_xscale = 1, _yscale = 1;
			if(typeof(rot)!="undefined")_rot = rot;
			if(typeof(xscale)!="undefined")_xscale = xscale;
			if(typeof(yscale)!="undefined")_yscale = yscale;
			if(typeof(image.fngrPrnt) != "undefined"){
				if(image.fngrPrnt == "imgData"){
				  ctx.putImageData(image.imgData, x, y);
				  return;
				}
			}
			if(typeof(image)!="undefined" && image!==null){
				ctx.translate(x+image.width/2,y+image.height/2);
				ctx.rotate(_rot);
				ctx.scale(_xscale,_yscale);
				ctx.drawImage(image, -image.width/2, -image.height/2);
				ctx.scale(1/_xscale,1/_yscale);	
				ctx.rotate(-_rot);
				ctx.translate(-x-image.width/2,-y-image.height/2);
				return;
			}
		},

		drawCircle: function(position, radius, brush, pen){
			//position {num x:, num y:}
			//brush {bool fill:, string color:}
			//pen {bool outline:, string color:, num width:}
			ctx.beginPath();
			ctx.arc(position.x, position.y, radius, 0, 2*Math.PI);
			ctx.closePath();
			if(brush.fill){
				ctx.fillStyle = brush.color;
				ctx.fill();
			}
			if(pen.outline){
				ctx.strokeStyle = pen.color;
				ctx.lineWidth = pen.width;
				ctx.stroke();
			}
		},


		drawText: function(position, str){
			ctx.font="20px Georgia";
			ctx.textAlign="start";
			ctx.fillText(str,position.x,position.y+15);

		},

		drawRect: function(position, width, height, color){
		},

		drawFixedRect: function(position, length, width, rot){
			ctx.beginPath();
			var x = position.x - (width/2 * Math.sin(rot) + length/2 * Math.cos(rot)),
			y = position.y + width/2 * Math.cos(rot) - length/2 * Math.sin(rot);
			ctx.moveTo(x,y);
			x += q.mth.lengthDirX(length, rot) ;
		  y -= q.mth.lengthDirY(length, rot) ;
			ctx.lineTo(x, y);
			rot -= Math.PI/2;
			x += q.mth.lengthDirX(width, rot) ;
		  y -= q.mth.lengthDirY(width, rot) ;
			ctx.lineTo(x, y);
			rot -= Math.PI/2;
			x += q.mth.lengthDirX(length, rot) ;
		  y -= q.mth.lengthDirY(length, rot) ;
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.fill();
		},

		createShape: function(verts, closed, smooth, brush, pen, flipX, flipY, rot, width, height){
      var points = new Array();
      var t_canvas = document.createElement("CANVAS"),
      t_ctx = t_canvas.getContext("2d");
      t_canvas.width = width+pen.width*2;
      t_canvas.height = height+pen.width*2;
      t_canvas.style.display = "none";
      t_ctx.clearRect(0,0,width, height);
      // first define the original nodes
      for(var i = 0; i<verts.length; i++){
        points[i] = { x: verts[i].x, y: verts[i].y};
      }

      if (smooth ){

          var oPoints = new Array();

          for(var rep=0; rep < 2; rep++){
            // define additional intermediary nodes
            q.gm.cloneArr(points, oPoints);
            var xtra = 0;
            for(var i = 0; i<oPoints.length-1; i++){
              var cur, nxt;
              cur = oPoints[i];
              nxt = oPoints[i+1];
              var nPoint = q.mth.pointMid(cur, nxt);
              points.splice(++xtra+i, 0, nPoint);
            }
          }

          //smoothen all the nodess
          q.gm.cloneArr(points, oPoints);
          for(var i=0; i<points.length; i++){
            var nxt, prev, cur;
            if (i == 0) prev = oPoints[points.length-1];
            else prev = oPoints[i-1];
            if(i == points.length-1) nxt = oPoints[0];
            else nxt = oPoints[i+1];
            cur = oPoints[i];
            points[i] = {
              x: q.mth.avg3(prev.x ,cur.x, nxt.x, 2, 1, 2),
              y: q.mth.avg3(prev.y ,cur.y, nxt.y, 2, 1, 2)
            }
          }
      }
      t_ctx.translate(pen.width + (flipX? width : 0), pen.width+(flipY? height :0 ));
      t_ctx.scale(flipX? -1:1,flipY? -1:1);
      t_ctx.rotate(rot);
      t_ctx.moveTo(points[0].x, points[0].y);
      var _w =width, _h=height;
      for(var i=1; i<points.length; i++){
        if(points[i].x > _w) _w = points[i].x;
        if(points[i].y > _h) _h = points[i].y;
        t_ctx.lineTo(points[i].x, points[i].y);
      }
      if(closed)t_ctx.closePath();


      if(brush.fill){
        t_ctx.fillStyle = brush.color;
        t_ctx.fill();
      }
      if(pen.outline){
        t_ctx.strokeStyle = pen.color;
        t_ctx.lineWidth = pen.width;
        t_ctx.stroke();

      }
      /*var _imgData = t_ctx.getImageData(0,0,_w+pen.width*2,_h+pen.width*2);
      return {imgData: _imgData,
        w: _w+pen.width*2,
        h: _h+pen.width*2,
        fngrPrnt: "imgData"
      };*/
	 		var imgData = t_canvas.toDataURL("image/png");
			var testImg = new Image();
			testImg.width = _w;
			testImg.height = _h;
			testImg.src= imgData;
			return testImg;

	   },

		drawShape: function(position, verts, closed, smooth){
      var points = new Array();
      // first define the original nodes
      for(var i = 0; i<verts.length; i++){
        points[i] = { x: verts[i].x + position.x, y: verts[i].y + position.y };
      }

      if (smooth ){

          var oPoints = new Array();

          for(var rep=0; rep < 2; rep++){
            // define additional intermediary nodes
            q.gm.cloneArr(points, oPoints);
            var xtra = 0;
            for(var i = 0; i<oPoints.length-1; i++){
              var cur, nxt;
              cur = oPoints[i];
              nxt = oPoints[i+1];
              var nPoint = q.mth.pointMid(cur, nxt);
              points.splice(++xtra+i, 0, nPoint);
            }
          }

          //smoothen all the nodess
          q.gm.cloneArr(points, oPoints);
          for(var i=0; i<points.length; i++){
            var nxt, prev, cur;
            if (i == 0) prev = oPoints[points.length-1];
            else prev = oPoints[i-1];
            if(i == points.length-1) nxt = oPoints[0];
            else nxt = oPoints[i+1];
            cur = oPoints[i];
            points[i] = {
              x: q.mth.avg3(prev.x ,cur.x, nxt.x, 2, 1, 2),
              y: q.mth.avg3(prev.y ,cur.y, nxt.y, 2, 1, 2)
            }
          }
      }
      ctx.moveTo(points[0].x, points[0].y);
      for(var i=1; i<points.length; i++)
        ctx.lineTo(points[i].x, points[i].y);

      if(closed)ctx.closePath();
      ctx.fill();
		}

	},

	mth: {
	rectCollidesRect: function(pos1, w1, h1, pos2, w2, h2){
		return  (pos1.x < pos2.x+w2 && pos1.x+w1 > pos2.x && pos1.y < pos2.y+h2 && pos1.y+h1 > pos2.y) ;

	},
	rotateAbout: function(p, _c, angle){
		  var  s = Math.sin(angle),
			   c = Math.cos(angle);
		  p.x -= _c.x;
		  p.y -= _c.y;
		  var xnew = p.x * c - p.y * s;
		  var ynew = p.x * s + p.y * c;
		  p.x = xnew + _c.x;
		  p.y = ynew + _c.y;
		  return p;
	},
    avg3: function(n1, n2, n3, w1, w2, w3){
      return (n1*w1 + n2*w2 + n3*w3)/(w1+w2+w3);
    },
    pointMid: function(point1, point2){
      return {
        x : (point2.x + point1.x)/2,
        y: (point2.y + point1.y)/2
      }

    },

    sign : function(num){
      return (num == 0)? 0 : num / Math.abs(num);
    },
		withinCircle: function(point, center, radius){

			if( (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius, 2) ){return true;}
			else {return false;}
		},

    withinRect: function(point, position, width, height){
      if(point.x > position.x && point.y > position.y && point.x < position.x + width && point.y < position.y+height)
        return true;
      else return false;
    },

		lengthDirX: function(length, dir){
			return Math.cos(dir)*length;
		},

		lengthDirY: function(length, dir){
			return Math.sin(-dir)*length;
		},

		pointDis: function(pointA, pointB){
			return Math.sqrt(Math.pow(pointA.x-pointB.x,2)+Math.pow(pointA.y-pointB.y,2));
		},

		pointDir: function(pointA,  pointB){
			var xx = Math.abs(pointA.x - pointB.x),
			yy = Math.abs(pointA.y - pointB.y);
			var atan = Math.atan(yy/xx);
			if (pointA.x>pointB.x){
				if(pointA.y > pointB.y){
					return 2*Math.PI - atan;
				}else{
					return  atan;
				}
			}else{
				if(pointA.y > pointB.y){
					return Math.PI + atan;
				}else{
					return  Math.PI - atan;
				}
			}
		},

		r2d: function (ang){
			return ang*180/Math.PI;
		},
		d2r: function (ang){
			return ang*Math.PI/180;
		}
	}


};
