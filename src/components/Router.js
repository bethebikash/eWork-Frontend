import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import { Container } from 'react-bootstrap'
import Register from './auth/Register'
import Login from './auth/Login'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Theme'

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
