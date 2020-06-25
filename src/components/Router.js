import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import { Container } from 'react-bootstrap'
import Register from './auth/Register'
import Login from './auth/Login'

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default Router
