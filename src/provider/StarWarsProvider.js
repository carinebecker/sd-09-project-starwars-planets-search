import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetAPI from '../service/PlanetAPI';
import StarWarsContext from './StarWarsContext';

const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_FILTER = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [allPlanets, setAllPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [allFilters, setAllFilters] = useState([]);

  const setFilterName = ({ target }) => {
    const { value } = target;

    setFilter({
      ...filter,
      filterByName: {
        name: value,
      },
    });
  };

  const filterOrder = (planetS) => {
    let sortPlanet = [];
    const negativeNumber = -1;
    switch (filter.order.sort) {
    case 'ASC':
      if (filter.order.column === 'name') {
        sortPlanet = planetS.sort((a, b) => (
          (a[filter.order.column] < b[filter.order.column]) ? negativeNumber : 0
        ));
      } else {
        sortPlanet = planetS.sort((a, b) => (
          +(a[filter.order.column]) - +(b[filter.order.column])
        ));
      }
      break;
    case 'DESC':
      if (filter.order.column === 'name') {
        sortPlanet = planetS.sort((a, b) => (
          (a[filter.order.column] > (b[filter.order.column]) ? negativeNumber : 0
          )));
      } else {
        sortPlanet = planetS.sort((a, b) => (
          (b[filter.order.column] - (a[filter.order.column])
          )));
      }
      break;
    default:
      break;
    }
    return setPlanets(sortPlanet);
  };

  const setFilterOrder = (newOrder) => {
    setFilter({
      ...filter,
      order: newOrder,
    });
  };

  const executeFilter = () => {
    let newPlanet = [...allPlanets];
    const { filterByName: { name } } = filter;
    if (name) {
      newPlanet = allPlanets.filter((planet) => planet.name
        .includes(filter.filterByName.name));
      setPlanets(newPlanet);
    }

    if (filter.filterByNumericValues.length > 0) {
      filter.filterByNumericValues.forEach((filterNum) => {
        const { column, comparison, value } = filterNum;
        newPlanet = planets.filter((planet) => {
          if (comparison === 'maior que') {
            return +(planet[column]) > +(value);
          } if (comparison === 'menor que') {
            return +(planet[column]) < +(value);
          }
          return planet[column] === value;
        });
        setPlanets(newPlanet);

        const newColumns = columns.filter((columnFilter) => columnFilter !== column);
        setColumns(newColumns);
        setAllFilters([...allFilters, { column, comparison, value }]);
      });
    }
    filterOrder(newPlanet);
  };

  const buttonFilter = (param) => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        ...filter.filterByNumericValues,
        param,
      ],
    });
  };

  const removeFilter = (filterR) => {
    const filterRemove = filter.filterByNumericValues
      .filter((item) => item !== filterR);
    setFilter({
      ...filter,
      filterByNumericValues: filterRemove,
    });
  };

  const fetchSuccess = (json) => {
    setAllPlanets(json.results);
    filterOrder(json.results);
    setIsLoading(false);
  };

  const fetchPlanets = () => {
    setIsLoading(true);
    getPlanetAPI()
      .then(fetchSuccess);
  };

  useEffect(fetchPlanets, []);

  const context = {
    planets,
    isLoading,
    columns,
    allFilters,
    filter,
    filterByName: filter.filterByName.name,
    filterByNumericValues: filter.filterByNumericValues,
    order: filter.order,
    setFilterOrder,
    filterOrder,
    setFilterName,
    executeFilter,
    fetchPlanets,
    buttonFilter,
    removeFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
