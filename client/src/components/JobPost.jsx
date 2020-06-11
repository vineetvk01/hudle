import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const JobCard = styled(Card)`
  margin: 10px 0;
  padding: 0;
`

export const JobPost = () => {

  return (
    <JobCard>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={2}>
              <img src={process.env.PUBLIC_URL + '/img/kasual.webp'} style={{ width: '100%' }} />
            </Col>
            <Col xs={6}>
              <Card.Title>Kasual</Card.Title>
              <Card.Text>
                Full Stack Software Developer | $18k - $36k | Remote
                  </Card.Text>
              <Button variant="outline-secondary">Apply Now</Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </JobCard>
  )
}