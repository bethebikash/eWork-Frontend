import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Edit } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setAlert } from '../../actions/alert'
import Spinner from '../utils/Spinner'

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

const EditJob = ({ setAlert, job: { job } }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
  })

  const { title, description } = formData

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
    } else {
      const newData = {
        title,
        description,
      }
      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        }
        await axios.patch(`/jobs/${job._id}`, newData, config)
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
    <>
      {job === null ? (
        <Spinner />
      ) : (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Edit />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit the Job Description
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
                    <span className="text-danger font-weight-bold">
                      job description is required
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
                Update
              </Button>
            </form>
          </div>
        </Container>
      )}
    </>
  )
}

EditJob.propTypes = {
  setAlert: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
}

const mapStateProps = (state, props) => ({  
  job: state.job,
})

export default connect(mapStateProps, { setAlert })(EditJob)
