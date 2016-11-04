var Api = require("../../utils/api");

Page({
    data:{
        list:[],
        scrollHeight:0,
        scrollTop:0,
        page:1,
        hidden:true,
    },
    onLoad:function(){
        var _self = this;
        wx.getSystemInfo({
            success:function(res){
                //console.log(res)
                _self.setData({
                    scrollHeight:res.windowHeight
                });
            }
        });
    },
    onShow:function(){
        this.featchData()
    },
    redictDetail:function(e){
        //console.log(e.currentTarget.id);
        var id = e.currentTarget.id;
        var url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url:url
        });
    },
    handleFetch:function(e){
        //console.log(e);
        var page = this.data['page'];
        if(this.data['hidden']){
            this.setData({
                hidden:false
            })
            this.featchData(page);
        }
    },
    featchData:function(){
        var _self = this;
        var page = this.data['page'];
        wx.request({
            url:Api.getLatestTopic({
                p: page
            }),
            success:function(res){
                page++;
                var _list = _self.data.list;
                Array.prototype.push.apply(_list, res.data);           
                _self.setData({
                   list:_list,
                   page:page,
                   hidden:true
                });
            }
        });
    }
})