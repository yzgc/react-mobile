
 const apiType = 0 // 用于确定当前环境 0:本地，1:dev, 2: sit, 3: 写死的, 4:nginx代理，活域名
 const LOCAL_URL = `http://${location.hostname}:8001` // 模拟环境域名和端口（locahost || ip）
 const DEV_URL = 'http://www.dev.com'
 const SIT_URL = 'http://www.sit.com'
 const PRODUCTION_URL = 'http://www.PRODUCTION.com'
 const PROXY_URL = `http://${location.host}` // nginx代理情况下
 const Handle = false // 测试环境的url  手机上访问不到loclhost路径

/* 确定当前使用的环境 */
function getRunningUrl () {
    let url = ''
    switch (apiType) {
        case 0:
            url =  LOCAL_URL
            break
        case 1:
            url =  DEV_URL
            break
        case 2:
            url =  SIT_URL
            break
        case 3:
            url = PRODUCTION_URL
            break
        case 4:
            url = PROXY_URL
            break
        default:
            url = PRODUCTION_URL
            break
    }
    if (Handle) {
        url = ''
    }
    return url
}

export const RUNNING_URL = getRunningUrl() // 导出真正运行的url
