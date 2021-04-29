import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext({});

function Planets({ children }) {
  const [data, setData] = useState([]);
  const [seekText, setSeekText] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  useEffect(() => {
    const searchingPlanets = data.filter((planet) => planet.name.includes(seekText));
    setFilterPlanets(searchingPlanets);
  }, [data, seekText]);

  function filterByNameInput() {
    return (
      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            onChange={ (e) => setSeekText(e.target.value) }
            placeholder="Search"
            name="name-filter"
            data-testid="name-filter"
          />
        </label>
      </form>
    );
  }

  const contextValue = {
    data,
    filterPlanets,
  };

  return (
    <Context.Provider value={ contextValue }>
      { filterByNameInput() }
      {children}
    </Context.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.element.isRequired,
};

export { Planets, Context };
