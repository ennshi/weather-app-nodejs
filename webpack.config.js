module.exports = {
    entry: [
        './src/frontend-src/index.js'
    ],
    output: {
        path: __dirname+'/public/js',
        publicPath: '/',
        filename: 'bundle.js'
    }
}
