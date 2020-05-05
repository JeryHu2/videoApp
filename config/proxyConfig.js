module.exports = {
    proxy: {
        '/video': {
            target: 'http://124.115.206.190:8099', // 接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/video': '/'
            }
        }
    }
}