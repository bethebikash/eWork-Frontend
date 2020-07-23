import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import workProfile from './workProfile'
import skills from './skills'
import technologies from './technologies'

export default combineReducers({ alert, auth, workProfile, skills, technologies })
