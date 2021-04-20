import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json());
    setPlanets(results);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const CONTEXT_VALUE = {
    data: planets,
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
