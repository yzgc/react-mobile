import { createStore } from 'redux'
import rootReducers from './reducers/index'

let store = createStore(rootReducers)

export default store
