import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import workProfile from './workProfile'
import skills from './skills'
import technologies from './technologies'
import toggle from './toggle'
import jobs from './jobs'
import job from './job'
import myjobs from './myjobs'
import bids from './bids'

export default combineReducers({ alert, auth, workProfile, skills, technologies, toggle, jobs, job, myjobs, bids })
