export const routes = {
    path: '/',
    getComponent(nextStates,callback) {
        require.ensure([],require => {
            callback(null,require('../pages/home/Home.jsx'))
        },'home')
    },
    childRoutes: [
        {path: 'login',
            getComponent(nextStates, callback) {
                require.ensure([], function (require) {
                    callback(null, require('../pages/center/Login.jsx'))
                },'center')
            }
        }
    ]
}
