import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './contextAPI';
import fetchPlanets from './fetchPlanets';

const Provider = ({ children }) => {
  const [data, changeData] = useState([]);
  const [name, changeFilterName] = useState('');
  const [numericFilters, changeNumericFilters] = useState(
    {
      column: '',
      comparison: '',
      value: 0,
    },
  );
  const [filteredPlanets, changeFilteredPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then(({ results }) => {
      changeData(results);
    });
  }, []);

  useEffect(() => {
    const { column, comparison, value } = numericFilters;
    let filtered = data.filter((planet) => planet.name.includes(name));
    if (column && comparison) {
      switch (comparison) {
      case 'maior que':
        filtered = filtered.filter((planet) => parseFloat(planet[column]) > value);
        break;
      case 'menor que':
        filtered = filtered.filter((planet) => parseFloat(planet[column]) < value);
        break;
      case 'igual a':
        filtered = filtered.filter((planet) => parseFloat(planet[column]) === value);
        break;
      default:
        break;
      }
    }
    changeFilteredPlanets(filtered);
  }, [name, data, numericFilters]);

  const value = {
    data: filteredPlanets,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [{
        ...numericFilters,
      }],
    },
    changeFilterName,
    changeNumericFilters,
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
