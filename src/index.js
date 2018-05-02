import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
// 导入路由
import { routes } from './route/route'
console.log(routes)

ReactDOM .render(
    <Router basename="/">
        <div>
            {
                routes.map((item, i) => {
                    return  <Route exact={i == 0} key={i} path={item.path} component={item.component}/>
                })
            }
        </div>
    </Router>,
    document.getElementById('root')
)
