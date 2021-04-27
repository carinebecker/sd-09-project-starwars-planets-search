import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';
import Api from '../services/api';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    async function getPlanets() {
      try {
        const data = await Api();
        setPlanets(data);
        setFilterPlanets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlanets();
  }, []);

  const filterPlanetsByName = ({ target: { value } }) => {
    const filteredData = planets.filter(({ name }) => name.includes(value));

    setFilterPlanets(filteredData);
  };

  const contextValue = {
    planets,
    filterPlanetsByName,
    filterPlanets,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.ReactComponentLike,
}.isRequired;
