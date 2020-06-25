import React from 'react'
import { Navbar, Nav as BootNav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logo from '~/../../public/logo.png'

const Nav = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              <img className="brand-logo" src={Logo} alt="Brand Logo" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <BootNav className="m-auto">
              <NavLink className="nav-link m-auto" to="/register">Register</NavLink>
            </BootNav>
            <BootNav>
              <NavLink className="nav-link m-auto" to="/login">Login</NavLink>
            </BootNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Nav
