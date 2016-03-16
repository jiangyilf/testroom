/* 雷达图组件对象 */

var H5ComponentRadar = function(name,cfg){
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
    

	/*per 动画的百分比*/
	function draw( per ){
		
	}


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