import React from 'react'
import { Navbar, Nav as BootNav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logo from '~/../../public/logo.png'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'

const Nav = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar mb-3" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              <img className="brand-logo" src={Logo} alt="Brand Logo" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <BootNav className="m-auto">
              {!loading && (
                <>
                  {isAuthenticated && user ? (
                    <>
                      {user.role === 'work' && (
                        <>
                          <NavLink className="nav-link m-auto" to="/me">
                            My Task
                          </NavLink>
                        </>
                      )}
                      {user.role === 'hire' && (
                        <>
                          <NavLink className="nav-link m-auto" to="/me">
                            Post Jobs
                          </NavLink>
                        </>
                      )}
                      <NavLink className="nav-link m-auto" to="/me">
                        Profile
                      </NavLink>
                    </>
                  ) : (
                    <NavLink className="nav-link m-auto" to="/register">
                      not auth
                    </NavLink>
                  )}
                </>
              )}
            </BootNav>
            <BootNav>
              {!loading && (
                <>
                  {isAuthenticated ? (
                    <a className="nav-link m-auto btn-link" href="#!" onClick={logout}>
                      Logout
                    </a>
                  ) : (
                    <NavLink className="nav-link m-auto" to="/login">
                      Login
                    </NavLink>
                  )}
                </>
              )}
            </BootNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

Nav.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Nav)
