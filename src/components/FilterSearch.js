import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './FilterSearch.css';

function FilterSearch() {
  const {
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

  const setFilteredPlanets = () => {
    filterByNumericValues.forEach((filter) => {
      switch (filter.comparison) {
      case 'menor que':
        setPlanetsFilter({
          filteredPlanets: results
            .filter((planet) => parseInt(planet[filter.column], 10) < filter.value),
        });
        break;

      case 'igual a':
        setPlanetsFilter({
          filteredPlanets: results
            .filter((planet) => (
              parseInt(planet[filter.column], 10) === parseInt(filter.value, 10))),
        });
        break;

      default:
        setPlanetsFilter({
          filteredPlanets: results
            .filter((planet) => parseInt(planet[filter.column], 10) > filter.value),
        });
      }
    });
  };

  useEffect(() => {
    if (filterByNumericValues.length) {
      setFilteredPlanets();
    } else {
      setPlanetsFilter({
        filteredPlanets: results,
      });
    }
  }, [filterByNumericValues]);

  const handleChange = ({ target }) => {
    setSubmittedFilters({
      ...submittedFilters, [target.name]: target.value,
    });
  };

  const deleteElInArray = (setState, state, element) => {
    const leftEl = state.slice(0, state.indexOf(element));
    const rightEl = state.slice(state.indexOf(element) + 1);

    const updatedFilters = [...leftEl, ...rightEl];
    setState(updatedFilters);
  };

  const handleSubmit = () => {
    setInputFilter({
      filters: {
        ...inputFilter.filters,
        filterByNumericValues: [...filterByNumericValues, submittedFilters],
      },
    });

    deleteElInArray(setOptions, options, column);
    setSubmittedFilters({
      ...submittedFilters, value: '',
    });
  };

  const deleteFilter = (filter) => {
    const filterToDelete = filterByNumericValues[filter];

    setOptions([
      filterToDelete.column, ...options,
    ]);

    const updatedFilters = [
      ...filterByNumericValues.slice(0, filterByNumericValues.indexOf(filterToDelete)),
      ...filterByNumericValues.slice(filterByNumericValues.indexOf(filterToDelete) + 1),
    ];

    setInputFilter({
      filters: {
        ...inputFilter.filters,
        filterByNumericValues: updatedFilters,
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

      <div className="selected-filters">
        <h3>Filtros selecionados</h3>
        <div>
          {filterByNumericValues
            .map((filter, index) => (
              <div
                key={ index }
                className="filter-row"
                data-testid="filter"
              >
                <p>{ filter.column }</p>
                <p>{ filter.comparison }</p>
                <p>{ filter.value }</p>
                <button
                  type="button"
                  data-testid="filter"
                  className="exclude"
                  onClick={ () => deleteFilter(index) }
                >
                  X
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default FilterSearch;
