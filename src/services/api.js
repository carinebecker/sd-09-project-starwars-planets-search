import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext({});

function Planets({ children }) {
  const [data, setData] = useState([]);
  const [seekText, setSeekText] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [columnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const [comparisonFilter] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  useEffect(() => {
    const searchingPlanets = data.filter((planet) => planet.name.includes(seekText));
    setFilterPlanets(searchingPlanets);
  }, [data, seekText]);

  function handleClick() {
    const numericFilterPlanets = data.filter((planet) => {
      const tag = Number(planet[numericFilters.column]);
      const inputValue = Number(numericFilters.value);
      if (numericFilters.comparison === 'maior que') {
        return tag > inputValue;
      }
      if (numericFilters.comparison === 'menor que') {
        return tag < inputValue;
      }
      if (numericFilters.comparison === 'igual a') {
        return tag === inputValue;
      }
      return (numericFilterPlanets);
    });
    setFilterPlanets(numericFilterPlanets);
  }

  function filterNameInput() {
    return (
      <div>
        <form>
          <label htmlFor="name-filter">
            PLANETAS
            <input
              type="text"
              onChange={ (item) => setSeekText(item.target.value) }
              placeholder="Search"
              name="name-filter"
              data-testid="name-filter"
            />
          </label>
        </form>
      </div>
    );
  }

  function handleChangeColumn(event) {
    setNumericFilters({ ...numericFilters, column: event.target.value });
  }

  function handleChangeComparison(event) {
    setNumericFilters({ ...numericFilters, comparison: event.target.value });
  }

  function handleChangeValue(event) {
    setNumericFilters({ ...numericFilters, value: event.target.value });
  }

  function numericFiltersSelects() {
    return (
      <section>
        <div>
          <select data-testid="column-filter" onChange={ handleChangeColumn }>
            {columnFilter.map((tag) => (
              <option key={ tag } value={ tag }>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            data-testid="comparison-filter"
            onChange={ handleChangeComparison }
          >
            {comparisonFilter.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>
          <input
            data-testid="value-filter"
            type="number"
            onChange={ handleChangeValue }
          />
        </div>
        <div>
          <button
            data-testid="button-filter"
            type="button"
            onClick={ handleClick }
          >
            FILTRAR
          </button>
        </div>
      </section>
    );
  }

  const contextValue = {
    data,
    filterPlanets,
  };

  return (
    <Context.Provider value={ contextValue }>
      {numericFiltersSelects()}
      { filterNameInput() }
      {children}
    </Context.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.element.isRequired,
};

export { Planets, Context };
