##文件结构
    
    ├── README.md
    ├── config                                   #环境配置，以后的一些环境配置都可以放这里
    │   └── storeConfig.js
    ├── build                                    #webpack压缩打包后的目录
    ├── package.json                             #项目依赖
    ├── newbuild                                 #完整打包后的目录
    ├── app
    │   ├── components                           #页面用到的组件
    │   └── main                                 #入口文件
    │   └── util                                 #工具类
    │   └── view                                 #页面
    ├── css                                      #css文件
    ├── template                                 #html模板
    ├── images                                   #图片资源
    ├── js                                       #js资源
    ├── data                                     #模拟数据
    ├── webpack.config.js                        #webpack打包配置
    └── gulpfile.js                              #gulp打包


##执行
	npm install
	npm run dev    #运行项目。然后在浏览器输入"localhost:3005/html/index.html"
	webpack -p     #webpack打包项目
	gulp build     #gulp打包项目
 
 
