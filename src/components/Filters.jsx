import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const initialState = {
  column: 'rotation_period',
  comparison: 'maior que',
  value: '',
};

function Filters() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const [selectedFilters, setSelectedFilters] = useState(initialState);

  const handleNameChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericOptions: selectedFilters,
    });
  };

  const renderColumnOptions = () => {
    const { column } = selectedFilters;
    const columns = ['rotation_period', 'orbital_period', 'diameter',
      'surface_water', 'population'];
    return (
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
        value={ column }
      >
        {
          columns.map((item) => (
            <option key={ item }>{ item }</option>
          ))
        }
      </select>
    );
  };

  const renderComparisonOptions = () => {
    const { comparison } = selectedFilters;
    const comparisonOptions = ['maior que', 'menor que', 'igual a'];
    return (
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
        value={ comparison }
      >
        {
          comparisonOptions.map((item) => (
            <option key={ item }>{ item }</option>
          ))
        }
      </select>
    );
  };

  const renderValueInputOption = () => {
    const { value } = selectedFilters;
    return (
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          id="value-filter"
          onChange={ handleChange }
          value={ value }
        />
      </label>
    );
  };

  return (
    <section>
      <div>
        <label htmlFor="name-filter">
          Search by name:
          <input
            type="text"
            name="name"
            data-testid="name-filter"
            id="name-filter"
            onChange={ handleNameChange }
          />
        </label>
      </div>
      <div>
        { renderColumnOptions() }
        { renderComparisonOptions() }
        { renderValueInputOption() }
      </div>
      <div>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default Filters;
