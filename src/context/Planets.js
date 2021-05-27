import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';
import Api from '../services/api';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [saveColumn, setSaveColumn] = useState('population');
  const [saveComparison, setSaveComparison] = useState('maior que');
  const [saveValue, setSaveValue] = useState('');

  const [filterPlanets, setFilterPlanets] = useState([]);
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
        setFilterPlanets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlanets();
  }, []);

  const filterPlanetsByName = ({ target: { value } }) => {
    const filteredData = planets.filter(({ name }) => name.includes(value));

    setFilter({
      filterByName: { name: value },
    });
    setFilterPlanets(filteredData);
  };

  const filterPlanetsByNumber = (event) => {
    event.preventDefault();

    const menor = filterPlanets
      .filter((planet) => Number(planet[saveColumn]) < Number(saveValue)
      || planet[saveColumn] === 'unknown');
    const maior = filterPlanets
      .filter((planet) => Number(planet[saveColumn]) > Number(saveValue)
      || planet[saveColumn] === 'unknown');
    const igual = filterPlanets
      .filter((planet) => Number(planet[saveColumn]) === Number(saveValue)
      || planet[saveColumn] === 'unknown');

    if (saveComparison === 'menor') {
      setFilterPlanets(menor);
    }
    if (saveComparison === 'maior') {
      setFilterPlanets(maior);
    }
    if (saveComparison === 'igual') {
      setFilterPlanets(igual);
    }
  };

  const contextValue = {
    planets,
    filterPlanetsByName,
    filterPlanetsByNumber,
    filterPlanets,
    filters,
    setSaveColumn,
    setSaveComparison,
    setSaveValue,
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
