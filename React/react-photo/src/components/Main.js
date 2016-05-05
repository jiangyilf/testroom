require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';
//获取图片相关数据
var imagesDate = require('../data/imagesDate.json');
//利用自执行函数，获取图片路径
imagesDate = (function genImageUrl(imageDateArr){
	for(var i=0;i<imageDateArr.length;i++){
		var singleDate = imageDateArr[i];

		singleDate.imageUrl = require('../images/'+ singleDate.fileName);
		imageDateArr[i] = singleDate;
	}
	return imageDateArr;
})(imagesDate);

/*
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}
/*
 * 获取 0~30° 之间的一个任意正负值
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}



var ImgFigure = React.createClass({
    handleOnClick:function(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    },
    render:function(){

        var styleObj ={};

        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }

        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return(
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleOnClick}>
                <div className="side-front">
                    <div className="imagebox">
                    <img src={this.props.data.imageUrl}
                         alt={this.props.data.title}
                    />
                    </div>
                    <p className="img-title">{this.props.data.title}</p>
                </div>
                
                <figcaption className="side-back">
                <p className="img-desc">{this.props.data.disc}</p>
                </figcaption>
            </figure>
        )
    }
});



var AppComponent = React.createClass({
  Constant: {
    centerPos:{
        left: 0,
        right: 0
    },
    hPosRange:{
        leftSecX: [0,0],
        rightSecX: [0,0],
        y: [0,0]
    },
    vPosRange:{
        x: [0,0],
        topY:[0,0]
    }
  },
  //重新布局图片
  rearrange:function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //居中
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };
        //上侧
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        });

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };

        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
  },
  inverse:function(index){
    return function(){
        var imgsArrangeArr = this.state.imgsArrangeArr;
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }.bind(this);
  },
  center:function(index){
    return function(){
        this.rearrange(index);
    }.bind(this);
  },
  getInitialState:function(){
    return　{
        imgsArrangeArr: [
            /*{
                pos:{
                    left:'0',
                    top:'0'
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }*/
        ]
    }
  },
  //组件加载后排图片的位置
  componentDidMount: function() {
    var stageDOM = ReactDom.findDOMNode(this.refs.photoStage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
        
    //拿到 imgfiguerDom的大小
    var imgFigureDOM = ReactDom.findDOMNode(this.refs.imgfiguer0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);
    
    //计算图片中心位置点
    this.Constant.centerPos = {
        left:halfStageW - halfImgW,
        top:halfStageH - halfImgH
    }

    //计算左侧右侧图片排布位置
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[0] = stageH - halfImgH;

    //计算上侧的图片
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.rearrange(0);
  },
  render: function() {
    var controllerUnits = [],
        ImgFigures = [];

    imagesDate.forEach(function(value,index){
        if(!this.state.imgsArrangeArr[index]){
            this.state.imgsArrangeArr[index] = {
                pos:{
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
        }

        ImgFigures.push(<ImgFigure data={value} ref={'imgfiguer'+ index} key={index}
                        arrange={this.state.imgsArrangeArr[index]}
                        inverse={this.inverse(index)} center={this.center(index)}/>)
    }.bind(this));

    return (
    	<section className="stage" ref="photoStage">
        	<section className="img-sec">
                {ImgFigures}
            </section>
        	<nav className="controller-nav">
                {controllerUnits}
            </nav>
    	</section>
    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
