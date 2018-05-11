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
}
