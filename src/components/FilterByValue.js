import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FilterByValue.css';

const FilterByValue = () => {
  const { filters,
    handlefilterByValue,
    handleInputfilterByValue,
    clickHandler,
  } = useContext(PlanetsContext);
  const { column, comparison, value } = filters.filterByValue[0];

  return (
    <section className="custom-selected">
      <select
        className="select-selected"
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => handlefilterByValue('column', target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        className="select-selected"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => handlefilterByValue('comparison', e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>

      <input
        className="select-selected"
        data-testid="value-filter"
        value={ value }
        onChange={ handleInputfilterByValue }
      />
      <button
        className="button"
        type="button"
        data-testid="button-filter"
        onClick={ clickHandler }
      >
        Filtrar
      </button>
    </section>
  );
};

export default FilterByValue;
