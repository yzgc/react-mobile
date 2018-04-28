import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browerHistory } from 'react-router'
// 导入路由
import { routes } from './route/route'
console.log(routes)

ReactDOM .render(
    <Router history={browerHistory} routes={routes}></Router>,
    document.getElementById('root')
)
