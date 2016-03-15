/* 散点图表组件对象 */

var H5ComponentPoint = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var base = cfg.data[0][1];  //以第一个数据 大小比例为100%

	$.each(cfg.data,function(idx,item){
		var point = $('<div class="point point_'+ idx +'">');
		//point.text(item[0]+'-'+item[1]);
		var name = $('<div class="name">'+ item[0] + item[1]*100 +'%</div>');
		var rate = $('<div class="per">'+ item[1]*100 +'%</div>');
		name.append(rate);
		point.append(name);

		var per = (item[1]/base * 100) + '%';
		point.width(per).height(per);

		if(item[2]){
			point.css('backgroundColor',item[2]);
		}

		if(item[3] !== undefined && item[4] !==undefined){
			point.css({'left':item[3],'top':item[4]});
			point.data('left',item[3]).data('top',item[4]);
		}
		 // 设置zIndex、重设位置
		 point.css('zIndex',100-idx);
		 point.css({'left':0,'top':0});

		 point.css('transition','all 1s '+idx*.5+'s');

		component.append(point);
	});

	component.on('onLoad',function(){
		component.find('.point').each(function(idx,item){
			$(item).css({
				left:$(item).data('left'),
				top:$(item).data('top')
			})
		});
	});
	component.on('onLeave',function(){
		component.find('.point').each(function(idx,item){
			$(item).css({
				left:0,
				top:0
			})
		});
	});

	return component;
}