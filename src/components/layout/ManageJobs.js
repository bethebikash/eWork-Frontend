import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../utils/Spinner'
import { getMyJobs } from '../../actions/myjobs'
import { setJob } from '../../actions/jobs'
import Bids from '../Bids'
import { Card, Grid, Button } from '@material-ui/core'
import { Edit, Delete, CloudDownload } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const ManageJobs = ({ setJob, getMyJobs, myjobs: { loading, myjobs }, user: { _id } }) => {
  useEffect(() => {
    getMyJobs('posted_by', _id)
  }, [])

  return loading && myjobs === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="job/post">
        <Button variant="contained" color="primary">
          Post a Job
        </Button>
      </Link>
      {myjobs.map((myjob) => (
        <div key={myjob._id}>
          <Card className="p-3 my-4 shadow">
            <div className="d-flex justify-content-end">
              <Link to="job/edit">
                <Edit
                  className="text-info"
                  onClick={(e) => {
                    setJob(myjob)
                  }}
                />
              </Link>
              <Link>
                <Delete
                  onClick={(e) => {
                    alert('delete function')
                  }}
                  className="text-danger"
                />
              </Link>
            </div>
            <Grid container>
              <Grid sm={6} xs={12} item>
                <h2 className="text-color font-weight-bold">{myjob.title}</h2>
                <p>{myjob.description}</p>
              </Grid>
              <Grid sm={6} xs={12} item>
                <p>
                  Price: <span className="font-weight-bold text-color">Rs.{myjob.price}</span>
                </p>
                {!myjob.taken_by ? (
                  <p>The job is still not taken</p>
                ) : (
                  <p>
                    This task is taken by{' '}
                    <span className="text-primary">{myjob.taken_by.name}</span>
                  </p>
                )}
                {myjob.file === '' ? (
                  <p>Task is not completed yet.</p>
                ) : (
                  <p>
                    Task is completed.{' '}
                    <a href={`http://localhost:5000/${myjob.file}`} download>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<CloudDownload />}
                      >
                        Download File
                      </Button>{' '}
                    </a>
                  </p>
                )}
              </Grid>
            </Grid>
            {!myjob.taken_by && (
              <>
                <hr />
                <Bids job={myjob} />
              </>
            )}
          </Card>
        </div>
      ))}
    </>
  )
}

ManageJobs.propTypes = {
  myjobs: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMyJobs: PropTypes.func.isRequired,
  setJob: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  myjobs: state.myjobs,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getMyJobs, setJob })(ManageJobs)
