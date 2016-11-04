App({
	onLaunch:function() {
		// Do something initial when launch.
	},
	onShow:function(){
		// Do something when show.
	},
	onHide:function(){
		// Do something when hide.
	},
	getUserInfo:function(cb){
		var that = this;
		if(this.globalData.userInfo){
			typeof cb == "function" && cb(this.globalData.userInfo);
		}else{
			//调用登录接口
			wx.login({
				success:function(){
					wx.getUserInfo({
						success:function(res){
							that.globalData.userInfo = res.userInfo;
							typeof cb == "function" && cb(this.globalData.userInfo);
						}
					})
				}
			});
		}
	},
	globalData:{
		userInfo:null
	}
})