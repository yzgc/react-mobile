import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/createStore'
// 导入路由
import { routes } from './route/route'
// 导入样式
import './style/global.scss'
// 定义页面的font-size
import flexBox from './utils/flexbox'
flexBox()
// 页面缩放时
window.onresize = flexBox

ReactDOM .render(
    (<Provider store={store}>
        <Router basename="/">
            <div>
                {
                    routes.map((item, i) => {
                        return  <Route exact={i == 0} key={i} path={item.path} component={item.component}/>
                    })
                }
            </div>
        </Router>
    </Provider>),
    document.getElementById('root')
)
