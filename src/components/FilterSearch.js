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
    column: 'population', comparison: 'maior que', value: '',
  });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const { column, comparison, value } = submittedFilters;

  const handleChange = ({ target }) => {
    setSubmittedFilters({
      ...submittedFilters, [target.name]: target.value,
    });
  };

  const deleteElInArray = (setState, state, element) => {
    const leftEl = state.slice(0, state.indexOf(element));
    const rightEl = state.slice(state.indexOf(element) + 1);

    const newArr = [...leftEl, ...rightEl];
    setState(newArr);
    return newArr;
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
      column: 'population', comparison: 'maior que', value: '',
    });

    deleteElInArray(setOptions, options, column);
  };

  const deleteFilter = (filter) => {
    const filterToDelete = filterByNumericValues[filter];

    const newArr = [
      ...filterByNumericValues.slice(0, filterByNumericValues.indexOf(filterToDelete)),
      ...filterByNumericValues.slice(filterByNumericValues.indexOf(filterToDelete) + 1),
    ];

    setInputFilter({
      filters: {
        ...inputFilter.filters,
        filterByNumericValues: newArr,
      },
    });
  };

  return (
    <>
      <form>
        <select
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ handleChange }
        >
          {options.map((option, index) => <option key={ index }>{option}</option>)}
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
      <table>
        <thead>
          <tr>
            <th>Filtros selecionados</th>
          </tr>
        </thead>
        <tbody>
          {filterByNumericValues
            .map((filter, index) => (
              <tr key={ index }>
                <td>{ filter.column }</td>
                <td>{ filter.comparison }</td>
                <td>{ filter.value }</td>
                <td>
                  <button
                    type="button"
                    data-testid="filter"
                    onClick={ () => deleteFilter(index) }
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

FilterSearch.propTypes = {
  filter: PropTypes.shape({ }),
  setFilter: PropTypes.func,
}.isRequired;

export default FilterSearch;
