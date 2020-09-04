import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IconButton, Avatar } from '@material-ui/core'
import { setAlert } from '../../actions/alert'
import { Col, Row } from 'react-bootstrap'
import defaultPic from '~/../../public/default_profile.png'
import { EditOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '1rem'
  },
  input: {
    display: 'none',
  },
  avatar: {
    margin: '1rem auto',
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const EditProfile = ({ setAlert, user }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
    username: user.username,
  })

  const [validation, setValidation] = useState()
  const [redirect = false, setReditect] = useState()
  const [selectedFile = null, setSelectedFile] = useState()
  const [imageUrl = null, setImageUrl] = useState()

  const { name, email, address, phone, username } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setValidation()
  }

  const emailPattern = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onFileChange = async (e) => {
    setSelectedFile(e.target.files[0])
    let reader = new FileReader()
    reader.onloadend = () => {
      setImageUrl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const onFileUpload = async (e) => {
    e.preventDefault()
    if (selectedFile === null) {
      setValidation('nullFile')
    } else {
      const fd = new FormData()
      fd.append('image', selectedFile)
      try {
        await axios.post('/users/me/upload', fd)
        setAlert('Profile Picture Updated Successfully', 'success')
        setReditect(true)
      } catch (error) {
        setAlert(error.response.data.error.message, 'error')
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (name === '') {
      setValidation('nullName')
    } else if (email === '') {
      setValidation('nullEmail')
    } else if (address === '') {
      setValidation('nullAddress')
    } else if (phone === '') {
      setValidation('nullPhone')
    } else if (username === '') {
      setValidation('nullUsername')
    } else if (!emailPattern.test(email)) {
      setValidation('invalideEmail')
    } else if (username.length < 6) {
      setValidation('minUsername')
    } else {
      const newData = {
        name,
        email,
        address,
        phone,
        username,
      }
      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        }
        await axios.put('/users/me', newData, config)
        setReditect(true)
        setAlert('Profile Updated Successfully', 'success')
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
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
        <Row>
              <Col md={12} className="text-center text-muted py-3">
                <Avatar className={classes.avatar}>
                  <EditOutlined />
                </Avatar>
                <h2>Edit Profile</h2>
              </Col>
            </Row>
          <Row className="text-center">
            <Col md={6}>
              <div className="mt-4">
                {!selectedFile ? (
                  <>
                    {user.image ? (
                      <img
                        src={`http://localhost:5000/${user.image}`}
                        alt="profile"
                        style={{ height: '230px', width: '230px' }}
                      />
                    ) : (
                      <img
                        src={defaultPic}
                        alt="default"
                        style={{ height: '230px', width: '230px' }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <img
                      src={imageUrl}
                      alt="selected"
                      style={{ height: '230px', width: '230px' }}
                    />
                  </>
                )}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => onFileChange(e)}
                />
              </div>
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              {validation === 'nullFile' && <span className="text-danger font-weight-bold">Choose a file</span>}
              <Button fullWidth variant="text" color="primary" onClick={(e) => onFileUpload(e)}>
                Change Profile Photo
              </Button>
            </Col>
            <Col md={6}>
              <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  autoComplete="name"
                />
                {validation === 'nullName' && <span className="text-danger font-weight-bold">Name is required</span>}
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  autoComplete="email"
                />
                {validation === 'nullEmail' && <span className="text-danger font-weight-bold">Email is required</span>}
                {validation === 'invalideEmail' && <span className="text-danger font-weight-bold">Invalid email</span>}
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={(e) => onChange(e)}
                  autoComplete="address"
                />
                {validation === 'nullAddress' && <span className="text-danger font-weight-bold">Address is required</span>}
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                  autoComplete="phone"
                />
                {validation === 'nullPhone' && <span className="text-danger font-weight-bold">Phone is required</span>}
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                  autoComplete="username"
                />
                {validation === 'nullUsername' && (
                  <span className="text-danger font-weight-bold">Username is required</span>
                )}
                {validation === 'minUsername' && (
                  <span className="text-danger font-weight-bold">Can't be less than 6 character</span>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update
                </Button>
              </form>
            </Col>
          </Row>
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  )
}

EditProfile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateProps, { setAlert })(EditProfile)
