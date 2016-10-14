(function(jQuery) {
	var $ = jQuery;

	/*$.fn.modelJ = function(argument) {
		console.log('argument')
	}*/
	function ModelJ(){
		
	}
	ModelJ.prototype.show = function(){
		console.log('show');
		return this;
	}
	ModelJ.prototype.close = function(){
		console.log('close');
		return this;
	}

	var Toast = function(config){
		this.option = config || {};
		console.log(this.option);
	}

	Toast.prototype = new ModelJ();






	jQuery.modelJ = function(config){
		return new Toast(config);
	}

})(jQuery)

//toast 提示
$.modelJ({
	model:'toast',
	type:'success',
	text:'成功',
	config:{
		textColor:'#fff'
	}
});

//alert 提示框
/*$.modelJ({
	model:'alert',
	type:'success',
	msg:{
		title:'',
		main:''
	},
	buttons:[{
		text:'',
		config:{},
		callback:function(){}
	},{
		text:'',
		config:{},
		callback:function(){}
	}]
});
*/








