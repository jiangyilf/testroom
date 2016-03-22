/* 饼图组件对象 */

var H5ComponentPie = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;
	var length = cfg.data.length;

	//创建画布
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	var r = w/2;

	//绘制底层   
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWitdh = 1;
	ctx.arc(r,r,r,0,2*Math.PI,false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();


   //绘制数据层
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	var colors = ['red','blue','orange','yellow','green'];
	var sAngle = 1.5*Math.PI; //设置起始角度
	var eAngle = 0;

	for(var i=0;i<length;i++){
		var item = cfg.data[i];
		var color = item[2] || ( item[2] = colors.pop() );

		eAngle = sAngle + 2*Math.PI * item[1];

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWitdh = 1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,eAngle,false);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		sAngle = eAngle;
	}

    //绘制蒙板层动画
    var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	component.append(canvas);

	var sAngle = 1.5*Math.PI;

	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWitdh = 1;

	/*per 动画的百分比*/
	function draw( per ){
		ctx.clearRect(0,0,w,h);
		
		ctx.beginPath();
		
		ctx.moveTo(r,r);

		if (per<=0.01) {
			ctx.arc(r,r,r+2,0,2*Math.PI,false);
		} else{
			ctx.arc(r,r,r+2,sAngle,sAngle+2*Math.PI*per,true);
			//console.log((2*Math.PI)*per,per);
		}
		
		//ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
	}


	draw(1);
	component.on('onLoad',function(){
		var i=0;
		timer = setInterval(function(){
			i += 0.1;
			if(i>=0.9){
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









