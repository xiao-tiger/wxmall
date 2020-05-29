import {request} from '../../request/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

    
  },

  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res.map(v => {
          v.navigator_url = v.navigator_url.replace('main', 'index');
          return v;
        })
      });
    })
  },
  getCateList() {
    request({ 
      url: '/home/catitems' 
    })
    .then(res => {
      this.setData({
        cateList: res
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    })
    .then(res => {
      console.log(res);
      this.setData({
        floorList: res.map(v => {
          let item = v.product_list;
          item.forEach(v1 => {
            v1.navigator_url = v1.navigator_url.replace('/pages/goods_list', '/pages/goods_list/index');
          });
          return v
        })
      })
    })
  }

})