import request from 'superagent'

function getCommonHeader() {
    const commonParams = {
        type: 1
    }
    return commonParams
}

function http(inf, params, callback) {
    if (arguments.length == 2) {
        callback = params
        params = {}
    }
    const type = inf.type.toLowerCase()
    // url为完整url
    let req = request[type](inf.url).set(getCommonHeader())
    req[type == 'post' ? 'send' : 'query'](params).then( res => {
        const result = JSON.parse(res.text)
        callback(result)
    })
}

// 导出
export default {
    http: http
}
