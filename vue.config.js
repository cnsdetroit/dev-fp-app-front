// vue.config.js
module.exports = {
    publicPath: '/app',
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: '80',
        public: '0.0.0.0:80/app/',
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, x-access-token"
        },
        https: false
    },

    transpileDependencies: [
      'vuetify'
    ]
}
