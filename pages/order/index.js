import { request } from "../../request/index.js";
import {formatTime} from "../../utils/util.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
        orders: []

    },

    onShow(options) {
        // const token = wx.getStorageSync("token");
        // if (!token) {
        //     wx.navigateTo({
        //         url: '/pages/auth/index'
        //     });
        //     return;
        // }

        // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
        let pages = getCurrentPages();
        // 2 数组中 索引最大的页面就是当前页面
        let currentPage = pages[pages.length - 1];
        // 3 获取url上的type参数
        const { type } = currentPage.options;
        // 4 激活选中页面标题 当 type=1 index=0 
        this.changeTitleByIndex(type - 1);
        // this.getOrders(type);
        this.getOrderList();
    },
    // 获取订单列表的方法
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } });
        console.log(res);
        // this.setData({
        //     orders: res.orders.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        // })
    },

    getOrderList() {
        let orderList = wx.getStorageSync('orderList') || [];
        // console.log(formatTime(Date()), 'huwei');
        // this.setData({
        //     orders: orderList.map(v => ({...v, create_time_cn: formatTime(v.create_time_cn)}))
        // })
        this.setData({
            orders: orderList
        });
    },
    // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
        // 2 修改源数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => {
            if (i === index) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
        });

        this.setData({
            tabs
        });
    },
    // handleTabsItemChange(e) {
    //     // 1 获取被点击的标题索引
    //     const { index } = e.detail;
    //     this.changeTitleByIndex(index);
    //     // 2 重新发送请求 type=1 index=0
    //     this.getOrders(index + 1);
    // },
    handleTabsItemChange(e) {
        let index = e.detail;
        this.changeTitleByIndex(index);
        //  重新发送请求 type=1 index=0
        this.getOrders(index + 1);

    }


})