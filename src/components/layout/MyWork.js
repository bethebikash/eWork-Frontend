import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../utils/Spinner'
import { getMyWorks } from '../../actions/myworks'
import { setJob } from '../../actions/jobs'
import { Card, Grid, Button, IconButton } from '@material-ui/core'
import { Edit, Delete, CloudUpload } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setAlert } from '../../actions/alert'
import useForceUpdate from 'use-force-update'

const MyWork = ({ getMyWorks, myworks: { loading, myworks }, user: { _id }, setAlert }) => {
  useEffect(() => {
    getMyWorks('taken_by', _id)
  }, [])

  const [selectedFile = null, setSelectedFile] = useState()
  const [validation, setValidation] = useState()

  const onFileChange = async (e) => {
    setSelectedFile(e.target.files[0])
  }

  const onFileUpload = async (e, jobId) => {
    e.preventDefault()
    if (selectedFile === null) {
      setValidation('nullFile')
    } else {
      const fd = new FormData()
      fd.append('jobFile', selectedFile)
      try {
        await axios.patch(`/jobs/upload/${jobId}`, fd)
        setAlert('File uploaded successfully', 'success')
        getMyWorks('taken_by', _id)
      } catch (error) {
        setAlert(error.response.data.error.message, 'error')
      }
    }
  }

  return loading && myworks === null ? (
    <Spinner />
  ) : (
    <>
      {myworks === [] && (
        <Card className="p-3 my-4 shadow">
          <div className="d-flex justify-content-center">
            <span className="font-weight-bold text-danger">
              Either you haven't bid for any job OR your bid has not accepted.
            </span>
          </div>
        </Card>
      )}

      {myworks.map((mywork) => (
        <div key={mywork._id}>
          <Card className="p-3 my-4 shadow">
            <Grid container>
              <Grid sm={6} xs={12} item>
                <h2 className="text-color font-weight-bold">{mywork.title}</h2>
                <p className="pr-2">{mywork.description}</p>
              </Grid>
              <Grid sm={6} xs={12} item>
                <p>
                  Price: <span className="font-weight-bold text-color">Rs.{mywork.price}</span>
                </p>
                {!mywork.taken_by ? (
                  <p>The job is still not taken</p>
                ) : (
                  <p>
                    Your client is <span className="text-primary">{mywork.posted_by.name}</span>
                  </p>
                )}
                {mywork.file === '' ? (
                  <>
                    <p>
                      If you have completed the task.
                      <span className="font-weight-bold"> Upload your work</span>
                    </p>
                    <p>
                      <input
                        accept=".zip, .rar"
                        id="icon-button-file"
                        type="file"
                        hidden={true}
                        onChange={(e) => {
                          onFileChange(e)
                        }}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <CloudUpload />
                        </IconButton>
                      </label>
                      {validation === 'nullFile' && (
                        <span className="text-danger font-weight-bold">Choose a file  </span>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={(e) => onFileUpload(e, mywork._id)}
                      >
                        Submit Work
                      </Button>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      You have already submit the task.
                      <span className="font-weight-bold"> Want to resubmit?</span>
                    </p>
                    <p>
                      <input
                        accept=".zip, .rar"
                        id="icon-button-file"
                        type="file"
                        hidden={true}
                        onChange={(e) => {
                          onFileChange(e)
                        }}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton color="secondary" aria-label="upload picture" component="span">
                          <CloudUpload />
                        </IconButton>
                      </label>
                      {validation === 'nullFile' && (
                        <span className="text-danger font-weight-bold">Choose a file  </span>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={(e) => onFileUpload(e, mywork._id)}
                      >
                        Resubmit
                      </Button>
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
          </Card>
        </div>
      ))}
    </>
  )
}

MyWork.propTypes = {
  myworks: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMyWorks: PropTypes.func.isRequired,
  setJob: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  myworks: state.myworks,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getMyWorks, setJob, setAlert })(MyWork)
