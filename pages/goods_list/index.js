import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            }
        ],
        goodsList: []

    },
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // {cid: 3}
        let {cid} = options;
        this.QueryParams.cid = cid;
        this.getGoodsList(this.QueryParams);

    },

    handelTab(e) {
        let index = e.detail;
        let {tabs} = this.data;
        tabs.forEach((v, i) => {
            if(i === index) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
        });
        this.setData({
            tabs
        })
    },
    async getGoodsList(data) {
        let res = await request({ url: '/goods/search', data });
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        });
        this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize);

        // 关闭上拉刷新样式
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
              title: '已经到底了',
            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList(this.QueryParams);
        }
    },
    onPullDownRefresh: function () {
        this.setData({
            goodsList: []
        });
        this.QueryParams.pagenum = 1;
        this.getGoodsList(this.QueryParams);
    }

})