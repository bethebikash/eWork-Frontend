import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import workIcon from '~/../../public/work.svg'
import hireIcon from '~/../../public/hire.svg'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Register = ({ register }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    cPassword: '',
  })

  const { name, address, phone, username, email, password, cPassword } = formData

  const [role, setRole] = useState('')

  const [error, setError] = useState()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setError('nameNull')
    } else if (!username) {
      setError('usernameNull')
    } else if (!address) {
      setError('addressNull')
    } else if (!phone) {
      setError('phoneNull')
    } else if (!email) {
      setError('emailNull')
    } else if (!emailPattern.test(email)) {
      setError('emailInvalid')
    } else if (!password) {
      setError('passwordNull')
    } else if (password.length < 6) {
      setError('passwordLength')
    }else if (password !== cPassword) {
      setError('cPassword')
    } else {
      register({name, username, address, phone, email, password, role})
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {role === '' ? (
        <div className={classes.paper}>
          <h2 className="pb-3">You are here for?</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div
                className={`role-box ${role === 'work' && 'role-box-active'}  py-5 text-center`}
                onClick={(e) => {
                  setRole('work')
                }}
              >
                <img className="role-icon" src={workIcon} alt="Work Icon" />
                <h3 className="font-weight-bold">Work</h3>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className={`role-box ${role === 'hire' && 'role-box-active'} py-5 text-center`}
                onClick={(e) => {
                  setRole('hire')
                }}
              >
                <img className="role-icon" src={hireIcon} alt="Hire Icon" />
                <h3 className="font-weight-bold">Hire</h3>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
                {error === 'nameNull' && (
                  <span className="text-danger font-weight-bold">name is required</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                />
                {error === 'usernameNull' && (
                  <span className="text-danger font-weight-bold">username is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={(e) => onChange(e)}
                  autoComplete="address"
                />
                {error === 'addressNull' && (
                  <span className="text-danger font-weight-bold">address is required</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                  autoComplete="phone"
                />
                {error === 'phoneNull' && (
                  <span className="text-danger font-weight-bold">phone number is required</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  autoComplete="email"
                />
                {error === 'emailNull' && (
                  <span className="text-danger font-weight-bold">email is required</span>
                )}
                {error === 'emailInvalid' && (
                  <span className="text-danger font-weight-bold">email is invalid</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {error === 'passwordNull' && (
                  <span className="text-danger font-weight-bold">password is required</span>
                )}
                {error === 'passwordLength' && (
                  <span className="text-danger font-weight-bold">password should be min 6 character</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="cPassword"
                  value={cPassword}
                  onChange={(e) => onChange(e)}
                  label="Confirm Password"
                  type="password"
                  id="cPassword"
                  autoComplete="current-password"
                />
                {error === 'cPassword' && (
                  <span className="text-danger font-weight-bold">
                    password and conform password does not match
                  </span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
}

export default connect(null, { register })(Register)
