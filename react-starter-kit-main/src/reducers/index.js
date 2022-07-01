import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import apiReducer from './api.reducer'

export default combineReducers({
  authReducer,
  apiReducer
})
