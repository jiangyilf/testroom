var Api = require("../../utils/api");
var Util = require("../../utils/util");


Page({
    data:{
        title: '话题详情',
        detail: {},
        replies: []
    },
    onLoad:function(option){
        console.log(option);
        this.featchDetail(option.id);
    },
    featchDetail:function(id){
        var _self = this;
        wx.request({
          url: Api.getTopicInfo({
              id:id
          }),
          method: 'GET',
          success: function(res){
            res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created));
            //console.log(res.data[0]);
            _self.setData({
                detail: res.data[0]
            });
          }
        });
        this.featchReplies(id);
    },
    featchReplies:function(id){
        var _self = this;
        wx.request({
          url: Api.getReplies({
              topic_id: id
          }),
          success: function(res){
            res.data.forEach(function(item) {
                item.created = Util.formatTime(Util.transLocalTime(item.created));
            });
            _self.setData({
                replies: res.data
            });
          }
        })

    }
});