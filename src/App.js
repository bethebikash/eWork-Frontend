import React from 'react'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import Router from './components/Router'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}

export { App as default }
