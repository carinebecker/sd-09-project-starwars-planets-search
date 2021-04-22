import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Filters() {
  const { filters,
    setFilters,
    setNumericValuesFilter, numericValuesFilterOn } = useContext(PlanetContext);

  const [columnFilters, setColumnFilters] = useState({
    column: '', value: '', comparison: '',
  });

  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

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
      {columns.map((column) => (
        <option key={ column } value={ column }>{column}</option>))}
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
    setFilters((currentFilters) => ({
      ...currentFilters,
      filterByNumericValues: [...currentFilters.filterByNumericValues, columnFilters],
    }));
    //   { ...filters,
    //     filterByNumericValues: [...filters.filterByNumericValues, columnFilters] },
    // );
    const { column } = columnFilters;
    columns.splice(columns.indexOf(column), 1);
    setColumns(columns);
    setNumericValuesFilter(true);
  };

  const removeFilter = (index) => {
    const columnFiltersBlank = {
      column: '', value: '', comparison: '',
    };
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length === 1) {
      filterByNumericValues.splice(index, 1, columnFiltersBlank);
      setFilters({ ...filters, filterByNumericValues });
      setNumericValuesFilter(false);
    }
    if (filterByNumericValues.length > 1) {
      filterByNumericValues.splice(index, 1);
      setFilters({ ...filters, filterByNumericValues });
    }
  };

  const renderRemoveFiltersButton = (completeFilter, index) => {
    const { column, comparison, value } = completeFilter;
    return (
      <div data-testid="filter">
        <button
          type="button"
          onClick={ () => removeFilter(index) }
          key={ `${column} ${comparison} ${value}` }
        >
          {`${column} ${comparison} ${value} X`}
        </button>
      </div>
    );
  };

  const renderAllRemoveButtons = () => {
    const { filterByNumericValues } = filters;
    return filterByNumericValues.map((completeFilter, index) => (
      renderRemoveFiltersButton(completeFilter, index)));
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
      {numericValuesFilterOn && renderAllRemoveButtons()}
    </form>
  );
}

export default Filters;
