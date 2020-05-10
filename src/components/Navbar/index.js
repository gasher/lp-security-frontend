import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Navbar as NB, Nav } from 'react-bootstrap';

import { withStore } from '../helpers';

class Navbar extends Component {
  async handleSignOut() {
    const {
      store: { authStore },
    } = this.props;

    await authStore.reset();

    return this.props.history.push('/login');
  }
  render() {
    const {
      store: { authStore },
    } = this.props;

    return (
      <NB bg="dark" variant="dark">
        <NB.Brand href="/">LP Security</NB.Brand>
        {!authStore.isLoggedIn ? (
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        ) : (
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cameras">Cameras</Nav.Link>
            <Nav.Link href="/routines">Routines</Nav.Link>
            <Nav.Link href="/configs">Configs</Nav.Link>
            <Nav.Link href="/triggers">Triggers</Nav.Link>
            <Nav.Link onClick={() => this.handleSignOut()}>Sign out</Nav.Link>
          </Nav>
        )}
      </NB>
    );
  }
}

export default withRouter(withStore(Navbar));
