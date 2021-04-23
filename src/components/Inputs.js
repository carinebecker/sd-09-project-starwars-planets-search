import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import YodaContext from '../local_resources/Context';
import KeyGenerator from '../local_resources/KeyGenerator';

const keygen = KeyGenerator();
const MAX_FILTERS_NUMBER = 2;
const colunmFilter = (setFilterData, executeSearch, columns) => (
  <Form inline>
    <Form.Control
      as="select"
      data-testid="column-filter"
      custom
      size="sm"
      name="column"
      required
      onChange={ (evt) => setFilterData(evt) }
    >
      { columns.map((column) => (
        <option key={ keygen.next().value }>{ column }</option>)) }
    </Form.Control>
    <Form.Control
      as="select"
      data-testid="comparison-filter"
      custom
      size="sm"
      name="comparison"
      required
      defaultValue="maior que"
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

const reorderColumns = (columns, column) => {
  const index = columns.indexOf(column);
  if (columns[0] === columns[index]) { return columns; }
  const firstColumn = columns[0];
  columns = [
    ...columns.slice(0, 0),
    column,
    ...columns.slice(1, index), firstColumn,
    ...columns.slice(index + 1, columns.length)];
  return columns;
};

const Inputs = () => {
  const {
    setFilters,
    filters,
    setShowToast,
    showToast,
    customizedFilter,
    setCustomizedFilter,
    setFilterReady,
    columns,
    setColumns } = useContext(YodaContext);
  const executeSearch = (event) => {
    event.preventDefault();
    setColumns([
      ...columns.slice(0, 0),
      ...columns.slice(1, columns.length),
    ]);
    setFilterReady(true);
    if (filters.filterByNumericValues.length >= MAX_FILTERS_NUMBER) {
      setShowToast([...showToast.slice(0, 1), true]);

      setFilters(
        { ...filters,
          filterByNumericValues: [
            ...filters.filterByNumericValues.slice(0, 1),
            customizedFilter,
          ] },
      );
    }
    if (filters.filterByNumericValues.length < MAX_FILTERS_NUMBER) {
      setShowToast([...showToast.slice(0, filters.filterByNumericValues.length), true]);
      setFilters(
        { ...filters,
          filterByNumericValues: [
            ...filters.filterByNumericValues,
            customizedFilter,
          ] },
      );
    }
  };

  const setFilterData = ({ target }) => {
    let { value } = target;
    value = target.value === '' ? '0' : target.value;
    setCustomizedFilter(
      { ...customizedFilter, [target.name]: value },
    );
    if (target.name === 'column') { setColumns(reorderColumns(columns, value)); }
  };
  return (colunmFilter(setFilterData, executeSearch, columns));
};
export default Inputs;
