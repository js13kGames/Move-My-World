
var totalAssetCount = 0, loadedAssetCount = 0, gameSpeed = 30;
var canvas, ctx , scaleRatio = 1;
var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};
var _isMobile = isMobile.any();
var topCanvas = document.createElement("CANVAS");
var builder = {//CHECKPOINT
	building : false,
	posX: 0,
	posY:0,
	curObj: "block"

};





canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.center={
	x: canvas.width/2,
	y: canvas.height/2
};
ctx = canvas.getContext("2d");

var mouse={
	x: canvas.width/2,
	y: canvas.height/2,
	acX: 0,
	acY: 0,

	previousX: 0,
	previousY: 0
};

var mouseDown = false;
var mouseClick = false;
var mouseRelease = false;
document.addEventListener(_isMobile? "touchstart" : "mousedown", function(e){
	mouseClick = false;
	if(mouse.acX < 600*scaleRatio){
	
		mouse.previousX = mouse.x;
		mouse.previousY = mouse.y;
		var __x = _isMobile? e.targetTouches[0].pageX : e.pageX,
		 __y = _isMobile? e.targetTouches[0].pageY : e.pageY;
    m_x = Math.min(canvas.width/ scaleRatio, Math.max(__x - parseInt(canvas.style.left,10), 0)) * scaleRatio;
    m_y = Math.min(canvas.height/ scaleRatio, Math.max(__y - parseInt(canvas.style.top,10), 0)) * scaleRatio;

		mouse.acX = m_x;
		mouse.acY = m_y;
		mouse.x = Math.round(m_x / builder.gridW) * builder.gridW;
		mouse.y = Math.round(m_y / builder.gridH) * builder.gridH;
		
	mouseClick = true;
	window.setTimeout(function(){mouseClick = false;}, gameSpeed);
	mouseDown = true;
	}
});
document.addEventListener(_isMobile? "touchend" :"mouseup", function(){
		//alert(mouseClick + " " + mouseDown);
			mouseDown = false;
			mouseClick = false;
			mouseRelease = true;
			window.setTimeout(function(){mouseRelease = false;}, gameSpeed);
});


document.addEventListener("load" , preload());

document.onload = function(e){
    mouse.x = Math.min(canvas.width, Math.max(e.pageX - parseInt(canvas.style.left,10), 0));
    mouse.y = Math.min(canvas.height, Math.max(e.pageY - parseInt(canvas.style.top,10), 0));
}
document.addEventListener (_isMobile? "touchmove" : "mousemove", function(e){
		if(mouse.acX < 600* scaleRatio)e.preventDefault();
		mouse.previousX = mouse.x;
		mouse.previousY = mouse.y;
		var __x = _isMobile? e.targetTouches[0].pageX : e.pageX,
		 __y = _isMobile? e.targetTouches[0].pageY : e.pageY;
    m_x = Math.min(canvas.width/ scaleRatio, Math.max(__x - parseInt(canvas.style.left,10), 0)) * scaleRatio;
    m_y = Math.min(canvas.height/ scaleRatio, Math.max(__y - parseInt(canvas.style.top,10), 0)) * scaleRatio;

		mouse.acX = m_x;
		mouse.acY = m_y;
		mouse.x = Math.round(m_x / builder.gridW) * builder.gridW;
		mouse.y = Math.round(m_y / builder.gridH) * builder.gridH;

});
var par = document.getElementById("displayText");
var sprs = [];

//TYPES
function vct(_x,_y){
	var self = this;
	self.x = _x;
	self.y = _y;
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
		tex1: new image("assets/texture1.png", 32,32),
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
			"rmBuilder"
		];
		var roomId = 0;
		var roomStarted = false;
		var world;

		//OBJECTS DEFINED HERE
		{//[OBJECT] parBlock
			function parBlock(position, width, height){
				var self = this;
				self.name = "block";
				self.position = position;
				self.width = width;
				self.height = height;
				self.create = function(){
					sprs.push(self);
				};
				self.destroy = function(){
					var index = sprs.indexOf(self);
					sprs.splice(index,1);
				};
				self.update = function(){
					if(self.width ==0 || self.height ==0)self.destroy();
					if(self.width < 0){
						self.width = -self.width;
						self.position.x -=self.width;
					}
					if(self.height < 0){
						self.height = -self.height;
						self.position.y -=self.height;
					}
					if(mouseClick){
						console.log(mouse);
						console.log(self.position);
						console.log(self.width +" "+ self.height);
						if(mouse.acX > self.position.x && mouse.acY > self.position.y &&
						mouse.acX < self.position.x+self.width && mouse.acY < self.position.y + self.height){
							self.destroy();
						}
					}
					ctx.fillStyle = "#000";
					ctx.fillRect(self.position.x, self.position.y, self.width, self.height);
				};
			}
		}

		{//[OBJECT] parSpike
			function parSpike(position, width, height){
				var self = this;
				self.name = "spike";
				self.position = position;
				self.width = width;
				self.height = height;
				self.create = function(){
					sprs.push(self);
				};
				self.destroy = function(){
					var index = sprs.indexOf(self);
					sprs.splice(index,1);
				};
				self.update = function(){
					if(mouseClick && q.mth.withinRect({x:mouse.acX, y:mouse.acY}, self.position, self.width, self.height)){

						self.destroy();
					}
					ctx.fillStyle = "#5d5d5d";
					ctx.fillRect(self.position.x, self.position.y, self.width, self.height);
				};
			}
		}


		{//[OBJECT] objBall
			var objBall={
				name: "ball",
				position:{
					x:300,
					y:300
				},
				radius: 16,
				create: function(){
					sprs.push(objBall);
				},
				update : function(){
					ctx.beginPath();
					ctx.arc(objBall.position.x+objBall.radius, objBall.position.y+objBall.radius, objBall.radius, 0, Math.PI*2);
					ctx.closePath();
					ctx.fillStyle = "rgb(235, 41, 22)";
					ctx.fill();
					ctx.fillStyle = "#000";
					q.gfx.drawText(objBall.position, objBall.radius);
				}
			}

		}

		{//[OBJECT] objEnd
			var objEnd={
				name: "end",
				position:{
					x:300,
					y:500
				},
				width: 128,
				height: 32,
				rot:0,
				create: function(){
					sprs.push(objEnd);
				},
				update : function(){
					ctx.fillStyle = "#ff00ff";
					ctx.fillRect(objEnd.position.x, objEnd.position.y,  objEnd.width,objEnd.height);
				}
			}

		}

		//OBJECT DEFINITION END HERE!!!!!!!!


		//Start game logic

			//DOM BUTTONS
			var btnPosBall = document.getElementById("posBall"),
			btnGrowBall = document.getElementById("growBall"),
			btnShrnkBall = document.getElementById("shrnkBall"),
			btnEditEnd = document.getElementById("editEnd"),
			btnRender = document.getElementById("render"),
			/*btnPosEnd = document.getElementById("posEnd"),
			btnRotEnd = document.getElementById("rotEnd"),
			btnGrowEnd = document.getElementById("growEnd"),
			btnShrnkEnd = document.getElementById("shrnkEnd"),*/
			btnEditBlocks = document.getElementById("editBlocks"),
			btnEditSpikes = document.getElementById("editSpikes"),
			txtGridW = document.getElementById("gridW"),
			txtGridH = document.getElementById("gridH"),
			btnBuild = document.getElementById("build"),
			btnTest = document.getElementById("test"),
			levelText = document.getElementById("levelText");
			txtGridW.addEventListener("onfocus", function(){
				builder.curObj = null;
				builder.building = false;
			});
			txtGridH.addEventListener("onfocus", function(){
				builder.curObj = null;
				builder.building = false;
			});
			btnPosBall.addEventListener("click", function(){
				builder.curObj = "ball";
				builder.building = false;
			});/*
			btnPosEnd.addEventListener("click", function(){
				builder.curObj = "end";
				builder.building = false;
			});*/
			btnEditEnd.addEventListener("click", function(){
				builder.curObj = "end";
				builder.building = false;
			});
			btnEditBlocks.addEventListener("click", function(){
				builder.curObj = "block";
				builder.building = false;
			});
			btnEditSpikes.addEventListener("click", function(){
				builder.curObj = "spike";
				builder.building = false;
			});
			btnShrnkBall.addEventListener("click", function(){
				objBall.radius--;
				builder.curObj = null;
				builder.building = false;
			});
			btnGrowBall.addEventListener("click", function(){
				objBall.radius++;
				builder.curObj = null;
				builder.building = false;
			});/*
			btnRotEnd.addEventListener("click", function(){
				objEnd.rot += Math.PI/2;
				builder.curObj = null;
				builder.building = false;
			});
			btnGrowEnd.addEventListener("click", function(){
				objEnd.width *= 1.05;
				objEnd.height *= 1.05;
				builder.curObj = null;
				builder.building = false;
			});
			btnShrnkEnd.addEventListener("click", function(){
				objEnd.width /= 1.05;
				objEnd.height /= 1.05;
				builder.curObj = null;
				builder.building = false;
			});*/
			btnTest.addEventListener("click", function(){
			var lvlStr = "ball-"+ objBall.position.x.toString() + "-" +
				 						objBall.position.y.toString() + "-" + objBall.radius.toString();
				lvlStr += "-end-" + objEnd.position.x.toString() +"-"+ objEnd.position.y.toString()+ "-"
										+ objEnd.width.toString() + "-" + objEnd.height.toString();
				for(var i=0; i<sprs.length; i++){
					var cur = sprs[i];
					if(cur.name=="block"){
						lvlStr +="-block-";
					}
					else if(cur.name=="spike"){
						lvlStr +="-spike-";
					}
					else continue;
					if(cur.width <0) {
						cur.width *=-1;
						cur.position.x -= cur.width;
					}
					if(cur.height <0) {
						cur.height *=-1;
						cur.position.y -= cur.height;
					}
					var _w = cur.width//Math.max(cur.width,  cur.height),
					_h =  cur.height//Math.min(cur.width,  cur.height),
					_x = cur.position.x ,
					_y = cur.position.y ;


					lvlStr += _x.toString()+"-"+_y.toString()+
									"-"+_w.toString() + "-" + _h.toString();
				}

				levelText.value = lvlStr;
				builder.building = false;
				var url = "test.html?lvl="+levelText.value+"&";
				window.open(url,'_blank');
			});
			btnRender.addEventListener("click", function(){
				var nLvlStr = levelText.value;
				var lvlArr = q.gm.arrFromStr(nLvlStr);
				q.gm.roomDestruct();
				console.log(lvlArr);
				for(var i=0; i<lvlArr.length; i++){
						switch(lvlArr[i]){
							case "ball":
							objBall.position.x = parseInt(lvlArr[++i],10);
							objBall.position.y = parseInt(lvlArr[++i],10);
							objBall.radius = parseInt(lvlArr[++i],10);
							objBall.create();
							break;
							case "end":
							var _x = parseInt(lvlArr[++i],10),
							_y = parseInt(lvlArr[++i],10),
							_w = parseInt(lvlArr[++i],10),
							_h = parseInt(lvlArr[++i],10);
							objEnd.position.x = _x;
							objEnd.position.y = _y;
							objEnd.width = _w;
							objEnd.height = _h;
							objEnd.create();
							break;
							case "block":
							var _block = new parBlock({x:parseInt(lvlArr[++i],10), y:parseInt(lvlArr[++i],10)},parseInt(lvlArr[++i],10),parseInt(lvlArr[++i],10),0);
							console.log("helloz");
							_block.create();
							break;
							case "spike":
							var _block = new parSpike({x:parseInt(lvlArr[++i],10), y:parseInt(lvlArr[++i],10)},parseInt(lvlArr[++i],10),parseInt(lvlArr[++i],10),0);
							
							_block.create();
							break;
						}


					}
			});
			btnBuild.addEventListener("click", function(){
				var lvlStr = "ball-"+ objBall.position.x.toString() + "-" +
				 						objBall.position.y.toString() + "-" + objBall.radius.toString();
				lvlStr += "-end-" + objEnd.position.x.toString() +"-"+ objEnd.position.y.toString()+ "-"
										+ objEnd.width.toString() + "-" + objEnd.height.toString();
				for(var i=0; i<sprs.length; i++){
					var cur = sprs[i];
					if(cur.name=="block"){
						lvlStr +="-block-";
					}
					else if(cur.name=="spike"){
						lvlStr +="-spike-";
					}
					else continue;
					if(cur.width <0) {
						cur.width *=-1;
						cur.position.x -= cur.width;
					}
					if(cur.height <0) {
						cur.height *=-1;
						cur.position.y -= cur.height;
					}
					var _w = cur.width//Math.max(cur.width,  cur.height),
					_h =  cur.height//Math.min(cur.width,  cur.height),
					_x = cur.position.x ,
					_y = cur.position.y ;


					lvlStr += _x.toString()+"-"+_y.toString()+
									"-"+_w.toString() + "-" + _h.toString();
									
					window.location = "data:application/octet-stream,"+lvlStr;
				}

				levelText.value = lvlStr;
				builder.building = false;
			});

		var updateGameInterval = window.setInterval(
		function(){
			updateGame();
		} , gameSpeed);

		function updateGame(){

			//resize canvas and clear context , THIS GOES BEFORE ANY GRAPHICAL MANIPLUATION

			//resize canvas and clear context , THIS GOES BEFORE ANY GRAPHICAL MANIPLUATION
			canvas.style.position = "absolute";
			var w = window.innerWidth,
			h = window.innerHeight,
			ratio = w/h;
			if(w>h){
				topCanvas.style.display = "none";
				canvas.style.display = "block";
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

			ctx.clearRect(0,0,canvas.width,canvas.height);
			canvas.center={
				x: canvas.width/2,
				y: canvas.height/2
			};


			console.log("updateGame - "+rooms[roomId]+" -- objs: "+sprs.length);
			//GAME LOGIC GOES HERE
			switch(rooms[roomId])
			{
				case "rmBuilder":
				if(!roomStarted){
					objBall.create();
					objEnd.create();

					roomStarted = true;
				}else{//CHECKPOINT
					builder.gridW = parseInt(txtGridW.value,10);
					builder.gridH = parseInt(txtGridH.value,10);
					if(builder.curObj=="block"){
						if(mouseClick ){
							builder.building = true;
							builder.posX = mouse.x;
							builder.posY = mouse.y;
						}
						if(mouseDown && mouse.acX < canvas.width){
							if(builder.building){
								ctx.fillStyle = "#000";
								ctx.fillRect(builder.posX, builder.posY, mouse.x-builder.posX, mouse.y-builder.posY);
							}
						}
						if(mouseRelease && mouse.acX < canvas.width){
							var block = new parBlock({x:builder.posX, y:builder.posY}, mouse.x-builder.posX, mouse.y-builder.posY);
							block.create();
							builder.building = false;
						}
					}
					else if(builder.curObj=="spike"){
						if(mouseClick){
							builder.building = true;
							builder.posX = mouse.x;
							builder.posY = mouse.y;
						}
						if(mouseDown&& q.mth.withinRect(mouse, {x:0, y:0}, canvas.width,canvas.height)){
							if(builder.building){
								ctx.fillStyle = "#7c7c7c";
								ctx.fillRect(builder.posX, builder.posY, mouse.x-builder.posX, mouse.y-builder.posY);
							}
						}
						if(mouseRelease&& q.mth.withinRect(mouse, {x:0, y:0}, canvas.width,canvas.height)){
							var spike = new parSpike({x:builder.posX, y:builder.posY}, mouse.x-builder.posX, mouse.y-builder.posY);
							spike.create();
							builder.building = false;
						}
					}
					else if (builder.curObj == "ball" ){
						if(builder.building){
							objBall.position.x = mouse.x;
							objBall.position.y = mouse.y;
						}
						if(mouseClick && mouse.acX < canvas.width) {
							builder.building =true;
						}
						if(mouseRelease) {
						builder.building = false;
						}
					}
					else if(builder.curObj == "end"){
						if(mouseClick && mouse.acX < canvas.width ){
							builder.building = true;
							objEnd.position.x = mouse.x;
							objEnd.position.y = mouse.y;
						}
						if(mouseDown && mouse.acX < canvas.width){
							if(builder.building){
								objEnd.width = mouse.x - objEnd.position.x;
								objEnd.height = mouse.y - objEnd.position.y;
							/*
								ctx.fillStyle = "#000";
								ctx.fillRect(builder.posX, builder.posY, mouse.x-builder.posX, mouse.y-builder.posY);*/
							}
						}
					}
					//draw grid
					ctx.beginPath();
					ctx.arc(mouse.x, mouse.y, 5, 0, 2*Math.PI);
					ctx.closePath();
					ctx.fillStyle = "#000";
					ctx.fill();
					for(var xx= 0; xx<600; xx+=builder.gridW){
						ctx.moveTo(xx,0);
						ctx.lineTo(xx,600);
						ctx.stroke();
					}
					for(var yy=0; yy<600; yy+=builder.gridH){
						ctx.moveTo(0,yy);
						ctx.lineTo(600,yy);
						ctx.stroke();
					}
				}
				break;

				default:
					//TODO: display credits and a way to return to main menu here
				break;
			}


			for(var i=0; i<sprs.length; i++)
			{
				sprs[i].update();
			}


		}
	}

}
