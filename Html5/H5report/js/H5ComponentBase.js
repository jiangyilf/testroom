/* 基本图文组件对象 */

var H5ComponentBase = function(name,cfg){
	var cfg = cfg || {};
	var id  = ('h5_c_' + Math.random()).replace('.','_');
	var cls = ' h5_component_'+cfg.type;
	var component = $('<div class="h5_component '+  cls + ' h5_component_name_' + name + '" id="'+ id+'"></div>');

	cfg.text   && component.text(cfg.text);
	cfg.width  && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);

	cfg.css    && component.css(cfg.css);
	cfg.bg     && component.css('backgroundImage','url('+ cfg.bg +')');

	if (cfg.center === true) {
		component.css({
			marginLeft : (cfg.width/4) * -1 + 'px',
			left : '50%'
		})
	}
	//自定义参数
	if(typeof cfg.onclick === 'function'){
		component.on('click',cfg.onclick);
	}

	/*if(cfg.relativeTo){
		var parent = $('body').find('h5_component_name_'+cfg.relativeTo);
		var position = {
			left:$(parent)[0].offsetLeft,
			top:$(parent)[0].offsetTop
		}
		component.css('transform','translate('+position.left+'px,'+position.top+'px)');
	}*/

	component.on('onLeave',function(){

		setTimeout(function(){
			component.addClass(cls+'_leave').removeClass(cls+'_load');
	    	cfg.animationOut && component.animate( cfg.animationOut );
		},cfg.delay || 0);
	    
	    return false;    //阻止事件的无限传播
	});
	component.on('onLoad',function(){

		setTimeout(function(){
			component.addClass(cls+'_load').removeClass(cls+'_leave');
    		cfg.animationIn && component.animate( cfg.animationIn );
		},cfg.delay || 0);
	    
	    return false;    //阻止事件的无限传播
	});


	return component;
}
