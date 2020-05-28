// 同时发送异步代码的次数
let ajaxTimes=0;

const request = (params) => {
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...params.header};
    if(params.url.includes("/my/")){
        // 拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    }
    
    ajaxTimes++;
    wx.showLoading({
      title: '正在加载',
      mask: true
    }); 
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                // 一次发送多个请求，只有最后一个才隐藏
                ajaxTimes--;
                if(ajaxTimes === 0) {
                    wx.hideLoading({
                        title: '加载完成'
                    })
                }
            }
        });
    });
}

export {request};
