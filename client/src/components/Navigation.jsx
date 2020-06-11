import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequestAction } from '../redux/actions/authentication';

const UserInfo = ({ first_name, last_name, logout }) => {
  return (
    <>
      <Nav.Link href="/dashboard">Hi, {first_name} {last_name}</Nav.Link>
      <Nav.Link onClick={(e) => logout()}>Logout</Nav.Link>
    </>
  )
}

const _Navigation = ({ auth, logoutUser }) => {

  const { isLoggedIn, user } = auth;
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">JobHunt</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav>
      <Nav className="mr-right">
        {isLoggedIn ? <UserInfo first_name={user.first_name} last_name={user.last_name} logout={logoutUser} /> : <Nav.Link href="/login">Login</Nav.Link>}
      </Nav>
    </Navbar>

  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutRequestAction()),
  }
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(_Navigation);