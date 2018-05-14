import {RUNNING_URL} from './apiConfig'
const API_ROOT = RUNNING_URL + '/api'
const type = {
    POST: 'post',
    GET: 'get'
}

const config = {
    center: {
        // test
        getTest: {
            url:  API_ROOT + '/getPersonalData',
            type: type.POST
        }
    }
}

export default config
