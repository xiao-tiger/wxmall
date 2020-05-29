import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
    // 获取用户信息
    async handleGetUserInfo(e) {
        // try {

        //     // 1 获取用户信息
        //     const { encryptedData, rawData, iv, signature } = e.detail;
        //     // 2 获取小程序登录成功后的code
        //     const { code } = await login();
        //     const loginParams = { encryptedData, rawData, iv, signature, code };
        //     //  3 发送请求 获取用户的token 没有企业账号 无法获取到token
        //     const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
        //     // 4 把token存入缓存中 同时跳转回上一个页面
        //     wx.setStorageSync("token", 'token');
        //     wx.navigateBack({
        //         // 1 返回上一页  2 返回上两页
        //         delta: 1
        //     });

        // } catch (error) {
        //     console.log(error);
        // }
        const { encryptedData, rawData, iv, signature } = e.detail;
        const { code } = await login();
        wx.setStorageSync("token", code)
        wx.navigateBack({
            // 1 返回上一页  2 返回上两页
            delta: 1
        });
        
    }
})