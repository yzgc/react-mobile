/*
 * action 类型
 */
import TYPES  from './actionsType'
console.log(TYPES.TEST_PERSONAL)
/*
 * action 创建函数
 */
export function setPersonal() {
    const data = {
        userName: 'yzgc',
        age: 25,
        love: 'mmd',
    }
    return {
        type: TYPES.TEST_PERSONAL,
        data: data
    }
}
