import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { WorkOffOutlined } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setAlert } from '../../actions/alert'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    background: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const EditJob = ({ setAlert }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  })

  const { title, description, price } = formData

  const [error, setError] = useState()
  const [redirect = false, setReditect] = useState()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!title) {
      setError('titleNull')
    } else if (!description) {
      setError('descriptionNull')
    } else if (!price) {
      setError('priceNull')
    } else if (isNaN(price)) {
      setError('priceNum')
    } else {
      const newData = {
        title,
        description,
        price,
      }
      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        }
        await axios.patch('/jobs/', newData, config)
        setReditect(true)
        setAlert('Job has been updated successfully', 'success')
      } catch (error) {
        setAlert(error.response.data.error.message, 'error')
      }
    }
  }

  if (redirect) {
    return <Redirect to="/job" />
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WorkOffOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update a Job
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Job Title"
                autoFocus
              />
              {error === 'titleNull' && (
                <span className="text-danger font-weight-bold">job title is required</span>
              )}
            </Grid>
            <Grid item md={12}>
              <TextField
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                variant="outlined"
                required
                multiline
                rows={4}
                fullWidth
                id="description"
                label="Job Description"
              />
              {error === 'descriptionNull' && (
                <span className="text-danger font-weight-bold">job description is required</span>
              )}
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
              />
              {error === 'priceNull' && (
                <span className="text-danger font-weight-bold">price is required</span>
              )}
              {error === 'priceNum' && (
                <span className="text-danger font-weight-bold">price must be in number</span>
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
            Post
          </Button>
        </form>
      </div>
    </Container>
  )
}

EditJob.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateProps, { setAlert })(AddJob)
