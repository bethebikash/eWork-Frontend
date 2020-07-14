import React, {useEffect} from 'react'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import Router from './components/Router'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './actions/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}

export { App as default }
