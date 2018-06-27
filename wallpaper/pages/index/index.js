//index.js
//获取应用实例

var {
    API
} = getApp();


Page({
    data: {
        thumb: "?imageView2/2/w/300",
        wallpaperListInfo: null,
        btnIsChecked: true
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        this.onPullDownRefresh();
    },

    onPullDownRefresh: function() {
        this.setData({
            LOADING: true
        });
        API.getData().then(datas => {
            this.setData({
                "wallpaperListInfo": datas,
                LOADING: false
            })
        })
    },
    tapped: function(name) {
        console.log("IN Function")
        this.setData({
            LOADING: true
        });
        API.getData().then(datas => {
            if (name === "New") {
                datas.sort((a, b) => {
                    return a.uploadTime > b.uploadTime;
                })
            } else {
                datas.sort((a, b) => {
                    return a.countID < b.countID;
                })
            }
            this.setData({
                "wallpaperListInfo": datas,
                LOADING: false
            })
        })
        return true
    },
    btnTapGalleryChange: function(e) {
        var name = e.currentTarget.dataset.text
        console.log(name)
        if (this.tapped(name)) {
            if (name === "New") {
                console.log("IN NEW")
                this.setData({
                    btnIsChecked: true,
                })
            } else {
                console.log("IN ALL")
                this.setData({
                    btnIsChecked: false,
                })
            }
        }
    },
    toShow: function(e) {
        console.log("IN toShow function")
        var srcURL = e.currentTarget.dataset.imgsrc
        console.log(srcURL)
        wx.navigateTo({
            url: '../showPage/showPage' + '?imgsrc=' + srcURL
        })
    }

});