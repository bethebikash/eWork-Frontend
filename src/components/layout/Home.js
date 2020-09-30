import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../utils/Spinner'
import { getJobs } from '../../actions/jobs'
import { Card, Grid, Button } from '@material-ui/core'
import { setAlert } from '../../actions/alert'
import axios from 'axios'
import headerImg from '~/../../public/header.jpg'
// import { Link } from 'react-router-dom'

const Home = ({ getJobs, jobs: { loading, jobs }, auth: { isAuthenticated, user }, setAlert }) => {
  useEffect(() => {
    getJobs()
  }, [])

  const postBid = async (bidder, job) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }
      const newData = { bidder, job }
      await axios.post('/bids', newData, config)
      setAlert('You have successfully make a bid for this job', 'success')
    } catch (error) {
      setAlert(error.response.data.error.message, 'error')
    }
  }

  return loading && jobs === null ? (
    <Spinner />
  ) : (
    <>
      <Grid container>
        <header className="header">
          <div id="overlay"></div>
          <img className="img-fluid" src={headerImg} alt="header" />
          <h1 className="header-text">Place to find you a job</h1>
        </header>
        <Grid sm={9} xs={12}>
          {jobs.map((job) => (
            <div key={job._id}>
              <Card className="p-3 my-4 shadow">
                <Grid container>
                  <Grid md={12} item>
                    <h2 className="text-color font-weight-bold">{job.title}</h2>
                    <p>{job.description}</p>
                    <p>
                      Price: <span className="font-weight-bold text-color">Rs.{job.price}</span>
                    </p>
                    <p>
                      Posted By:{' '}
                      <span className="font-weight-bold text-primary">{job.posted_by.name}</span>
                    </p>

                    <Grid container>
                      <Grid sm={6} xs={12} item>
                        <p>
                          <span className="italic text-muted">Posted On: {job.createdAt}</span>
                        </p>
                      </Grid>
                      {isAuthenticated && (
                        <Grid className="d-flex justify-content-end" sm={6} xs={12} item>
                          <p>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              className="m-0 px-5"
                              onClick={() => {
                                postBid(user._id, job._id)
                              }}
                            >
                              Make a Bid
                            </Button>
                          </p>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </div>
          ))}
        </Grid>
        <Grid sm={3} xs={12}>
          <Card className="p-3 ml-3 my-4 shadow h-auto">
            <p>
              <h6>Total Jobs</h6>
              <h5 className="font-weight-bold text-color">215</h5>
            </p>
            <hr />
            <p>
              <h6>Total Hirers</h6>
              <h5 className="font-weight-bold text-color">35</h5>
            </p>
            <hr />
            <p>
              <h6>Total Freelancers</h6>
              <h5 className="font-weight-bold text-color">124</h5>
            </p>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  auth: state.auth,
})

export default connect(mapStateToProps, { getJobs, setAlert })(Home)
