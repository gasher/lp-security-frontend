import React, { Component } from 'react';
import { Navbar as NB, Nav } from 'react-bootstrap';

import { withStore } from '../helpers';

class Navbar extends Component {
  render() {
    const { store } = this.props;

    return (
      <NB bg="dark" variant="dark">
        <NB.Brand href="/">LP Security</NB.Brand>
        {!store.authStore.isLoggedIn ? (
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        ) : (
          <Nav className="mr-auto" inline>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        )}
      </NB>
    );
  }
}

export default withStore(Navbar);
