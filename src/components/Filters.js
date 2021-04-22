import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Filters() {
  const { filters, setFilters, setNumericValuesFilter } = useContext(PlanetContext);
  const [columnFilters, setColumnFilters] = useState({
    column: '', value: '', comparison: '',
  });

  const getSearchInput = ({ target }) => {
    const { value } = target;
    const filterObj = { ...filters, filterByName: { name: value } };
    setFilters(filterObj);
  };

  const numericValuesFilter = ({ target: { name, value } }) => {
    if (name === 'column') setColumnFilters({ ...columnFilters, column: value });
    if (name === 'comparison') setColumnFilters({ ...columnFilters, comparison: value });
    if (name === 'value') setColumnFilters({ ...columnFilters, value });
  };

  const searchInput = () => (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        name="name"
        placeholder="Pesquise pelo nome de um planeta"
        value={ filters.filterByName.name }
        onChange={ getSearchInput }
      />
    </label>
  );
  const columnFilter = () => (
    <select
      data-testid="column-filter"
      name="column"
      onChange={ numericValuesFilter }
    >
      <option value="">Select</option>
      <option value="population">population</option>
      <option value="orbital_period">orbital_period</option>
      <option value="diameter">diameter</option>
      <option value="rotation_period">rotation_period</option>
      <option value="surface_water">surface_water</option>
    </select>
  );
  const comparisonFilter = () => (
    <select
      data-testid="comparison-filter"
      name="comparison"
      onChange={ numericValuesFilter }
    >
      <option value="">Select</option>
      <option value="maior que">maior que</option>
      <option value="menor que">menor que</option>
      <option value="igual a">igual a</option>
    </select>
  );
  const valueFilter = () => (
    <input
      type="number"
      onChange={ numericValuesFilter }
      name="value"
      placeholder="valor"
      data-testid="value-filter"
    />
  );
  const handleClick = () => {
    setFilters(
      { ...filters,
        filterByNumericValues: [{ ...columnFilters }] },
    );
    setNumericValuesFilter(true);
  };

  return (
    <form>
      {searchInput()}
      {columnFilter()}
      {comparisonFilter()}
      {valueFilter()}
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
