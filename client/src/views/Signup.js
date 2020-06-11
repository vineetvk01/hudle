import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SignupBox } from '../components/SignupBox';

export const Signup = () => {

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SignupBox />
        </Col>
      </Row>
    </Container>
  )
}