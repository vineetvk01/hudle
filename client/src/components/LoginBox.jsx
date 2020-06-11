import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {isEmail, isValidPassword} from '../utils/validators';
import { connect } from 'react-redux';
import { authRequestAction } from '../redux/actions/authentication';
import  { Redirect } from 'react-router-dom';

const LoginCard = styled(Card)`
  margin-top: 20vh;
`;

const Box = (props) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');

  const { isLoggedIn, error : errorMessage } = props.auth;

  if(isLoggedIn){
    return <Redirect to='/dashboard' />
  }

  const handleLogin = (e) => {
    const validEmail = isEmail(email);
    const validPassword = isValidPassword(password);

    if(!validEmail){
      setError({show:true, message:'Please enter a valid Email.'});
      return;
    }
    if(!validPassword){
      setError({show:true, message:'Please enter a valid Password.'});
      return;
    }

    props.authRequest({email, password}); 
  }

  return (
    <LoginCard>
      <Card.Body>
        <h5>Login to the Job Hunt</h5>
        <hr />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="link" type="submit" href="/signup">
            Signup
          </Button>
        </Form>
      </Card.Body>
    </LoginCard>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authRequest: (user) => dispatch(authRequestAction(user)),
  }
}

export const LoginBox = connect(mapStateToProps, mapDispatchToProps)(Box);