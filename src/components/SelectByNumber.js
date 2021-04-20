import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SelectByNumber() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const INITIAL_FILTER = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [selectedFilters, setSelectedFilters] = useState({ ...INITIAL_FILTER });

  const [arrayOptions, setArrayOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  function handleChange({ target: { value, name } }) {
    setSelectedFilters({ ...selectedFilters, [name]: value });
  }

  function handleClick() {
    setFilters({ ...filters, ...{ filterByNumericValues: [selectedFilters] } });
    console.log(selectedFilters);
    setArrayOptions([...arrayOptions.filter((option) => option
      !== selectedFilters.column)]);
  }

  function handleClear() {
    setFilters({ ...filters, ...{ filterByNumericValues: [INITIAL_FILTER] } });
  }

  return (
    <div>
      <select name="column" data-testid="column-filter" onChange={ handleChange }>
        {arrayOptions.map((opt) => <option htmlFor="column" key={ opt }>{opt}</option>)}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>

      </select>
      <input
        onChange={ handleChange }
        data-testid="value-filter"
        type="number"
        placeholder="0"
        name="value"
      />
      <button
        onClick={ handleClick }
        data-testid="button-filter"
        type="button"
        value="Filtrar"
      >
        Filtrar
      </button>
      <div data-testid="filter">
        <button
          onClick={ handleClear }
          type="button"
          value="X"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default SelectByNumber;
