import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import PlanetContext from '../context/context';

export default function Filter() {
  const { filters, setFilters } = useContext(PlanetContext);
  const search = (e) => setFilters({ filterByName: { name: e.target.value } });
  console.log(filters);
  return (
    <Form>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ search }
        value={ filters.filterByName.name }
        placeholder="Pesquise por nome aqui..."
      />
    </Form>);
}
