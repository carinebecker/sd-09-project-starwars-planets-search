import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const fetchPlanets = async () => {
    const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json());
    setPlanets(results);
  };

  const filterPlanetByName = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const CONTEXT_VALUE = {
    data: planets,
    filters: {
      filterByName: {
        name: nameFilter,
      },
    },
    filterPlanetByName,
  };

  return (
    <PlanetsContext.Provider value={ CONTEXT_VALUE }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
