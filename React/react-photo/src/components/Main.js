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



class AppComponent extends React.Component {
  render() {
    return (
    	<section className="stage">
        	<section className="img-sec">
            </section>
        	<nav className="controller-nav">
            </nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
