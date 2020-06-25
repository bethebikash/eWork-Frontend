import React from 'react'
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap'

const Login = () => {
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="my-4 py-3">
          <Container>
            <img src="" alt="" />
            <h2>User Login</h2>
            <Form>
              <Form.Group controlId="forUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter Username" />
                <Form.Text className="text-danger">Error message here.</Form.Text>
              </Form.Group>

              <Form.Group controlId="forPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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

export default Login
