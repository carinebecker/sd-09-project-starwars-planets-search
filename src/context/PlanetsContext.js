import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);

  const fetchPlanets = async () => {
    const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json());
    setPlanets(results);
  };

  const filterPlanet = (filter, { target }) => {
    const { value } = target;
    switch (filter) {
    case 'name':
      setNameFilter(value);
      break;
    case 'column':
      setColumnFilter(value);
      break;
    case 'comparison':
      setComparisonFilter(value);
      break;
    case 'value':
      setValueFilter(value);
      break;
    default:
      break;
    }
  };

  const createNumericFilter = () => {
    setNumericFilter([
      ...numericFilter,
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ]);
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter(0);
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
      filterByNumericValues: [...numericFilter],
    },
    columnFilter,
    comparisonFilter,
    valueFilter,
    filterPlanet,
    createNumericFilter,
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
