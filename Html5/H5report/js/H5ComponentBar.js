/* 柱图组件对象 */
var H5ComponentBar = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	$.each(cfg.data,function(idex,item){

		var line = $('<div class="line">');
		var name = $('<div class="name">');
		var rate = $('<div class="rate">');
		var per = $('<div class="per">');
		name.text(item[0]);

		var width = item[1]*100 + '%';
		rate.css('width',width);
		var bgstyle = '';
		if(item[2]){
			bgstyle = 'style="background-color:'+ item[2] +'"';
		}

		rate.html('<div class="bgcolor" '+ bgstyle +'></div>');

		per.text(item[1]*100+'%');

		line.append(name).append(rate).append(per);
		component.append(line);

	});

	return component;
}
