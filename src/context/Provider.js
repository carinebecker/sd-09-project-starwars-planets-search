import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import requestPlanetList from '../services/planetsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState({ planetsList: [], isFetching: false });

  const fetchPlanets = async () => {
    try {
      setData({ planetsList: data.planetsList, isFetching: true });
      const planetsList = await requestPlanetList();
      setData({ planetsList, isFetching: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
