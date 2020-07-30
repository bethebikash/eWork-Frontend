import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultPic from '~/../../public/default_profile.png'
import Spinner from '../utils/Spinner'
import WorkProfile from '../WorkProfile'
import AddWorkProfile from '../AddWorkProfile'
import { loadUser } from '../../actions/auth'
import EditWorkProfile from '../EditWorkProfile'

const Profile = ({
  loadUser,
  auth: { loading, user },
  toggleWorkProfile,
  toggleAddWorkProfile,
  toggleEditWorkProfile,
}) => {
  useEffect(() => {
    loadUser()
  }, [])

  return loading && user === null ? (
    <Spinner />
  ) : (
    <>
      <section id="profile-section">
        <Row className="py-0">
          <Col className="col-12"></Col>
          <Col>
            <Card className="bg-light shadow">
              <Card.Header className="bg-white border-0">
                <Row>
                  <Col md={6}>
                    <h3 className="mb-0">Personal Details</h3>
                  </Col>
                  <Col md={3}>
                    <Link to="/me/edit" className="btn btn-sm btn-primary my-1">
                      Edit Profile
                    </Link>
                  </Col>
                  <Col md={3}>
                    <Link to="/me/change-password" className="btn btn-sm btn-warning my-1">
                      Change Password
                    </Link>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <Row className="py-2 text-center">
                      <Col className="pb-3">
                        {user.image ? (
                          <img
                            src={`http://localhost:5000/${user.image}`}
                            alt="profile"
                            style={{ height: '230px', width: '230px' }}
                          />
                        ) : (
                          <img
                            src={defaultPic}
                            alt="default"
                            style={{ height: '230px', width: '230px' }}
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row className="py-2">
                      <Col md={4}>Full Name: </Col>
                      <Col md={8}>
                        <strong>{user.name}</strong>
                      </Col>
                    </Row>
                    <Row className="py-2">
                      <Col md={4}>Username: </Col>
                      <Col md={8}>
                        <strong>{user.username}</strong>
                      </Col>
                    </Row>
                    <Row className="py-2">
                      <Col md={4}>Email: </Col>
                      <Col md={8}>
                        <strong>{user.email}</strong>
                      </Col>
                    </Row>
                    <Row className="py-2">
                      <Col md={4}>Address: </Col>
                      <Col md={8}>
                        <strong>{user.address}</strong>
                      </Col>
                    </Row>
                    <Row className="py-2">
                      <Col md={4}>Phone: </Col>
                      <Col md={8}>
                        <strong>{user.phone}</strong>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
      {user.role === 'work' && (
        <div>
          {toggleWorkProfile && <WorkProfile />}
          {toggleAddWorkProfile && <AddWorkProfile />}
          {toggleEditWorkProfile && <EditWorkProfile />}
        </div>
      )}
    </>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  toggleWorkProfile: PropTypes.bool.isRequired,
  toggleAddWorkProfile: PropTypes.bool.isRequired,
  toggleEditWorkProfile: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  toggleWorkProfile: state.toggle.workProfile,
  toggleAddWorkProfile: state.toggle.addWorkProfile,
  toggleEditWorkProfile: state.toggle.editWorkProfile,
})

export default connect(mapStateToProps, { loadUser })(Profile)
