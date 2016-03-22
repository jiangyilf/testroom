/* 雷达图组件对象 */

var H5ComponentRadar = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;
	var length = cfg.data.length;
	var x,y,
		r = w/2;
	var step = 10;
	//创建画布
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	//绘制背景   
	
 	
 	/*ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2*Math.PI,false);
    ctx.stroke();*/

    /*  计算一个多边形的坐标，以圆来确定
    	已知圆心坐标（a,b），半径r,角度 deg
    	rad = (2*Math.PI / 360) * (360/?)
		x = a + Math.sin(rad) * r;
		y = b + Math.cos(rad) * r;
    */

    /*ctx.beginPath();
    for(var i=0;i<cfg.data.length;i++){

    	rad = (2*Math.PI / 360) * (360/cfg.data.length) * i
		x = r * Math.sin(rad) + r;
		y = r * Math.cos(rad) + r;
		//ctx.arc(x,y,5,0,2*Math.PI,false); //test
		ctx.lineTo(x,y);
    	
    }
    ctx.closePath();
    ctx.stroke();*/


    //绘制雷达背景
    function drawRadar(cfg,scale = 1,isBlue = false){
	    ctx.beginPath();
	    for(var i=0;i<cfg.data.length;i++){

	    	rad = (2*Math.PI / 360) * (360/cfg.data.length) * i
			x = r + Math.sin(rad) * r * scale;
			y = r + Math.cos(rad) * r * scale;
			//ctx.arc(x,y,5,0,2*Math.PI,false); //test
			ctx.lineTo(x,y);
	    }
	    ctx.closePath();
	    ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff':'#f1f9ff';
	    ctx.fill();
    }

    var isBlue = false;
    for( step ; step>0 ; step--){
    	isBlue = !isBlue;
    	drawRadar(cfg,step/10,isBlue);
    }
    
    //绘制伞状图
    for(var i=0;i<cfg.data.length;i++){
    	ctx.beginPath();
    	ctx.moveTo(r,r);
    	rad = (2*Math.PI / 360) * (360/cfg.data.length) * i
		x = r + Math.sin(rad) * r ;
		y = r + Math.cos(rad) * r ;
		ctx.lineTo(x,y);
		ctx.strokeStyle = '#eee';
		ctx.stroke();
		var radarTitle = $('<div class="radar-title">'+ cfg.data[i][0] +'</div>');
		if(x > w/2){
			radarTitle.css('left',x/2);
		} else {
			radarTitle.css('right',(w-x)/2);
		}
		if(y > h/2){
			radarTitle.css('top',y/2);
		} else {
			radarTitle.css('bottom',(h-y)/2);
		}
		
		component.append(radarTitle);
    }

    //创建画布
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

    //绘制数据点
	/*per 动画的百分比*/
	function draw( per ){
		ctx.clearRect(0,0,w,h);

		for(var i=0;i<cfg.data.length;i++){
	    	ctx.beginPath();
	    	rad = (2*Math.PI / 360) * (360/cfg.data.length) * i
			x = r + Math.sin(rad) * r * cfg.data[i][1] * per;
			y = r + Math.cos(rad) * r * cfg.data[i][1] * per;
			ctx.arc(x,y,5,0,2*Math.PI,false);
			ctx.fillStyle = '#ff7676';
			ctx.fill();
			ctx.closePath();
	    }

	    ctx.beginPath();
	    for(var i=0;i<cfg.data.length;i++){
	    	rad = (2*Math.PI / 360) * (360/cfg.data.length) * i
			x = r + Math.sin(rad) * r * cfg.data[i][1] * per;
			y = r + Math.cos(rad) * r * cfg.data[i][1] * per;
			ctx.lineTo(x,y);
	    }
	    ctx.closePath();
	    ctx.strokeStyle = '#ff7676';
	    ctx.fillStyle = 'rgba(255, 118, 118, 0.2)';
	    ctx.fill();
	    ctx.stroke();

	}


	//draw(1);
	component.on('onLoad',function(){
		var i=0;
		timer = setInterval(function(){
			i += 0.1;
			if(i>1){
				clearInterval(timer);	
			}
			draw(i);
		},50);
	});

	component.on('onLeave',function(){
		var i=1;
		timer = setInterval(function(){
			i -= 0.1;
			if(i<0){
				clearInterval(timer);	
			}
			draw(i);
		},50);
	});



	return component;
}