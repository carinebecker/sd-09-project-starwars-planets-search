import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function FilterSearch() {
  const {
    planetsFilter: { filteredPlanets },
    setPlanetsFilter,
    dataFromApi: { planets: { results } },
    inputFilter,
    inputFilter: { filters: { filterByNumericValues } },
    setInputFilter,
  } = useContext(StarWarsContext);

  const [submittedFilters, setSubmittedFilters] = useState({
    filter: { column: 'population', comparison: 'maior que', value: '' },
    optionFilters: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  });

  const { filter: { column, comparison, value } } = submittedFilters;
  const { optionFilters } = submittedFilters;

  const handleChange = ({ target }) => {
    setSubmittedFilters({
      ...submittedFilters,
      filter: { ...submittedFilters.filter, [target.name]: target.value },
    });
  };

  const handleSubmit = () => {
    setInputFilter({
      filters: {
        ...inputFilter.filters,
        filterByNumericValues: [...filterByNumericValues, submittedFilters],
      },
    });

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

    setSubmittedFilters({
      ...submittedFilters,
      filter: { column: 'population', comparison: 'maior que', value: '' },
    });

    optionFilters.splice(optionFilters.indexOf(column), 1);
  };

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleChange }
      >
        {optionFilters.map((option, index) => <option key={ index }>{option}</option>)}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
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
