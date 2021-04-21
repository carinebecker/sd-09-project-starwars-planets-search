import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const MainNavBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">Star Wars Planets Inventory</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">All Planets</Nav.Link>
        <Nav.Link href="#link">New Planet</Nav.Link>
        <NavDropdown title="Filters" id="basic-nav-dropdown">
          <NavDropdown.Item href="#Size">Size</NavDropdown.Item>
          <NavDropdown.Item href="#crowd">Population</NavDropdown.Item>
          <NavDropdown.Item href="#farther">Distance</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl
          type="text"
          data-testid="name-filter"
          placeholder="Search by name"
          className="mr-sm-2"
        />
      </Form>
    </Navbar.Collapse>
  </Navbar>
);
export default MainNavBar;
