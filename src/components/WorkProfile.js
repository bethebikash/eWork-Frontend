import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getWorkProfile } from '../actions/workProfile'
import Spinner from './utils/Spinner'
import { Row, Col, Card } from 'react-bootstrap'
import { Button, Link } from '@material-ui/core'

const WorkProfile = ({ getWorkProfile, user, workProfile: { workProfile, loading } }) => {
  useEffect(() => {
    getWorkProfile(user._id)
  }, [])

  return loading && workProfile === null ? (
    <>
      <Spinner />
    </>
  ) : (
    <Row className="py-3">
      <Col className="col-12"></Col>
      <Col>
        <Card className="bg-light shadow">
          <Card.Header className="bg-white border-0">
            <Row>
              <Col md={9}>
                <h3 className="mb-0">Work Profile</h3>
              </Col>
              <Col md={3}>
                {workProfile !== null && (
                  <Link to="#" className="btn btn-sm btn-info my-1">
                    Update Work Profile
                  </Link>
                )}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-4">
            {workProfile !== null ? (
              <Row>
                <Col md={12}>
                  <h4>Skills</h4>
                  <div>
                    {workProfile.skills.map((skill) => (
                      <span className="pills" key={skill._id}>
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                  <hr />
                  <h4>Technologies</h4>
                  <div>
                    {workProfile.technologies.map((technology) => (
                      <span className="pills" key={technology._id}>
                        {technology.technology}
                      </span>
                    ))}
                  </div>
                </Col>
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
