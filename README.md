### 基于react + webpack 的单页面移动端应用,不依靠create-react-app脚手架
### 项目结构
```md
    |-- build webpack配置文件夹
        |-- utils.js           所用方法
        |-- webpack.config.js  公共配置
        |-- webpack.dev.js     开发配置
        |-- webpack.release.js 发布配置
    |-- docs 项目说明文档
    |-- mocks 模拟数据服务
    |-- src 项目开发目录 我们的代码从这里开始
        |-- config 配置文件
        |-- pages  页面模块
        |-- styles 样式文件
        |-- utils 工具函数文件夹
        |-- index.html 单页面应用唯一的html
        |-- index.js 入口js
    |-- static 静态资源文件夹
```
### 方案说明
* css方案 sass + css（使用BEM命名规范）
* 编译 jsx、es6、scss 等资源
* 自动引入静态资源到相应 html 页面
* 实时编译和刷新浏览器
* 按指定模块化规范自动包装模块
* 自动给 css 添加浏览器内核前缀
* 按需打包合并 js、css
* 压缩 js、css、html
* 图片路径处理、压缩、CssSprite
* 对文件使用 hash 命名，做强缓存
* 语法检查
* 全局替换指定字符串
* 本地接口模拟服务
