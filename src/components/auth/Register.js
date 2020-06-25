import React, { useState } from 'react'
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    cPassword: '',
  })

  const { name, address, phone, username, email, password, cPassword } = formData

  const [error, setError] = useState()

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      setError('cPassword')
    } else {
      const newUser = {
        name, address, phone, username, email, password
      }
    }

  }

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="my-4 py-3">
          <Container className="justify-content-center">
            <img src="" alt="" />
            <h2>User Register</h2>
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group controlId="forName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Full Name"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  name="address"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Address"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  name="phone"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Phone Number"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  value={username}
                  name="username"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Username"
                  autoComplete="username"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Email"
                  autoComplete="email"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => onChange(e)}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Form.Group controlId="forcPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={cPassword}
                  name="cPassword"
                  onChange={(e) => onChange(e)}
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                />
                {error==='cPassword' && <Form.Text className="text-danger">Error message here.</Form.Text> }
              </Form.Group>
              <Form.Group controlId="forImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Choose a Photo" />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>
              <Button block variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default Register
