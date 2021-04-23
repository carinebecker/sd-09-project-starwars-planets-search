import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import YodaContext from '../local_resources/Context';
import Inputs from './Inputs';
import ShowFilters from './ShowFilters';

const MainNavBar = () => {
  const { setFilters, filters } = useContext(YodaContext);
  const getSearchData = ({ target }) => setFilters(
    { ...filters, filterByName: { name: target.value } },
  );
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Star Wars Planets Inventory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          { Inputs() }
        </Nav>
        <Nav>
          <ShowFilters />
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            data-testid="name-filter"
            placeholder="Search by name"
            className="mr-sm-2"
            onChange={ (evt) => getSearchData(evt) }
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MainNavBar;
