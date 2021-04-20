import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const options = {
    filterByName: { name: '' },
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(options);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((item) => setData(item.results));
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const newArray = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredPlanets(newArray);
  }, [data, filters]);

  const context = {
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
