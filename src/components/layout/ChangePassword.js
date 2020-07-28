import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const ChangePassword = ({ setAlert }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
  })

  const [validation, setValidation] = useState()
  const [redirect = false, setReditect] = useState()

  const { oldpassword, newpassword } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (oldpassword === '') {
      setValidation('nullOldpassword')
    } else if (newpassword === '') {
      setValidation('nullNewPassword')
    } else if (newpassword.length < 6) {
      setValidation('minNewPassword')
    } else {
      const newData = {
        oldpassword,
        newpassword,
      }
      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        }
        const res = await axios.patch(
          'http://localhost:5000/users/me/change-password',
          newData,
          config
        )
        setReditect(true)
        setAlert('Password has been changed successfully', 'success')
      } catch (error) {
        setAlert(error.response.error.message, 'danger')
      }
    }
  }

  if (redirect) {
    return <Redirect to="/me" />
  }

  return (
    <>
      <Container className="center" component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="oldpassword"
              label="Old Password"
              name="oldpassword"
              type="password"
              value={oldpassword}
              onChange={(e) => onChange(e)}
              autoComplete="oldpassword"
            />
            {validation === 'nullOldpassword' && (
              <span className="error">Old Password is required</span>
            )}
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              type="password"
              id="newpassword"
              label="New Password"
              name="newpassword"
              value={newpassword}
              onChange={(e) => onChange(e)}
              autoComplete="newpassword"
            />
            {validation === 'nullNewPassword' && (
              <span className="error">New Password is required</span>
            )}
            {validation === 'minNewPassword' && (
              <span className="error">Must be at least 6 character</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  )
}

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(ChangePassword)
