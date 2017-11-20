# gulpUsage

使用方法：

1、npm install

2、开发环境cmd 输入  gulp dev

3、打包到生产环境    gulp produce

可以在config里面修改自己的cdn路径

可以在gulpfile.js里面修改输出路径

目录结构
├── dist            打包后的文件  
├── config.js       cdn 外联域名
├── package.js      配置项
├── gulp.js         设置
├── readme.md       说明     
├── src
│   ├── css
│   ├── html
│   ├── include
│   │   ├──**.html    页面
│   │   ├──include    共用头部 尾部
│   │   └──one        子目录
│   ├── images
│   └── js
│       ├── jquery-2.1.0.js 
│       └── index.js
└── node_modules      

简单的get请求：(假如地址是：http://hahahha/get/user)
demoAjax({
  "url":"get/user"，
 "successBack":funtion(){//成功之后的一些处理}
})


post请求：
demoAjax({
  "url":"get/user"，
  "type":"post",
  "param":{"user":"xg"}
  "successBack":funtion(){//成功之后的一些处理}
})