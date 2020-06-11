import React from 'react';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

import styled from 'styled-components';

const UserBox = styled.div`
  padding: 5vh 0;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 700;
  padding: 0;
  margin: 0;
`

const Profile = styled.p`
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  margin: 0;
  color: #666;
`;

const Type = styled.p`
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  margin: 0;
  color: #333;
`;

export const UserInfo = () => {
  return (
    <UserBox>
      <Card>
        <Card.Body style={{ padding: '10px' }}>
          <Container fluid>
            <Row>
              <Col xs={4}>
                <Image src={process.env.PUBLIC_URL + '/img/candidate.jpg'} style={{ width: '70px' }} roundedCircle />
              </Col>
              <Col xs={8}>
                <Name>Vineet Srivastav</Name>
                <Profile>Full Stack Developer</Profile>
                <Type>Type: Candidate</Type>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <hr />
      <Card>
        <Card.Body style={{ padding: '10px' }}>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
              Search
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Applied
            </ListGroup.Item>
            <ListGroup.Item action>
              Rejected
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </UserBox>
  )
}