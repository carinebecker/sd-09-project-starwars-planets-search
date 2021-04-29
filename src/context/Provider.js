import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const filtersOptions = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  };

  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(filtersOptions);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => error);
  }, []);

  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const {
      column, comparison, value,
    } = filterByNumericValues[filterByNumericValues.length - 1];

    const byName = planets
      .filter((planet) => planet.name.includes(name));

    if (comparison === '') {
      const result = byName;
      setFiltered(result);
    }

    if (comparison === 'maior que') {
      const result = byName
        .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      setFiltered(result);
    }

    if (comparison === 'igual a') {
      const result = byName.filter((planet) => planet[column] === value);
      setFiltered(result);
    }

    if (comparison === 'menor que') {
      const result = byName.filter((planet) => planet[column] < value);
      setFiltered(result);
    }
  }, [planets, filters]);

  const context = {
    planets,
    setPlanets,
    filters,
    setFilters,
    filtered,
    setFiltered,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
