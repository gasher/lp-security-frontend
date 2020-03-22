import React from 'react';
import { Navbar as NB, Nav } from 'react-bootstrap';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <NB bg="dark" variant="dark">
      <NB.Brand href="/">LP Security</NB.Brand>
      {!token ? (
        <Nav className="mr-auto" inline>
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
};

export default Navbar;
