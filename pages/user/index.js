// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        collectNums: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || {};
        let collect = wx.getStorageSync('collect') || [];

        let collectNums = collect.length;

        this.setData({
            userinfo,
            collectNums
        });

    },

  
})