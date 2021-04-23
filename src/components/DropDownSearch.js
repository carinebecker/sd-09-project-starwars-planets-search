import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const columnFilter = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisonFilter = ['maior que', 'menor que', 'igual a'];

function DropDownSearch() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [inputValues, setInputValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const handleChange = ({ target }) => {
    setInputValues({
      ...inputValues,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          column: inputValues.column,
          comparison: inputValues.comparison,
          value: inputValues.value,
        },
      ],
    });
  };

  return (
    <section className="drop">
      <label htmlFor="columnFilter">
        Select column
        <select
          id="columnFilter"
          name="column"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          {columnFilter.map((filter) => (
            <option key={ filter } value={ filter }>{ filter }</option>
          ))}
        </select>
      </label>

      <label htmlFor="compFilter">
        Select comparison
        <select
          id="compFilter"
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          {comparisonFilter.map((filter) => (
            <option key={ filter } value={ filter }>{ filter }</option>
          ))}
        </select>
      </label>
      <input
        type="number"
        placeholder="write a number"
        data-testid="value-filter"
        name="value"
        value={ inputValues.value }
        onChange={ handleChange }
      />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filter
      </button>
    </section>
  );
}

export default DropDownSearch;
