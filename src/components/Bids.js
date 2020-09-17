import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from './utils/Spinner'
import { Row, Col} from 'react-bootstrap'
import axios from 'axios'
import { Card, Grid, Button } from '@material-ui/core'
import { setAlert } from '../actions/alert'
import { getMyJobs } from '../actions/myjobs'
import { Redirect } from 'react-router-dom'

const Bids = ({ jobId, setAlert, getMyJobs, userId }) => {
  const [bids, setBids] = useState('')

  const fetchBid = async (id) => {
    const res = await axios.get(`/bids?job=${id}`)
    setBids(res.data)
  }

  const [redirect = false, setReditect] = useState()

  useEffect(() => {
    fetchBid(jobId)
  }, [jobId])

  const chooseBidder = async (bidder, job) =>{
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }
      const newData = {bidder, job}
      await axios.post('/bids/choose', newData, config)
      setAlert('You have successfully choose a bidder to do your job', 'success')
      getMyJobs('posted_by', userId)
      setReditect(true)
    } catch (error) {
      setAlert(error.response.data.error.message, 'error')
    }
  }

  if (redirect) {
    return <Redirect to="/job" />
  }

  return bids === '' ? (
    <>
      <Spinner />
    </>
  ) : (
    <>
      {bids.length === 0 ? (
        <Row className="text-center">
          <Col md={12}>
            <span className="text-danger font-weight-bold">No bid for this job</span>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12}>
            <Row className="text-center pb-1">
              <Col md={12}>
                <span className="text-success font-weight-bold">Bids for this job</span>
              </Col>
            </Row>
            {bids.map((bid) => (
              <Card key={bid._id} className="p-2 px-3 my-1">
                <Grid className="d-flex justify-content-between">
                  <Grid item>
                    <span className="font-weight-bold text-primary">{bid.bidder.name}</span> bid to
                    take this job
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={()=>{chooseBidder(bid.bidder._id, jobId)}}
                    >
                      Accept Bid
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Col>
        </Row>
      )}
    </>
  )
}

Bids.prototype = {
  jobId: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  jobId: ownProps.job._id,
  userId: ownProps.job.posted_by._id
})

export default connect(mapStateToProps, {setAlert, getMyJobs})(Bids)
