import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function FilterSearch() {
  const {
    planetsFilter: { filteredPlanets },
    setPlanetsFilter,
    dataFromApi: { planets: { results } },
    inputFilter,
    setInputFilter,
  } = useContext(StarWarsContext);
  const { filters: { filterByNumericValues } } = inputFilter;
  const { column, comparison, value } = filterByNumericValues[0];
  // const [submittedFilters, setSubmittedFilters] = useState({ allFilters: [] });

  const handleChange = ({ target }) => {
    setInputFilter({
      filters: {
        ...inputFilter.filters,
        filterByNumericValues: [
          {
            column, comparison, value, [target.name]: target.value,
          },
        ],
      },
    });
  };

  const handleSubmit = () => {
    let data = results;
    if (filteredPlanets.length) { data = filteredPlanets; }

    switch (comparison) {
    case 'menor que':
      setPlanetsFilter({
        filteredPlanets: data.filter((planet) => parseInt(planet[column], 10) < value),
      });
      break;

    case 'igual a':
      setPlanetsFilter({
        filteredPlanets: data
          .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10)),
      });
      break;

    default:
      setPlanetsFilter({
        filteredPlanets: data.filter((planet) => parseInt(planet[column], 10) > value),
      });
    }
  };

  return (
    <form>
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSubmit }
      >
        Filtrar
      </button>
    </form>
  );
}

FilterSearch.propTypes = {
  filter: PropTypes.shape({ }),
  setFilter: PropTypes.func,
}.isRequired;

export default FilterSearch;
