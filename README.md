# 一个简单nodejs+koa+react的图床应用

- 一个非常简单的图床应用，简单配置一下就可以上传图片到自己的服务器上
- 如果对您有帮助，欢迎**star**支持一下
- 后端使用**koa**，前端使用**react**开发，前端源代码在[**这里**](https://github.com/wuzh1993/figure-bed-front.git)，数据库使用的mongoDB+mongoose，项目中有一些通用的中间件，比如全局错误捕捉，全局拦截统一返回格式，token有效期验证等
- 前后端使用**Jwt**校验身份
- 部署推荐使用**pm2**部署，不使用pm2部署请修改package.json内serve命令
- 开发**nodejs**版本为12.17.0



# 项目运行

```
# 克隆到本地
git clone https://github.com/wuzh1993/figure-bed.git

# 进入文件夹
cd figure-bed

# 安装依赖
npm install 或 yarn(推荐)

#生成private.key
私钥需要放在pem目录下，用于生成jwt（token）

#安装mongoDB并开启数据库，创建名为drawbed的数据库
mongoDB端口，数据库默认名称等请在/config/base.js中修改

# 启动项目本地调试
npm run dev或者yarn dev 
注意：该命令默认使用nodemon来启动程序 需要先安装nodemon，请执行npm install -g nodemon，不使用nodemon的话请自己修改package.json

# 部署到测试环境
npm run serve（会启动pm2来读取配置运行程序，详见package.json）
```



# 目录

figure-bed 

├─ app

│ ├─ config --基础配置，可设置不同环境的配置

│ ├─ controller --控制器，接口业务的实际实现

│ ├─ db --数据库初始化

│ ├─ front --前端静态页面

│ ├─ index.js --入口js

│ ├─ middlewares --中间件

│ ├─ modules --定义和到处mongoose schema和model对象

│ ├─ pem --存放private.key 用于生成jwt

│ ├─ public --存放日志等

│ ├─ router --路由

│ ├─ schema --接口校验

│ ├─ static --上传的图片存放位置

│ └─ utils --工具函数

├─ ecosystem.config.js --pm2部署时读取的配置文件，主要区分本地和线上环境



# 在线预览

地址：http://www.wzhcode.com:3001

缩略图：![](http://www.wzhcode.com:3001/images/file-1630142871421.jpg)

![](http://www.wzhcode.com:3001/images/file-1630142875929.jpg)

登录即自动注册

