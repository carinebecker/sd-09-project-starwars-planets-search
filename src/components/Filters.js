import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { filters, setFilters } = useContext(MyContext);
  const { filterByNumericValues } = filters;

  const numberFilter = {
    column: 'population',
    comparison: '',
    value: '',
  };

  const handleChangeSearch = ({ target }) => {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    numberFilter[name] = value;
  };

  const atualizeNumeric = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numberFilter],
    });
  };

  return (
    <section>
      <label htmlFor="name-filter">
        Search Planet
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ handleChangeSearch }
        />
      </label>
      <label htmlFor="column-filter">
        Column filter
        <select
          data-testid="column-filter"
          id="column-filter"
          value={ numberFilter.column }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison filter
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          name="comparison"
          onChange={ handleChange }
        >
          <option value="">Select</option>
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Type number
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          name="value"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ atualizeNumeric }
      >
        Filter
      </button>
    </section>
  );
}

export default Filters;
