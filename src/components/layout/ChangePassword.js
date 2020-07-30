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
import { Row, Col } from 'react-bootstrap'
import { LockTwoTone } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  avatar: {
    margin: '1rem auto',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    background: 'white',
    padding: '1rem',
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
    setValidation('')
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
        await axios.patch('/users/me/change-password', newData, config)
        setReditect(true)
        setAlert('Password has been changed successfully', 'success')
      } catch (error) {
        setAlert(error.response.data.error.message, 'error')
      }
    }
  }

  if (redirect) {
    return <Redirect to="/me" />
  }

  return (
    <>
      <Container className="h-auto" component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Col md={12} className="text-center text-muted py-3">
                <Avatar className={classes.avatar}>
                  <LockTwoTone />
                </Avatar>
                <h2>Change Password</h2>
              </Col>
            </Row>
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
              <span className="text-danger font-weight-bold">Old Password is required</span>
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
              <span className="text-danger font-weight-bold">New Password is required</span>
            )}
            {validation === 'minNewPassword' && (
              <span className="text-danger font-weight-bold">Must be at least 6 character</span>
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
