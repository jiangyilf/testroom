/* Create by LeoJo*/
'use strict';

/**
*预加载图片
*@param images 图片数组
*@param callback 回调函数
*@param timeout  加载图片时长
**/
function loadImage(images, callback, timeout){
	//加载图片的计数器
	var count = 0;
	//全部图片加载成功的一个标志位
	var success = true;
	//超时timer的id
	var timeoutId = 0;
	//是否加载超时的标志位
	var isTimeout = false;

	for (var key in images) {
		//过滤prototype上的属性
		if(!images.hasOwnProperty(key)){
			continue;
		}
		//获得每个图片元素
		//期望格式是object: {src:xxxxx}
		var item = images[key];

		if(typeof item === 'string'){
			item = images[key] = {
				src : item
			}
		}

		//如果格式不满足期望，则丢弃这条数据进行下一次遍历
		if(!item || !item.src){
			continue;
		}

		//计数器+1
		count++;
		//设置图片id
		item.id = '__img__' + key + getId();
		//设置图片元素img，它是一个image 对象
		item.img = window[item.id] = new Image();

		doLoad(item);
	}

	//遍历完成如果计数器为0，则直接返回
	if(!count){
		callback(success);
	} else if (timeout){
		timeoutId = setTimeout(onTimeout,timeout);
	}

	/**
	*真正实现图片预加载
	*@param item 图片元素对象
	**/
	function doLoad(item){
		item.status = 'loading';

		var img = item.img;

		img.onload = function(){
			success = success & true;
			item.status = 'loaded';
			done();
		}
		img.onerror = function(){
			success = false;
			item.status = 'error';
			done();
		}

		img.src = item.src;

		/**
		*每张图片加载完成的回调函数/不管成功还是失败
		**/
		function done(){
			img.onload = img.onerror = null;
			try{
				delete window[item.id];
			} catch(e) {

			}

			//每张图片完成，计数器减一
			//当所有图片加载完成且没有超时的情况清除计数器且执行回调函数
			if(!--count && !isTimeout){
				clearTimeout(timeoutId);
				callback(success);
			}
		}	
	}
	
	//超时函数
	function onTimeout(){
		isTimeout = true;
		callback(false);
	}
}

var __id = 0;
function getId(){
	return ++__id;
}


module.exports = loadImage;



