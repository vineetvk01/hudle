import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchJob } from '../components/SearchJob';
import { UserInfo } from '../components/UserInfo';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const _Dashboard = ({ auth: { isLoggedIn }}) => {

  if(!isLoggedIn){
    return <Redirect to='/login' />
  }

  return(
    <Container fluid>
      <Row>
        <Col md={3}>
          <UserInfo />
        </Col>
        <Col md={9}>
          <SearchJob  />
        </Col>
      </Row>
    </Container> 
    
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}


export const Dashboard = connect(mapStateToProps)(_Dashboard);