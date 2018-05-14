// 引入类型，用于switch判断更新哪种状态
import TYPES from '../actions/actionsType'

// 初始化state
const initialState = {
    userInfo: {}
}

// 导出和使用
export default function user(state = initialState, action) {
    switch (action.type) {
        case TYPES.TEST_PERSONAL:
            return Object.assign({}, state.userInfo, action.data)
        default:
            return state
    }
}
