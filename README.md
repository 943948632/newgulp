# gulpUsage

使用方法：

1、npm install

2、开发环境cmd 输入  gulp dev

3、打包到生产环境    gulp produce

可以在config里面修改自己的cdn路径

可以在gulpfile.js里面修改输出路径


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