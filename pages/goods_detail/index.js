import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: null,
        isCollect: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length-1];
        let options = currentPage.options;

        let goods_id = options.goods_id;
        this.getGoodsDetail({goods_id: goods_id})
    },

    async getGoodsDetail(data) {
        let goodsObj = await request({ url: '/goods/detail', data });
        let collect = wx.getStorageSync('collect') || [];
        
        let isCollect = collect.some(v => v.goods_id === goodsObj.goods_id);

        this.setData({
            // goodsObj: {
            //     goods_name: goodsObj.goods_name,
            //     goods_price: goodsObj.goods_price,
            //     // iphone部分手机 不识别 webp图片格式 
            //     // 最好找到后台 让他进行修改 
            //     // 临时自己改 确保后台存在 1.webp => 1.jpg 
            //     goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
            //     pics: goodsObj.pics,
            //     goods_id: goodsObj.goods_id
            // }
            goodsObj,
            isCollect
        });
    },
    handlePreviewImage(e) {
        const urls = this.data.goodsObj.pics.map(item => item.pics_mid);
        const currentIndex = e.currentTarget.dataset.index;
        wx.previewImage({
            current: urls[currentIndex],
            urls: urls
        })
    },
    // 点击 加入购物车
    handleCartAdd(e) {
        // 1. 获取缓存中的购物车 
        let cart = wx.getStorageSync('cart') || [];
        // 2. 判断商品对象是否存在于在数组中
        let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id);
        if(index === -1) {
            // 说明购物车中没有此商品
            this.data.goodsObj.num = 1; 
            this.data.goodsObj.checked = true;
            cart.push(this.data.goodsObj);
        } else {
            cart[index].num++;
        }
        // 把修改后的cart塞回缓存中
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '添加成功',
            icon: 'success',
            mask: true
        })
    },
    handleCollect(e) {
        let isCollect = false;
        let goodsObj = this.data.goodsObj;
        let collect = wx.getStorageSync('collect') || [];
        let index = collect.findIndex(v => v.goods_id === goodsObj.goods_id);
        if (index !== -1) {
            // 已经收藏过了，那就是取消收藏
            collect.splice(index, 1);
            isCollect = false;
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              mask: true
            });
        } else {
            collect.push(goodsObj);
            isCollect = true;
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              mask: true
            });

        }
        wx.setStorageSync('collect', collect);
        this.setData({
            isCollect
        });

    }
})