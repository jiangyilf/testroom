/**Create By LeoJo**/
'use strict';

var loadImage = require('./imageLoader');


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


/**
*帧动画库类
*@constructor
**/
function Animation(){
	//任务链
	this.taskQueue = [];

	this.index = 0;
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
*@param positions 背景位置数组
*@param imgUrl 图片地址
**/
Animation.prototype.changePosition = function(ele,positopn,imgUrl){

};

/**
*添加一个异步定时任务，通过定时改变图片image表圈的src属性
*@param ele dom对象
*@param imgUrl 图片地址
**/
Animation.prototype.changeSrc = function(ele,imgList){

};

/**
*高级用法,添加一个异步定时执行任务
*该任务定义动画每帧执行的任务函数
*@param taskFn 每帧执行的任务函数
**/
Animation.prototype.enterFrame = function(taskFn){

};

/**
*添加一个同步任务，可以在上一个任务完成后执行回调函数
*@param callback 回调函数
**/
Animation.prototype.then = function(callback){

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

};

/**
*添加一个同步任务，相当于repeat()更友好的接口，无限循环上次任务
**/
Animation.prototype.repeatForever = function(){

};

/**
*设置当前任务执行结束后到下一个任务开始的等待时间
*param time 等待时长
**/
Animation.prototype.wait = function(time){

};

/**
*暂停当前异步定时任务
**/
Animation.prototype.pause = function(){

};

/**
*重新执行上一次暂停的异步任务
**/
Animation.prototype.restart = function(){

};

/**
*释放资源
**/
Animation.prototype.dispose = function(){

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
		self._next();
	}

	var taskFn = task.taskFn;
	taskFn(next);
}

/**
*异步任务
*@param task 执行的任务对象
*@private
**/
Animation.prototype._asyncTasK = function(task){
	
}

/**
*切换到下一个任务
*@private
**/
Animation.prototype._next = function(){
	this.index++;
	this._runTask();
}




