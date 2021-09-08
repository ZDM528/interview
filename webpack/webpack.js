const {resolve}=require("path")
const htmlWebpackPlugin=require('html-webpack-plugin')  //打包html文件需要的模块
const MiniCssExtractPlugin=require('mini-css-extract-plugin')  //提取js中的CSS成单独文件
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin') //压缩css文件
const WorkboxWebpackPlugin=require('workbox-webpack-plugin') //PWA 渐进式网络开发应用程序（离线可访问）

//热模块开发环境用,因为是基于devServer的,生成环境不需要devServer,生产环境需要开启babel缓存,当文件有改动时,重新请求数据
//开发环境
/*样式文件：可以使用HMR功能，因为style-loader内部实现了
* js文件：默认不能使用HMR功能,需要修改Js代码，添加指出HMR功能的代码
* if(module.hot){
* module.hot.accept('./print.js',function(){
* print()
* }}
* html文件：默认不能使用HMR功能，同时会导致问题，html文件不能热更新了，解决：修改entry入口，将html文件引入
* ['./src/wetTest/index.js','./src/index.html']*/

//生成环境
/*缓存：
* babel缓存 cacheDirectory:true
* 文件资源缓存：
* hash:每次webpack构建时会生成一个唯一的hash值  因为js和css同时使用一个hash值 如果重新打包，会导致所有缓存失效
* chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk,那么hash值一样，因为所有从用一个入口引入的文件，都属于一个chunk，所以css和js还是同个chunk
* contenthash:根据文件的内容生成hash值，不同文件的hash值一定不一样*/

module.exports={
    //多入口页面，一个入口输出一个bundle
    // entry:{
    //     main:'./src/js/index.js',
    //     test:'./src/js/test.js'
    // },
    entry: './src/wetTest/index.js', //入口文件
    output: {
        //在多入口文件中，文件名根据入口文件命名，比如main.js   test.js
        filename: "[name].[contenthash:10].js", //输出文件名
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            //只检查自己写的源代码，第三方的库的代码是不用检查的
            //设置检查规则：package.json中的eslintConfig中设置
            {
                test:/\.js$/,
                exclude: /node-modules/,
                loader: 'eslint-loader',
                options: {  //自动校正
                    fix:true
                }
            },
            {
                //oneOf以下loader只会匹配一个
                //不能有两个配置处于同一种类型文件，所以需要把处理js文件的两个loader把一个放在外面
                oneOf: [
                    {
                        //处理css文件
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,  //提取js中的css成单独文件
                            //'style-loader',
                            'css-loader',
                            //'postcss-loader', 使用loader的默认配置
                            /* 修改loader的配置   css兼容性处理  npm i postcss-loader postcss-preset-env
                            帮postcss寻找package.json中的browserslist修改css的兼容性样式 */
                            {
                                loader:'postcss-loader',
                                options: {
                                    ident:'postcss',
                                    plugins:()=>{
                                        require("postcss-preset-env")()
                                    }
                                }
                            }
                        ],
                    },
                    {
                        //处理less文件
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            {
                                loader:'postcss-loader',
                                options: {
                                    ident:'postcss',
                                    plugins:()=>{
                                        require("postcss-preset-env")()
                                    }
                                }
                            },
                            'css-loader',
                            'less-loader'
                        ]
                    },
                    {
                        //处理img ,jpg ,gif文件
                        test: /\.(png|jpg|gif)$/,
                        loader:'url-loader',
                        // 图片大小小于8kb,就会被base64处理,
                        // 优点：减少请求数量
                        // 缺点：图片体积会大，文件请求速度会慢，所以一般处理小文件的图片
                        // 下载url-loader file-loader
                        options: {
                            limit:8 * 1024,
                            //取图片哈希值的前十位，ext表示原来图片扩展名
                            esModule:false,//url-loader默认使用es6模块化解析，而html-loader引入图片是commonJs
                            //解析时会出问题 需要关闭url-loader的es6模块化，使用commonjs解析
                            name:'[hash:10].[ext]'
                        }
                    },
                    {
                        test:/\.html$/,
                        loader:'html-loader' //处理html文件的img的图片（负责引入img,从而能被url-loader处理）
                    },
                    {
                        // 兼容性处理：babel-loader @babel/preset-env @babel/core
                        /*1基本js兼容性处理：@babel/preset-env
                        问题：只能转换基本语法，如promise不能转换
                        2.全部js兼容性处理：@babel/polyfill
                        问题：只需要解决部分兼容性问题，但是将所有兼容性代码都引入，体积太大了
                        3.按需做兼容性处理,core-js*/

                        test:/\.js$/,
                        exclude: /node-modules/,
                        //include: resolve(__dirname,'src'),
                        enforce: 'pre',//优先执行
                        //enforce: 'post',//延后执行
                        use:[
                            'thread-loader', //开启多进程打包
                            {
                                loader: 'babel-loader',
                                options: {
                                    //预设，指示babel该做怎么样的兼容性处理
                                    presets:[
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns:'usage',
                                            corejs:{
                                                version:3
                                            },
                                            targets:{
                                                chrome:'60',
                                                firefox:'60',
                                                id:'9',
                                                safari:'10',
                                                edge:'17'
                                            }
                                        }
                                    ],
                                    cacheDirectory:true  //开启babel缓存，第二次构建时，会读取之前的缓存，生成环境用，（跟HMR同个功能）
                                },
                            }
                        ],

                    },
                    {
                        exclude: /\.(js|css|html|less)$/,
                        loader: 'file-loader'
                    }
                ]
            }

        ]
    },
    plugins: [
        //htmlWebpackPlugin 会自动创建一个空的html文件,自动引入了built.js(打包生成的文件)
        //template：可以引入自己的html文件，同时也自动引入了built.js
        new htmlWebpackPlugin({
            template: "./src/wetTest/index.html",
            //压缩html代码
            minify: {
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'./src/test.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin() ,//压缩css文件
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim:true,//帮助serviceworker快速启动
            skipWaiting:true  //删除旧的serviceworker，生成一个serviceworker配置文件
        })
    ],
    mode:'development',
    //解析模块的规则
    resolve: {
        //配置解析模块路径，优点简写路径，缺点路径没有提示
        alias: {
            $css:resolve(__dirname,'src/css')
        },
        //配置省略文件路径的后缀名
        extensions: ['.js','.json','.css'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules'] //告诉webpack 解析模块是去找哪个目录
    },
    //将node_modules中代码单独打包为一个chunk最终输出，自动分析多入口chunk中有没有公共的文件，如果有会打包成单独的一个chunk
    optimization: {
        splitChunks: {
            chunks: "all",
            //默认值
            // minSize:30 * 1024, //分割的chunk最小为30kb
            // maxSize:0, //最大没有限制
            // minChunks:1 ,//要提取的chunk最少被引用一次
            // maxAsyncRequests:5,//按需加载时并行加载的文件的最大数量
            // automaticNameDelimiter: "~",//名称连接符
            // name: true,
            // cacheGroups: { //分割的chunk的组
            //     vendors:{ //node_modules文件会被打包到vendors组的chunk中，
            //         test:/[\\/node_modules[\\/]/,
            //         priority:-10 //优先级
            //     },
            //     default:{
            //         minChunks:2,
            //         priority:-20,
            //         reuseExistingChunk: true //如果当前要打包的模块和之前已经被提前的模块是同一个，就会复用，而不是重写打包模块
            //     }
            // }
        }
    },
    //用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）启动devServer指令为：npx webpack-dev-server
    devServer: {
        contentBase:resolve(__dirname,'build'),//项目构建后路径
        watchContentBase:true,
        watchOptions:{ //忽略文件
            ignored:/node_modules/
        },
        compress:true, //启动gzip压缩
        port:3000,
        open:true, //自动打开浏览器
        hot:true, //开启HMP功能
        clientLogLevel:'none' , //不要显示启动服务器日志信息
        quiet:true ,//除了一些基本启动信息以外，其他内容都不要显示
        overlay:false, //如果出错了，不要全屏提示
        proxy:{ //一旦devServer服务器接收到/api/xx请求，就会把请求转发到另外一个服务器3000
            '/api':{
                target:'http://lacalhost:3000',
                pathRewrite:{  //发送请求时，请求路径重写，将/api/xx==>/xxx 去掉api
                    '^/api':''
                }
            }
        }
    },
    //开发环境用eval-source-map 生成环境用source-map 调试更友好
    devtool:'eval-source-map', //一种提供源代码到构建后代码影射的技术，如果构建后代码出错了，通过映射可以追踪源代码错误
    externals: { //打包时忽略的库名-npm名，防止打包太多文件
        jquery:'jquery'
    }
}
