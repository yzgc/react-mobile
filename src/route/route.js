
// bundle模型用来异步加载组件
import Bundle from './bundle'
// 引入组件
import loadHome from 'bundle-loader?lazy!../pages/home/Home.jsx'
import loadLogin from 'bundle-loader?lazy!../pages/center/Login.jsx'
// 包裹组件
const Home = (props) => (
    <Bundle load={loadHome}>
        {(Home) => <Home {...props} />}
    </Bundle>
)
const Login = (props) => (
    <Bundle load={loadLogin}>
        {(Login) => <Login {...props} />}
    </Bundle>
)

export const routes = [
    {
        path: '/',
        component: Home,
        routes: []
    },
    {
        path:'/login',
        component: Login,
        routes: []
    }
]

