const path = require('path');
module.exports = {
    openEslink: true,
    name: 'base',
    buildPublicPath: '/base/',
    port: 8083,
    publicPath: '/',
    open: false, // 开启浏览器
    contentBase: [
        path.join(__dirname, "./")
    ],
    proxy: {
        "/api": {
            "target": "http://1.shiyuesoft.com",
            "changeOrigin": true,
            secure: true
        },
        "/zuul": {
            "target": "http://1.shiyuesoft.com",
            "changeOrigin": true,
            secure: true
        },
        "/common": {
            "target": "http://1.shiyuesoft.com",
            "changeOrigin": true,
            secure: true,
            "pathRewrite": {
                "^/common": "/common"
            }
        }
    }
}