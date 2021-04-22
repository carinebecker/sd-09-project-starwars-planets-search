import React, { useContext } from 'react';
import { SwPlanetsContext } from '../context/SWPlanetsContext';

function Form() {
  const {
    filters: { filterByName: { name }, filterByNumericValues: { value } },
    handleNameChange,
    handleClick,
    handleValueChange,
  } = useContext(SwPlanetsContext);

  const columnFilter = ['-', 'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const comparisonFilter = ['-', 'maior que', 'menor que', 'igual a'];

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        value={ name }
        onChange={ handleNameChange }
        placeholder="Planet Name"
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleValueChange }
        defaultValue="-"
      >
        { columnFilter.map((option, index) => ((index === 0) ? (
          <option value={ option } key="default-column-value" disabled>{option}</option>
        ) : (
          <option value={ option } key={ option }>{option}</option>
        ))) }
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleValueChange }
        defaultValue="-"
      >
        { comparisonFilter.map((option, index) => ((index === 0) ? (
          <option
            value={ option }
            key="default-comparison-value"
            disabled
          >
            {option}
          </option>
        ) : (
          <option value={ option } key={ option }>{option}</option>
        ))) }
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ handleValueChange }
        placeholder="Value Filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
    </form>
  );
}

export default Form;
