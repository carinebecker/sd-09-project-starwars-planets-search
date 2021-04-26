import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './context';

const Provider = ({ children }) => {
  const [data, changeData] = useState([]);
  const [name, changeFilterName] = useState('');
  const [filteredPlanets, changeFilteredPlanets] = useState([]);
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => {
        result.json()
          .then(({ results }) => {
            changeData(results);
          });
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((planet) => planet.name.includes(name));
    changeFilteredPlanets(filtered);
  }, [name, data]);

  const value = {
    data: filteredPlanets,
    filters: {
      filterByName: {
        name,
      },
    },
    changeFilterName,
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
