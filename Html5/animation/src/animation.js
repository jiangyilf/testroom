/**Create By LeoJo**/
'use strict';

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;


//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

//简单的函数封装,callback函数
function next(callback){
	callback && callback();
}

/**
*帧动画库类
*@constructor
**/
function Animation(){
	//任务链
	this.taskQueue = [];

	this.index = 0;

	this.timeline = new Timeline();
	this.state = STATE_INITIAL;
};

/**
*添加一个图片预加载
*@param imgList 图片数组
**/
Animation.prototype.loadImage = function(imgList){
	var taskFn = function(next){
		loadImage(imgList.slice(), next);
	};

	var type = TASK_SYNC;

	return this._add(taskFn , type);

};

/**
*添加一个异步定时任务，通过定时改变图片位置，实现帧动画
*@param ele dom对象
*@param position 背景位置数组
*@param imgUrl 图片地址
**/
Animation.prototype.changePosition = function(ele,position,imageUrl){
	var len = position.length;
	var taskFn;
	var type;
	if(len){
		var self = this;
		taskFn = function(next,time){
			if(imageUrl){
				ele.style.backgroundImage = 'url('+ imageUrl +')';
			}
			var index = Math.min(time/self.interval | 0, len-1 );
			var position = position[index].split(' ');
		
			//改变dmo对象背景图
			ele.style.backgroundPosition = position[0] +'px '+ position[1] + 'px';
			if(index === len - 1){
				next();
			}
		}
		type = TASK_ASYNC;
	} else {
		taskFn = next;
		type = TASK_SYNC;
	}
	return this._add(taskFn,type);
};

/**
*添加一个异步定时任务，通过定时改变图片image表圈的src属性
*@param ele dom对象
*@param imgUrl 图片地址
**/
Animation.prototype.changeSrc = function(ele,imgList){
	var len = imgList.length;
	var taskFn;
	var type;
	if(len){
		var self = this;
		var taskFn = function(next,time){
			//获得当前图片索引
			var index = Math.min(time/self.interval | 0,len-1);
			//改变images对象的图片地址
			ele.src = imgList[index];
			if(index === len - 1){
				next();
			}
		}
		type = TASK_ASYNC;
	} else{
		taskFn = next;
		type = TASK_SYNC;
	}

	return this._add(taskFn,type);
};

/**
*高级用法,添加一个异步定时执行任务
*该任务定义动画每帧执行的任务函数
*@param taskFn 每帧执行的任务函数
**/
Animation.prototype.enterFrame = function(taskFn){
	return this._add(taskFn,TASK_ASYNC);
};

/**
*添加一个同步任务，可以在上一个任务完成后执行回调函数
*@param callback 回调函数
**/
Animation.prototype.then = function(callback){
	var taskFn = function(next){
		callback();
		next();
	};
	var type = TASK_SYNC;

	return this._add(taskFn,type);
};
/**
*开始执行任务 异步定义执行任务时间间隔
*param interval
**/
Animation.prototype.start = function(interval){
	if(this.state === STATE_START){
		return this;
	}

	//如果任务链中没有任务，则返回
	if(!this.taskQueue.length){
		return this;
	}

	this.state = STATE_START;
	this.interval = interval;
	this._runTask(); //执行任务
	return this;
};

/**
*添加一个任务 改任务就是回退到上一个任务中
*实现重复上一个任务效果，可以定义重复的次数
*param times 重复次数
**/
Animation.prototype.repeat = function(times){
	var self = this;
	var taskFn = function(){
		if(typeof times === 'undefined'){
			//无限回退到上一个任务
			self.index --;
			self._runTask();
			return;
		}
		if(times){
			times--;
			//回退
			self.index--;
			self._runTask();
		} else{
			//达到重复次数，跳转到下一个任务
			var task = self.taskQueue[self.index];
			me._next(task);
		}
	};
	var type = TASK_SYNC;

	return this._add(taskFn,type);
};

/**
*添加一个同步任务，相当于repeat()更友好的接口，无限循环上次任务
**/
Animation.prototype.repeatForever = function(){
	return this.repeat();
};

/**
*设置当前任务执行结束后到下一个任务开始的等待时间
*param time 等待时长
**/
Animation.prototype.wait = function(time){
	if(this.taskQueue && this.taskQueue.length > 0){
		this.taskQueue[this.taskQueue.length - 1].wait = time;
	}
	return this;
};

/**
*暂停当前异步定时任务
**/
Animation.prototype.pause = function(){
	if(this.state === STATE_START){
		this.state = STATE_STOP;
		this.timeline.stop();
		return this;
	}
	return this;
};

/**
*重新执行上一次暂停的异步任务
**/
Animation.prototype.restart = function(){
	if(this.state === STATE_STOP){
		this.state = STATE_START;
		this.timeline.restart();
		return this;
	}
	return this;
};

/**
*释放资源
**/
Animation.prototype.dispose = function(){
	if(this.state !== STATE_INITIAL){
		this.state = STATE_INITIAL;
		this.taskQueue = null;
		this.timeline.stop();
		this.timeline = null;
		return this;
	}
	return this;
};

/**
*添加一个任务
*@param taskFn 任务方法
*@param type 任务类型
*@private
**/
Animation.prototype._add = function(taskFn,type){
	this.taskQueue.push({
		taskFn:taskFn,
		type:type
	});
	return this;
}

/**
*执行任务
*@private
**/
Animation.prototype._runTask = function(){
	if (!this.taskQueue || this.state !== STATE_START) {
		return;
	}
	//任务执行完毕
	if(this.index === this.taskQueue.length){
		this.dispose();
		return;
	}

	//获取任务链上的当前任务
	var task = this.taskQueue[this.index];
	if(task.type === TASK_SYNC){
		this._syncTasK(task);
	}else{
		this._asyncTask(task);
	}
}

/**
*同步任务
*@param task 执行的任务对象
*@private
**/
Animation.prototype._syncTasK = function(task){
	var self = this;
	var next = function(){
		//切换到下一个任务
		self._next(task);
	}

	var taskFn = task.taskFn;
	taskFn(next);
}

/**
*异步任务
*@param task 执行的任务对象
*@private
**/
Animation.prototype._asyncTask = function(task){
	var self = this;

	//定义每一帧执行的回调函数
	var enterFrame = function(time){
		var taskFn = task.taskFn;
		var next = function(){
			//停止当前任务
			self.timeline.stop();
			//执行下一个任务
			self._next(task);
		};
		taskFn(next,time);

	};

	this.timeline.onenterframe = enterFrame;
	this.timeline.start(this.interval);

}

/**
*切换到下一个任务,如果当前需要延时
*@param task 当前任务
*@private
**/
Animation.prototype._next = function(task){
	this.index++;
	var self = this;

	task.wait ? setTimeout(function(){
		self._runTask();
	},task.wait) : this._runTask();;
	
}




