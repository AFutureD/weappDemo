//index.js
//获取应用实例

var {
    API
} = getApp();


Page({
    data: {
        imgsrc: null,
        avaliableHeigh: null,
    },
    onLoad: function(param) {
        console.log("IN showPage")
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                console.log(res);
                console.log('height=' + res.windowHeight);
                console.log('width=' + res.windowWidth);
                that.setData({
                    avaliableHeigh: res.windowHeight
                })
            }
        })

        console.log(param)
        this.setData({
            imgsrc: param.imgsrc,
        })
    },
    onShareAppMessage: function(options) {　　
        var that = this;
        var shareObj = {　　　　
            title: "转发",
            path: '/pages/showPage/showPage',
            imgUrl: this.data.imgsrc, 
            success: function(res) {
                if (res.errMsg == 'shareAppMessage:ok') {
                }　　　　
            },
            fail: function() {
                if (res.errMsg == 'shareAppMessage:fail cancel') {
                } 
                else if (res.errMsg == 'shareAppMessage:fail') {
                }　　　　
            },
            complete: function() {

            },　　
        };
        　
        if (options.from == 'button') {　　　　
            // var eData = options.target.dataset;　　　　
            // console.log(eData.name);
            // shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;　　
        }
        　　
        return shareObj;
    },
    saveImgToPhotosAlbumTap: function () {
        wx.downloadFile({
            url: this.data.imgsrc,
            success: function (res) {
                console.log(res)
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (res) {
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 1000//持续的时间
                        })
                    },
                    fail: function (res) {
                        console.log(res)
                        console.log('fail')
                    }
                })
            },
            fail: function () {
                console.log('fail')
            }
        })

    }

});