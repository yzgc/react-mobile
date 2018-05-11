const API_ROOT = '/api'
const type = {
    POST: 'post',
    GET: 'get'
}

const config = {
    center: {
        // test
        getTest: {
            url: 'http://192.168.51.254:8001/api/getPersonalData',
            type: type.POST
        }
    }
}

export default config
