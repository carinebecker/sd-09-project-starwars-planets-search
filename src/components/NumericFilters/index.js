import React, { useState } from 'react';
import useNumericFilter from '../../hooks/useNumericFilters';

const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumericFilters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericSearchTerm, setNumericSearchTerm] = useState('0');
  const { filter, setNumericFilter } = useNumericFilter();

  const checkOptions = () => {
    if (filter.filterByNumericValues.length) {
      return columnOptions.filter((columnOpt) => filter.filterByNumericValues.find(
        ({ column: filteredColumn }) => filteredColumn !== columnOpt,
      ));
    }
    return columnOptions;
  };

  const setNewNumFilter = () => {
    const newFilter = {
      column,
      comparison,
      numericSearchTerm,
    };
    setNumericFilter(newFilter);
  };

  const drawSelect = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  return (
    <>
      <select
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
        name="column"
        id="column"
        value={ column }
      >
        {drawSelect([...checkOptions()])}
      </select>
      <select
        onChange={ (e) => setComparison(e.target.value) }
        data-testid="comparison-filter"
        name="comparison"
        id="comparison"
        value={ comparison }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
      <input
        type="text"
        onChange={ (e) => setNumericSearchTerm(e.target.value) }
        data-testid="value-filter"
        name="value"
        id="value"
        value={ numericSearchTerm }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ setNewNumFilter }
      >
        Incluir Filtro
      </button>
    </>
  );
}

export default NumericFilters;
