import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import useInput from '../../hooks/useInput'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles()

  const [username, changeUsername] = useInput('')
  const [password, changePassword] = useInput('')

  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!username) {
      setError('usernameNull')
    } else if (!password) {
      setError('passwordNull')
    } else {
      login({ username, password })
    }
  }

  // Redirect
  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} validate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={changeUsername}
          />
          {error === 'usernameNull' && (
            <span className="text-danger font-weight-bold">username is required</span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={changePassword}
          />
          {error === 'passwordNull' && (
            <span className="text-danger font-weight-bold">password is required</span>
          )}
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateProps, { login })(Login)
