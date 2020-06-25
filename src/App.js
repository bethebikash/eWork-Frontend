import React from 'react'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss'
import Router from './components/Router';

const App = () => {
  return (
    <div>
      <Router />
    </div>
  )
}

export {App as default}
