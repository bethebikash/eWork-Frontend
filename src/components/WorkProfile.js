import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getWorkProfile } from '../actions/workProfile'
import Spinner from './utils/Spinner'
import { Button } from '@material-ui/core'
import { Row, Col, Card } from 'react-bootstrap'
import { setToggleWP, setToggleAWP, setToggleEWP } from '../actions/toggle'

const WorkProfile = ({
  getWorkProfile,
  user,
  workProfile: { workProfile, loading },
  setToggleWP,
  setToggleAWP,
  setToggleEWP,
}) => {
  useEffect(() => {
    getWorkProfile(user._id)
  }, [user._id])

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
              <Col md={12} className="d-flex justify-content-between">
                <h3 className="mb-0">Work Profile</h3>
                {workProfile !== null && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => (setToggleWP(false), setToggleEWP(true))}
                  >
                    Update Work Profile
                  </Button>
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
                      <span className="pills d-inline-block" key={skill._id}>
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                  <hr />
                  <h4>Technologies</h4>
                  <div>
                    {workProfile.technologies.map((technology) => (
                      <span className="pills d-inline-block" key={technology._id}>
                        {technology.technology}
                      </span>
                    ))}
                  </div>
                  <hr />
                  <h4>Rate: per hour (in Rs)</h4>
                  <div>
                    <h3 className="text-secondary font-weight-bold">{workProfile.rate}</h3>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={6}>You have not created a work profile</Col>
                <Col md={6}>
                  <Button
                    onClick={() => (setToggleWP(false), setToggleAWP(true))}
                    variant="contained"
                    size="small"
                    color="primary"
                    className="pull-right"
                  >
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
  setToggleWP: PropTypes.func.isRequired,
  setToggleAWP: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  workProfile: state.workProfile,
})

export default connect(mapStateToProps, {
  getWorkProfile,
  setToggleWP,
  setToggleAWP,
  setToggleEWP,
})(WorkProfile)
