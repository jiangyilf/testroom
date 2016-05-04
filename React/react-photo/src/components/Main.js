require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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


var ImgFigure = React.createClass({
    render:function(){
        return(
            <figure className="img-figure">
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



class AppComponent extends React.Component {
  render() {
    var controllerUnits = [],
        ImgFigures = [];

    imagesDate.forEach(function(value,index){
        ImgFigures.push(<ImgFigure data={value} ref={'imgfiguer'+ index} key={index}/>)
    })

    return (
    	<section className="stage">
        	<section className="img-sec">
                {ImgFigures}
            </section>
        	<nav className="controller-nav">
                {controllerUnits}
            </nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
