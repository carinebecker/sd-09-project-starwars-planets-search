import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const NumericFilter = () => {
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparisionSel, setComparisionSel] = useState('maior que');
  const [input, setInput] = useState('');
  const [columnSel, setColumnSel] = useState(columns[0]);
  const {
    filters: { filterByNumericValues: { column, comparison } },
    getNumericFilters,
  } = useContext(StarWarsContext);
  const comparisonFilter = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target }) => {
    switch (target.name) {
    case 'column':
      return setColumnSel(target.value);
    case 'comparision':
      return setComparisionSel(target.value);
    default:
      return setInput(target.value);
    }
  };

  const handleClick = () => {
    const filters = {
      column: columnSel,
      comparison: comparisionSel,
      value: input,
    };
    setColumns(columns.filter((item) => item !== columnSel));
    setColumnSel(columns[0]);
    getNumericFilters(filters);
  };

  const renderSelect = (items) => (
    items.map((item) => (
      <option
        key={ item }
        value={ item }
      >
        { item }
      </option>))
  );

  const renderColumnFilter = () => (
    <label htmlFor="column">
      Select column:
      <select
        value={ columnSel }
        id="column"
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {renderSelect(columns)}
      </select>
    </label>
  );

  const renderComparisonFilter = () => (
    <label htmlFor="comparision">
      Select method:
      <select
        value={ comparisionSel }
        id="comparision"
        name="comparision"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        {renderSelect(comparisonFilter)}
      </select>
    </label>
  );

  const renderInputNumber = () => (
    <input
      type="number"
      placeholder="1000"
      name="value"
      value={ input }
      data-testid="value-filter"
      onChange={ handleChange }
    />
  );

  const renderButton = () => (
    <button
      type="button"
      data-testid="button-filter"
      disabled={ column || comparison || input <= 0 }
      onClick={ handleClick }
    >
      Filter
    </button>
  );

  return (
    <div>
      {renderColumnFilter()}
      {renderComparisonFilter()}
      {renderInputNumber()}
      {renderButton()}
    </div>
  );
};

export default NumericFilter;
