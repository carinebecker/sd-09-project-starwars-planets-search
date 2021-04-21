import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();
const MINUS_ONE = -1;

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);
  const [columnOptions, setColumnOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [columnFilter, setColumnFilter] = useState(columnOptions[0]);
  const [columnOrder, setColumnOrder] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [sortedPlanets, setSortedPlanets] = useState([]);

  const fetchPlanets = async () => {
    const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json());
    setPlanets(results.sort((a, b) => (a.name > b.name ? 1 : MINUS_ONE)));
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

  const sortPlanets = (column) => {
    if (sortOrder === 'ASC') {
      switch (column) {
      case 'orbital_period':
        console.log('ordem alfabetica');
        setSortedPlanets(planets.sort((a, b) => (a.orbital_period - b.orbital_period)));
        break;
      default:
        return undefined;
      }
    } else if (sortOrder === 'DESC') {
      switch (column) {
      case 'orbital_period':
        console.log('ordem não alfabetica');
        setSortedPlanets(planets.sort((a, b) => (b.orbital_period - a.orbital_period)));
        break;
      default:
        return undefined;
      }
    }
  };

  const handleOrderValue = ({ target }) => {
    const { value } = target;
    setColumnOrder(value);
  };

  const handleSortOrder = ({ target }) => {
    const { value } = target;
    setSortOrder(value);
  };

  const changeColumnOptions = () => {
    const newOptions = columnOptions.filter((option) => option !== columnFilter);
    setColumnOptions(newOptions);
    setColumnFilter(newOptions[0]);
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
    setComparisonFilter('maior que');
    setValueFilter(0);
    changeColumnOptions();
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const CONTEXT_VALUE = {
    data: sortedPlanets.length > 0 ? sortedPlanets : planets,
    filters: {
      filterByName: {
        name: nameFilter,
      },
      filterByNumericValues: [...numericFilter],
      order: {
        column: columnOrder,
        sort: sortOrder,
      },
    },
    columnFilter,
    comparisonFilter,
    valueFilter,
    columnOptions,
    columnOrder,
    sortOrder,
    filterPlanet,
    createNumericFilter,
    handleOrderValue,
    handleSortOrder,
    sortPlanets,
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
