import React, { useContext, useState } from 'react';
import AppContext from '../context/Context';

function FilterName() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [quantityFilter, setQuantityFilter] = useState(0);

  const { allPlanets, setData, filters, setFilters } = useContext(AppContext);

  const handleChange = ({ target: { value } }) => {
    setData(allPlanets.filter((planet) => planet.name.includes(value)));
    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        filterByName: { name: value },
      },
    });
  };

  const handleSubmitFilter = (event) => {
    event.preventDefault();

    let filterByNumericValues = [];

    switch (comparisonFilter) {
    case 'maior que':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[columnFilter] > parseInt(quantityFilter, 10),
      );
      break;
    case 'menor que':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[columnFilter] < parseInt(quantityFilter, 10),
      );
      break;
    case 'igual a':
      filterByNumericValues = allPlanets.filter(
        (planet) => planet[columnFilter] === quantityFilter,
      );
      break;

    default:
      filterByNumericValues = allPlanets;
      break;
    }

    setData(filterByNumericValues);
    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        filterByNumericValues: [{
          column: columnFilter,
          comparison: comparisonFilter,
          value: quantityFilter,
        }],
      },
    });
  };

  return (
    <form onSubmit={ handleSubmitFilter }>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Procure um planeta"
          onChange={ handleChange }
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (event) => setColumnFilter(event.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ (event) => setComparisonFilter(event.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            type="number"
            name="value-filter"
            id="value-filter"
            data-testid="value-filter"
            min="0"
            value={ quantityFilter }
            onChange={ (event) => setQuantityFilter(event.target.value) }
          />
        </label>
        <button type="submit" data-testid="button-filter">
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default FilterName;
