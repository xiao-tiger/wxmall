
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// 1 获取用户的收货地址
//   1 绑定点击事件
//   2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress
//   2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
//     1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
//       scope 值 true 直接调用 获取收货地址
//     2 假设 用户 从来没有调用过 收货地址的api 
//       scope undefined 直接调用 获取收货地址
//     3 假设 用户 点击获取收货地址的提示框 取消   
//       scope 值 false 
//       1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
//       2 获取收货地址
//     4 把获取到的收货地址 存入到 本地存储中 

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow: function (options) {
        let address = wx.getStorageSync('address') || {};
        let cart = wx.getStorageSync('cart') || [];

        // [].every()  遍历数组中的每一项，如果有一项是false，返回false
        // 只有全部为true，结果才是true
        // 空数组调用every方法返回的也是true
        // let allChecked = cart.length? cart.every(v => v.checked): false;

        let totalPrice = 0, totalNum = 0;
        let allChecked = true;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.goods_price * v.num;
                totalNum += v.num;
            } else {
                allChecked = false;
            }
        });
        allChecked = cart.length? allChecked: false;

        this.setData({
            address,
            cart,
            allChecked,
            totalPrice,
            totalNum
        });
    },

    async handleChooseAddress() {
        // wx.chooseAddress({
        //   complete: (res) => {
        //       console.log(res);
        //   },
        // })
        // 查看是否有权限打开地址
        // wx.getSetting({
        //     complete: (res) => {
        //         // 没有就去openSetting
        //         if (res.authSetting['scope.address'] === false) {
        //             wx.openSetting({
        //                 complete: (res) => {
        //                     console.log(res);
        //                 },
        //             })
        //         } else {
        //             wx.chooseAddress({
        //                 complete: (res) => {
        //                     console.log(res, 'hu');
        //                 },
        //             })
        //         }
        //     },
        // });
        let res = await getSetting();
        if (res.authSetting['scoped.address'] === false) {
            await openSetting();
        }
        let address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync('address', address);
    },
    handeItemChange(e) {
        let goods_id = e.currentTarget.dataset.id;
        let cart = this.data.cart;
        let index = cart.findIndex(v => v.goods_id===goods_id);
        cart[index].checked = !cart[index].checked;

        this.setCart(cart);
    },
    // 全选
    handleItemAllCheck() {
        let {cart, allChecked} = this.data;
        allChecked = !allChecked;
        cart.forEach(v => {
            v.checked = allChecked;
        })

        this.setCart(cart);
    },
    // 改变商品数量
    async handleItemNumEdit(e) {
        let {cart} = this.data;
        let {id, operation} = e.currentTarget.dataset;
        let index = cart.findIndex(v => v.goods_id === id);

        if (cart[index].num === 1 && operation === -1) {
            // 删除
            let res = await showModal('你确定要删除么？');
            console.log(res);
            if (res.confirm) {
                cart.splice(index, 1);
            }
        } else {
            cart[index].num += operation;
        }
        this.setCart(cart);

    },
    // 每次操作都要修改totalPrice allChecked totalNum
    setCart(cart) {
        let totalPrice = 0, totalNum = 0;
        let allChecked = true;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.goods_price * v.num;
                totalNum += v.num;
            } else {
                allChecked = false;
            }
        });
        allChecked = cart.length? allChecked: false;

        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        });
        wx.setStorageSync('cart', cart);
    },
    // 支付页面
    async handlePay() {
        console.log('hha');
        if (!this.data.address.userName) {
            await showToast('你还没有填写收获地址')
            return ;
        }
        if (!this.data.totalNum) {
            await showToast('你还没有选购商品');
            return ;
        }
        // 跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/index'
        })
    }
})
