import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import YodaContext from '../local_resources/Context';

const colunmFilter = (setFilterData, executeSearch) => (
  <Form inline>
    <Form.Control
      as="select"
      data-testid="column-filter"
      custom
      size="sm"
      name="column"
      required
      defaultValue="Filter by column"
      onChange={ (evt) => setFilterData(evt) }
    >
      <option>population</option>
      <option>orbital_period</option>
      <option>diameter</option>
      <option>rotation_period</option>
      <option>surface_water</option>
    </Form.Control>
    <Form.Control
      as="select"
      data-testid="comparison-filter"
      custom
      size="sm"
      name="comparison"
      required
      defaultValue="Define a comparator"
      onChange={ (evt) => setFilterData(evt) }
    >
      <option>maior que</option>
      <option>menor que</option>
      <option>igual a</option>
    </Form.Control>
    <Form.Control
      type="number"
      min="0"
      data-testid="value-filter"
      placeholder="A value to compare"
      className="mr-sm-2"
      size="sm"
      name="value"
      required
      onChange={ (evt) => setFilterData(evt) }
    />
    <Button
      variant="primary"
      type="submit"
      data-testid="button-filter"
      size="sm"
      onClick={ (evt) => executeSearch(evt) }
    >
      Search
    </Button>
  </Form>
);

const Inputs = (customizedFiltersSearch) => {
  const { setFilters, filters } = useContext(YodaContext);
  const executeSearch = (event) => {
    event.preventDefault();
    return (customizedFiltersSearch(filters));
  };
  const setFilterData = ({ target }) => {
    if (target.value === 'Filter by column' || target.value === 'Define a comparator') {
      return setFilters({ ...filters,
        filterByNumericValues: { ...filters.filterByNumericValues, [target.name]: '' } });
    }
    return setFilters({ ...filters,
      filterByNumericValues:
      { ...filters.filterByNumericValues, [target.name]: target.value } });
  };
  return (
    colunmFilter(setFilterData, executeSearch)
  );
};
export default Inputs;
