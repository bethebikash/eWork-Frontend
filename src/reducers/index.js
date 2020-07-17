import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import workProfile from './workProfile'

export default combineReducers({ alert, auth, workProfile })
