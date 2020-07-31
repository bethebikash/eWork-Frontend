import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from './utils/Spinner'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Axios from 'axios'
import { Grid } from '@material-ui/core'

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
        <Row className="py-3">
          {bids.map((bid) => (
            <pre key={bid._id}>{JSON.stringify(bid)}</pre>
          ))}
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
