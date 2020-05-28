import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取本地的数据， {time: Date.now(), data: data}
        const Cates = wx.getStorageSync('cates');
        
        if(!Cates) {
            // 如果本地没有缓存，那就发起请求
            this.getCategroy();
        } else {
            // 判断本地缓存数据是否过期
            if(Date.now() - Cates.time > 1000*300) {
                // 为 true 说明，超过了过期时间 发送请求
                this.getCategroy();
            } else {
                // 使用本地的缓存数据
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(item => item.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                });
            }
        }
    },

    async getCategroy() {
        // request({
        //     url: '/categories'
        // })
        // .then(res => {
        //     this.Cates = res;
        //     wx.setStorageSync('cates', {
        //         time: Date.now(),
        //         data: this.Cates
        //     });

        //     let leftMenuList = this.Cates.map(item => item.cat_name);
        //     let rightContent = this.Cates[0].children;
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     });
        // })
        // 这行代码没有执行结束，后面是不会执行的
        let res = await request({ url: '/categories' });
        this.Cates = res;
        wx.setStorageSync('cates', {
            time: Date.now(),
            data: this.Cates
        });
        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        });

    },
    handleItemTap(e) {
        let {index} = e.target.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0
        })
    }
   
})