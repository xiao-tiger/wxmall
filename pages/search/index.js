import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        // 取消 按钮 是否显示
        isFocus: false,
        // 输入框的值
        inpValue: ""
    },
    TimeId: -1,
    handleInput(e) {
        let { value } = e.detail;
        if(!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false
            })
            return ;
        }
        this.setData({
            isFocus: true
        });
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qsearch(value);
        }, 1000);
    },

    async qsearch(query) {
        let res = await request({ url: '/goods/qsearch', data: { query: query }});
        this.setData({
            goods: res
        });
    },
    handleCancel() {
        this.setData({
            goods: [],
            isFocus: false,
            inpValue: ''
        });
    }
 
})