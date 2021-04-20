import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const options = {
    filterByName: { name: '' },
    filterByNumericOptions: {
      column: '',
      comparison: '',
      value: '',
    },
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
    const { filterByName: { name }, filterByNumericOptions } = filters;
    const { column, comparison, value } = filterByNumericOptions;
    const planetsFilteredByName = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    if (comparison === 'maior que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      setFilteredPlanets(result);
    }
    if (comparison === 'menor que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      setFilteredPlanets(result);
    }
    if (comparison === 'igual a') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      setFilteredPlanets(result);
    }
    if (comparison === '') {
      setFilteredPlanets(planetsFilteredByName);
    }
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
