/* 柱图组件对象 */
var H5ComponentPolyline = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;
	var length = cfg.data.length;
	var x,y;
	//创建画布
	var canvas = document.createElement('canvas');
	var cxt = canvas.getContext('2d');
	canvas.width = cxt.width = w;
	canvas.height = cxt.height = h;
	component.append(canvas);

	//绘制背景   水平网格线
	
 	var step = 10 //水平网格线 100份 ==> 10
 	cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.strokeStyle = '#AAAAAA';

 
	for(var i=0;i<step+1;i++){
		y = (h/step) * i
		cxt.moveTo(0,y);
		cxt.lineTo(w,y);
	}

	//竖直网格线
	step = length + 1;
	for(var i=0;i<step+1;i++){
		x = (w/step) * i;
		cxt.moveTo(x,0);
		cxt.lineTo(x,h);
	}
    cxt.stroke();
    cxt.closePath();

    //绘制数据
    var canvas = document.createElement('canvas');
	var cxt = canvas.getContext('2d');
	canvas.width = cxt.width = w;
	canvas.height = cxt.height = h;
	component.append(canvas);

	
	//绘制点
	var row_w = w/(length+1);
	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];

		cxt.beginPath();
		cxt.arc(x,y,8,0,2*Math.PI,false);
		cxt.closePath();
		cxt.fillStyle = "#F00";
		cxt.fill();
	}
	//连线
	
	cxt.lineWidth = 1;
	cxt.lineStyel = '#F00';

	cxt.moveTo(row_w,h - h*cfg.data[0][1]);

	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];

		cxt.lineTo(x,y)
		console.log(x,y);
	}
	cxt.stroke();
	


	return component;
}