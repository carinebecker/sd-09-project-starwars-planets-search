import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './contextAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setFilterName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => {
        result.json()
          .then(({ results }) => {
            setData(results);
          });
      });
  }, []);

  useEffect(() => {
    let filteredData = data.filter((planet) => planet.name.includes(name));
    numericFilters.forEach(({ column, comparison, value }) => {
      if (column && comparison) {
        if (comparison === 'maior que') {
          filteredData = filteredData
            .filter((planet) => parseFloat(planet[column]) > value);
        }
        if (comparison === 'menor que') {
          filteredData = filteredData
            .filter((planet) => parseFloat(planet[column]) < value);
        }
        if (comparison === 'igual a') {
          filteredData = filteredData
            .filter((planet) => parseFloat(planet[column]) === value);
        }
      }
    });
    setFilteredPlanets(filteredData);
  }, [name, data, numericFilters]);

  const addNumericFilter = ({ column, comparison, value }) => {
    setNumericFilters([
      ...numericFilters,
      { column, comparison, value },
    ]);
  };

  const deleteNumericFilter = (column) => {
    const filters = [];
    numericFilters.forEach((filter) => {
      if (filter.column !== column) {
        filters.push(filter);
      }
    });
    setNumericFilters(filters);
  };

  const value = {
    data: filteredPlanets,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        ...numericFilters,
      ],
    },
    setFilterName,
    addNumericFilter,
    deleteNumericFilter,
  };

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
