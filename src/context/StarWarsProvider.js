import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const options = {
    filterByName: { name: '' },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  };

  const initialColumns = ['rotation_period', 'orbital_period', 'diameter',
    'surface_water', 'population'];

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(options);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columns, setColumns] = useState(initialColumns);

  const compare = (planet1, planet2) => {
    const { order: { sort } } = filters;
    const magicNumber = -1;
    if (sort === 'ASC') {
      return (planet1 > planet2) ? 1 : magicNumber;
    }
    if (sort === 'DESC') {
      return (planet2 > planet1) ? 1 : magicNumber;
    }
    return 0;
  };

  const sortPlanets = (planets) => {
    const { order: { column } } = filters;
    planets.sort((planet1, planet2) => {
      const a = (column === 'name') ? planet1[column] : parseInt(planet1[column], 10);
      const b = (column === 'name') ? planet2[column] : parseInt(planet2[column], 10);
      return compare(a, b);
    });
  };

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((item) => setData(item.results));
  }, []);

  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const { column, comparison,
      value } = filterByNumericValues[filterByNumericValues.length - 1];
    const planetsFilteredByName = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    if (comparison === 'maior que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      setFilteredPlanets(result);
      sortPlanets(result);
    }
    if (comparison === 'menor que') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      setFilteredPlanets(result);
      sortPlanets(result);
    }
    if (comparison === 'igual a') {
      const result = planetsFilteredByName
        .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      setFilteredPlanets(result);
      sortPlanets(result);
    }
    if (comparison === '') {
      setFilteredPlanets(planetsFilteredByName);
      sortPlanets(planetsFilteredByName);
    }
  }, [data, filters]);

  const context = {
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
    columns,
    setColumns,
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
