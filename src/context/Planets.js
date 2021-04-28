import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';
import Api from '../services/api';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
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
    const column = event.target[1].value;
    const comparison = event.target[2].value;
    const { value } = event.target[3];

    const filterName = planets
      .filter(({ name }) => name.includes(filters.filterByName.name));

    const menor = filterName.filter((planet) => planet[column] < value);
    const maior = filterName.filter((planet) => planet[column] > value);
    const igual = filterName.filter((planet) => planet[column] === value);

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
