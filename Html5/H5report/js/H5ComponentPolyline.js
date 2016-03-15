/* 柱图组件对象 */
var H5ComponentPolyline = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;
	var length = cfg.data.length;
	var x,y;
	//创建画布
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	//绘制背景   水平网格线
	
 	var step = 10 //水平网格线 100份 ==> 10
 	ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';

 
	for(var i=0;i<step+1;i++){
		y = (h/step) * i
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}

	//竖直网格线
	step = length + 1;
	var text_w = w/step >> 0;

	for(var i=0;i<step+1;i++){
		x = (w/step) * i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		if(cfg.data[i]){
			var text = $('<div class="polyline-item-name"></div>');
			text.text( cfg.data[i][0] );
			text.css({'width':text_w/2,'top':h/2,'left':x/2+text_w/4});
			component.append(text);
		}
	}
    ctx.stroke();
    ctx.closePath();

    //绘制数据
    var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	
	//绘制点
	var row_w = w/(length+1);
	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];

		ctx.beginPath();
		ctx.arc(x,y,8,0,2*Math.PI,false);
		ctx.closePath();
		ctx.fillStyle = "#F00";
		ctx.fill();
	}

	//连线 及阴影

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#F00';

	ctx.moveTo(row_w,h - h*cfg.data[0][1]);

	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];
		ctx.strokeText(cfg.data[i][1]*100+'%',x - 10,y - 20);
		ctx.lineTo(x,y);
	}
	ctx.stroke();

	ctx.lineTo(x,h);
	ctx.lineTo(row_w,h);
	ctx.closePath();
	ctx.fillStyle = "rgba(255, 118, 118, 0.2)";
	ctx.fill();
	
	//绘制数据
	ctx.beginPath();

	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];
		ctx.strokeStyle = cfg.data[i][2] ? cfg.data[i][2] : '#595959';
		ctx.strokeText(cfg.data[i][1]*100+'%',x - 10,y - 20);
	}
	
	ctx.fill();

	for(var i=0;i<length;i++){
		x = row_w * i + row_w;
		y = h - h*cfg.data[i][1];
		
		ctx.strokeText(cfg.data[i][1]*100+'%',x - 10,y - 20);
	}
	component.addEventListener('onLoad',function(){
		var timer = window.requestAnimationFrame();
	});


	return component;
}