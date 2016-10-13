(function(jQuery) {
	var $ = jQuery;

	$.fn.modelJ = function(argument) {
		console.log('argument')
	}


})(jQuery)


$.modelJ({
	model:'toast',
	type:'success',
	text:'成功',
	config:{
		textColor:'#fff'
	}
});