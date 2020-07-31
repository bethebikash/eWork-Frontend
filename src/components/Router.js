import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './layout/Home'
import { Container } from 'react-bootstrap'
import Register from './auth/Register'
import Login from './auth/Login'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Theme'
import Alert from './utils/Alert'
import Profile from './layout/Profile'
import PrivateRoute from './PrivateRoute'
import EditProfile from './layout/EditProfile'
import ChangePassword from './layout/ChangePassword'
import AddJob from './layout/AddJob'
import ManageJobs from './layout/ManageJobs'

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Nav />
        <Alert />
        <Container>
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/me" component={Profile} />
            <PrivateRoute exact path="/me/edit" component={EditProfile} />
            <PrivateRoute exact path="/me/change-password" component={ChangePassword} />
            <PrivateRoute exact path="/job" component={ManageJobs} />
            <PrivateRoute exact path="/job/post" component={AddJob} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
