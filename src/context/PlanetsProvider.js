import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/planetsAPI';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByValue: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  });
  const [initialFilters, setinitialFilters] = useState({});

  const { filterByValue } = filters;

  const getPlanets = async () => {
    const data = await fetchPlanets();
    setPlanets(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const filterChangeHandler = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
      ...filterByValue,
    });
  };

  const handlefilterByValue = (column, value) => {
    setFilters({
      ...filters,
      filterByValue: [
        {
          ...filterByValue[0],
          [column]: value,
        },
      ],
    });
  };

  const handleInputfilterByValue = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByValue: [
        {
          ...filterByValue[0],
          value,
        },
      ],
    });
  };

  const clickHandler = () => {
    setinitialFilters({
      ...initialFilters,
      ...filters.filterByValue[0],
    });
  };

  const selectedFilters = () => {
    const { column, comparison, value } = initialFilters;
    let filteredPlanets = planets;
    if (comparison === 'maior que') {
      filteredPlanets = filteredPlanets.filter(
        (planet) => parseFloat(planet[column]) > parseFloat(value),
      );
    } else if (comparison === 'menor que') {
      filteredPlanets = filteredPlanets.filter(
        (planet) => parseFloat(planet[column]) < parseFloat(value),
      );
    } else if (comparison === 'igual a') {
      filteredPlanets = filteredPlanets.filter(
        (planet) => parseFloat(planet[column]) === parseFloat(value),
      );
    }
    return filteredPlanets;
  };

  const context = {
    planets,
    isLoading: loading,
    filters,
    filterChangeHandler,
    handlefilterByValue,
    handleInputfilterByValue,
    clickHandler,
    selectedFilters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
