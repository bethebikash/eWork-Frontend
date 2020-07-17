import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getWorkProfile } from '../actions/workProfile'
import Spinner from './utils/Spinner'
import { Row, Col, Card } from 'react-bootstrap'
import { Button } from '@material-ui/core'

const WorkProfile = ({ getWorkProfile, user, workProfile: { workProfile, loading } }) => {
  useEffect(() => {
    getWorkProfile(user._id)
  }, [])

  return loading && workProfile === null ? (
    <>
      <Spinner />
      {user._id}
    </>
  ) : (
    <Row className="py-3">
      <Col className="col-12"></Col>
      <Col>
        <Card className="bg-light shadow">
          <Card.Header className="bg-white border-0">
            <Row>
              <Col sm={6}>
                <h3 className="mb-0">Work Profile</h3>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-4">
            {workProfile !== null ? (
              <Row>
                <Col md={12}>has work profile</Col>
              </Row>
            ) : (
              <Row>
                <Col md={6}>You have not created a work profile</Col>
                <Col md={6}>
                  <Button variant="contained" size="small" color="primary" className="pull-right">
                    Add Work Profile
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

WorkProfile.prototype = {
  getWorkProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  workProfile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  workProfile: state.workProfile,
})

export default connect(mapStateToProps, { getWorkProfile })(WorkProfile)
