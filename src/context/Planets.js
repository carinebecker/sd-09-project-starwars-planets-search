import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';
import Api from '../services/api';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [saveNumericInputs, setSaveNumericInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

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

  const saveNumericInput = ({ target: { name, value } }) => {
    setSaveNumericInputs({
      ...saveNumericInputs,
      [name]: value,
    });
  };

  const filterPlanetsByNumber = (event) => {
    event.preventDefault();

    const filterName = planets
      .filter(({ name }) => name.includes(filters.filterByName.name));

    const { column, comparison, value } = saveNumericInputs;

    const menor = filterName
      .filter((planet) => Number(planet[column]) < +Number(value)
      || planet[column] === 'unknown');
    const maior = filterName
      .filter((planet) => Number(planet[column]) > +Number(value)
      || planet[column] === 'unknown');
    const igual = filterName
      .filter((planet) => Number(planet[column]) === +Number(value)
      || planet[column] === 'unknown');

    if (comparison === 'menor') {
      setFilterPlanets(menor);
    }
    if (comparison === 'maior') {
      setFilterPlanets(maior);
    }
    if (comparison === 'igual') {
      setFilterPlanets(igual);
    }
  };

  const contextValue = {
    planets,
    filterPlanetsByName,
    filterPlanetsByNumber,
    filterPlanets,
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
