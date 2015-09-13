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
