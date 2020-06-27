import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ()  => {
  const classes = useStyles();

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

  const [error, setError] = useState()

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      setError('cPassword')
    } else {
      const newUser = {
        name, address, phone, username, email, password
      }
    }

  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} validate onSubmit={e=>onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="name"
                value={name}
                onChange={e=>onChange(e)}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="username"
                name="username"
                value={username}
                onChange={e=>onChange(e)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
              />
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
                onChange={e=>onChange(e)}
                autoComplete="address"
              />
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
                onChange={e=>onChange(e)}
                autoComplete="phone"
              />
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
                onChange={e=>onChange(e)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={e=>onChange(e)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cPassword"
                value={cPassword}
                onChange={e=>onChange(e)}
                label="Confirm Password"
                type="cPassword"
                id="cPassword"
                autoComplete="current-password"
              />
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
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register
