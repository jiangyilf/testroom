/* 垂直柱图组件对象 */
var H5ComponentBar_v = function(name,cfg){
	var component = new H5ComponentBar(name,cfg);
	component.find('.line').each(function(idex,item){
		$(item).find('.rate').css({
			width:'100%',
			height:cfg.data[idex]*100 + '%'
		});
	});

	return component;
}
