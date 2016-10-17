/*
* create by YiJiang
* MIT
*/

(function(jQuery) {
	var $ = jQuery;

	/*$.fn.modelJ = function(argument) {
		console.log('argument')
	}*/
/*	function ModelJ(){
		
	}
	ModelJ.prototype.show = function(){
		console.log('show');
		$('#'+this.id).fadeIn();
		return this;
	}
	ModelJ.prototype.close = function(){
		console.log('close');
		$('#'+this.id).hide();
		return this;
	}*/

	/*----Toast----*/
	var Toast = function(config){
		this.option = config || {};

		this.render();
		this.show();
		//console.log(this.option);
	}
	//Toast.prototype = new ModelJ();

	Toast.prototype.render = function(){
		this.id = ('toast_'+ Math.random()).replace('.','_');

		var type = this.option.type || 'success';
		var _toast = $('<div class="toast '+ type +'" id="'+ this.id +'"></div>');
		var _toastHd = $('<div class="toast-hd"><i class="icon-'+ type +'"></i></div>');
		var _toastMsg = $('<div class="toast-msg">');

		_toastMsg.text(this.option.text || '已完成');
		this.option.media && _toastMsg.css(this.option.media);

		_toast.append(_toastHd);
		_toast.append(_toastMsg);

		$('body').append(_toast);
	}
	Toast.prototype.show = function(){
		var self = this;
		$('#'+this.id).fadeIn();
		setTimeout(function(){
			$('#'+self.id).hide().remove();
		},self.delay*1000 || 1000);
	}


	/*----alert----*/
	var Dialog = function(config){
		this.option = config || {};

		this.render();
		this.show();
		//console.log(this.option);
	}
	//Dialog.prototype = new ModelJ();
	Dialog.prototype.close = function(){
		$('html').css('overflow','auto');
		$('#modal-overlay').hide();
		$('#'+this.id).hide().remove();
	}
	Dialog.prototype.show = function(){
		$('html').css('overflow','hidden');
		$('#modal-overlay').show();
		$('#'+this.id).fadeIn();
	}
	Dialog.prototype.createHd = function(text){
		var _hd = $('<div class="dialog-hd"></div>');
		var _hdMsg = $('<strong class="dialog-hd__title"></strong>');

		_hdMsg.text(text);
		_hd.append(_hdMsg);

		return _hd;
	}
	Dialog.prototype.createBd = function(text){
		var _bd = $('<div class="dialog-bd"></div>');
		var _bdMsg = $('<p class="dialog-bd__msg">');

		_bdMsg.text(text);
		_bd.append(_bdMsg);

		return _bd;
	}
	Dialog.prototype.createFt = function(btns){
		var self = this;
		var _ft = $('<div class="dialog-ft"></div>');
		var btns = btns || [{text:'确定',media:{color:'#0BB20C'}}];

		$.each(btns,function(index,item){
			var _i = $('<a href="javascript:;" class="btn"></a>');

			_i.text(item.text);

			if(index == 1){
				_i.addClass('btn-primary');
			}

			/*回调函数*/
			if(item.callback && typeof item.callback === 'function'){
				_i.on('click',function(){
					self.close();
				});
				_i.on('click',item.callback);
			} else {
				_i.on('click',function(){
					self.close();
				});
			}

			/*button css*/
			if(item.media){
				_i.css(item.media);
			}
			
			_ft.append(_i);
		})

		return _ft;
	}
	Dialog.prototype.render = function(){
		var option = this.option;
		this.id = ('dialog_'+ Math.random()).replace('.','_');
		var _dialog = $('<div class="dialog" id="'+ this.id +'">');

		//判断时候带有title的dialog
		if(option.type == 'title'){
			_dialog.addClass('title-title');
			_dialog.append(this.createHd(option.msg['title']));
		} else{
			_dialog.addClass('dialog-no-title');
		}

		_dialog.append(this.createBd(option.msg['main']));
		_dialog.append(this.createFt(option.buttons));

		//绘制 modal-overlay
		var _overlay = $('#modal-overlay').length;
		if(_overlay == 0){
			$('body').append($('<div class="modal-overlay" id="modal-overlay"></div>'));
		}

		$('body').append(_dialog);
	}

	jQuery.modelJ = function(config){
		switch(config.model){
			case 'toast':
				return new Toast(config);
				break;
			case 'alert':
				return new Dialog(config);
				break;
			default:
		}
		//return new Dialog(config);
	}

})(jQuery)

//toast 提示
/*$.modelJ({
	model:'toast',
	type:'loading',
	text:'加载中',
	delay:1,
	media:{
		color:'#fff'
	}
});
*/
//alert 提示框
/*$.modelJ({
	model:'alert', //必选
	type:'title',	//可选，默认为不带title的dialog
	msg:{
		title:'我是标题',
		main:'弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内' //必选
	},
	buttons:[{
		text:'取消',
		media:{
			color:'red'
		},
		callback:function(){
			console.log('取消');
		}
	},{
		text:'确定',
		media:{},
		callback:function(){
			console.log('确定');
		}
	}] //可选填，不选择默认一个确定按钮
});*/









