import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../utils/Spinner'
import { getMyJobs } from '../../actions/myjobs'
import Bids from '../Bids'
import { Card, Grid, Button } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const ManageJobs = ({ getMyJobs, myjobs: { loading, myjobs }, user: { _id } }) => {
  useEffect(() => {
    getMyJobs('posted_by', _id)
  }, [])

  return loading && myjobs === null ? (
    <Spinner />
  ) : (
    <>
      <Link>
        <Button variant="contained" color="primary">
          Post a Job
        </Button>
      </Link>
      {myjobs.map((myjob) => (
        <div key={myjob._id}>
          <Card className="p-3 my-4 shadow">
            <Grid container>
              <Grid sm={12} item>
                <div className="d-flex justify-content-end">
                  <Link>
                    <Edit className="text-info" />
                  </Link>
                  <Link>
                    <Delete
                      onClick={(e) => {
                        alert('hello')
                      }}
                      className="text-danger"
                    />
                  </Link>
                </div>
              </Grid>
              <Grid sm={6} item>
                <h2>{myjob.title}</h2>
                <p>{myjob.description}</p>
              </Grid>
              <Grid sm={6} item>
                <p>Price: <span className="font-weight-bold">Rs.{myjob.price}</span></p>
                {!myjob.taken_by ? (
                  <p>The job is still not taken</p>
                ) : (
                  <p>
                    This task is taken by{' '}
                    <span className="text-primary">{myjob.taken_by.name}</span>
                  </p>
                )}
                {myjob.file === '' && <p>here is your file</p>}
              </Grid>
            </Grid>
            <hr />
            <Bids jobId={myjob._id} />
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
}

const mapStateToProps = (state) => ({
  myjobs: state.myjobs,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getMyJobs })(ManageJobs)
