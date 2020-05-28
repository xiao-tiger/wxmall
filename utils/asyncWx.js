
export function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}



export function openSetting() {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

export function chooseAddress() {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}


export function showModal(content) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

export function showToast(title) {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}


















