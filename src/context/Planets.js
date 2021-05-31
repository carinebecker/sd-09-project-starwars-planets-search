import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';
import Api from '../services/api';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [saveNumericInputs, setSaveNumericInputs] = useState({
    column: 'population',
    comparison: 'maior',
    value: '',
  });

  const [filters, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  useEffect(() => {
    async function getPlanets() {
      try {
        const data = await Api();
        setPlanets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlanets();
  }, []);

  const filterPlanetsByName = ({ target: { value } }) => {
    setFilter({ filterByName: { name: value } });
  };

  const saveNumericInput = ({ target: { name, value } }) => {
    setSaveNumericInputs({
      ...saveNumericInputs,
      [name]: value,
    });
  };

  const filterPlanetsByNumber = () => {
    console.log(saveNumericInputs);
    setFilter({
      ...filters,
      filterByNumericValues: [
        saveNumericInputs,
      ],
    });
  };

  const contextValue = {
    planets,
    filterPlanetsByName,
    filterPlanetsByNumber,
    filters,
    saveNumericInput,
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
