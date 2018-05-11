/**
 *  模拟后端API
 * **/

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const mockJs = require('express-mockjs')

/* 设定端口为8001 */
const port = 8001
const app = express()

/* 请求日志 */
app.use(morgan('short'))
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), {flags: 'a'})
app.use(morgan('short', {stream: accessLogStream}))
app.use(function (req, res, next){
    // res.setHeader('Access-Control-Allow-Origin', '*') // 设置允许跨域
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // 设置允许跨域
    next()
})

/* 自定义路径 */
app.use('/api', mockJs(path.join(__dirname, 'mocks')))

/* 绑定端口 */
app.listen(port, () => {
    console.log(`Mock server listening on port ${port}`)
})
