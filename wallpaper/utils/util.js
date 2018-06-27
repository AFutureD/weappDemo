class API {
    constructor() {
        this.KEY = 'WallpaperJson';
        this.API = 'http://YOUR-DOMAIN/getwallpaper';
    }

    /**
     * 解析数据格式
     */
    formatData(data) {
        var objectData  = JSON.parse(data)
        return new_data;
    }

    /**
     * 获取数据
     */
    getData() {
        return new Promise((RES, REJ) => {
            // 获取缓存
            var HAS_CACHE = this.getCache();
            if (HAS_CACHE !== false) 
                return RES(HAS_CACHE);
            // 请求数据
            wx.request({
                url: this.API,
                method: 'GET',
                dataType: 'json',
                success: ret => {
                    console.log(ret.data)
                    var datas = ret.data;
                    // 存储缓存
                    console.log("datas")
                    console.log(datas)
                    wx.setStorageSync(this.KEY, datas);
                    RES(datas);
                },
                fail: REJ
            })
        });
    }

    /**
     * 获取本地缓存
     */
    getCache() {
        var datas = wx.getStorageSync(this.KEY);
        if (!datas) return false;
        // 判断时间
        var data = datas[0];
        console.log(new Date)
        if (data.date === new Date())
            return datas;
        return false;
    }
}

module.exports = new API();