import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from './utils/Spinner'
import { Row, Col} from 'react-bootstrap'
import Axios from 'axios'
import { Card, Grid, Button } from '@material-ui/core'

const Bids = ({ jobId }) => {
  const [bids, setBids] = useState('')

  const fetchBid = async (id) => {
    const res = await Axios.get(`/bids?job=${id}`)
    setBids(res.data)
  }

  useEffect(() => {
    fetchBid(jobId)
  }, [jobId])

  return bids === '' ? (
    <>
      <Spinner />
    </>
  ) : (
    <>
      {bids.length == 0 ? (
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
                      color="blue"
                      size="medium"
                    >
                      Accept This Bid
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
}

const mapStateToProps = (state, ownProps) => ({
  jobId: ownProps.jobId,
})

export default connect(mapStateToProps)(Bids)
