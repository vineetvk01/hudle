import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginBox } from '../components/LoginBox';

export const Login = () => {

  return (
    <Container fluid>
      <Row>
        <Col xs={7}>
          <img src={process.env.PUBLIC_URL + '/img/background.jpg'} style={{width: '100%', height: '110%'}} /> 
        </Col>
        <Col xs={5}>
          <LoginBox />
        </Col>
      </Row>
    </Container>
  )
}