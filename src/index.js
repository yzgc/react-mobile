import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
// 导入路由
import { routes } from './route/route'
console.log(routes)

ReactDOM .render(
    <Router routes={routes}></Router>,
    document.getElementById('root')
)
