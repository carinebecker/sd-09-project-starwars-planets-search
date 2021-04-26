import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import requestPlanetList from '../services/planetsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState({ planetsList: [], isFetching: false });
  const [filteredData, setFilteredData] = useState({
    filteredPlanetsList: [],
    isFiltering: false,
  });
  const [numericFilter, setNumericFilter] = useState({});
  const [filter, setFilter] = useState({
    filterByName: '',
    filterByNumericValues: [],
  });

  const fetchPlanets = async () => {
    try {
      setData({ ...data, isFetching: true });
      const planetsList = await requestPlanetList();
      setData({ planetsList, isFetching: false });
    } catch (error) {
      console.log(error);
    }
  };

  const createNumericFilter = ({ name, value }) => {
    setNumericFilter({
      ...numericFilter,
      [name]: value,
    });
  };

  const addNumericFilter = () => {
    const minEntries = 3;
    if (Object.entries(numericFilter).length === minEntries) {
      setFilter({
        ...filter,
        filterByNumericValues: [...filter.filterByNumericValues, numericFilter],
      });
    }
  };

  const handleNameFilter = ({ value }) => {
    if (typeof value === 'string') {
      setFilter({ ...filter, filterByName: value });
    }
  };

  const filterPlanetListByName = () => {
    const { planetsList } = data;
    const { filterByName } = filter;

    const filteredPlanets = planetsList
      .filter(({ name }) => name.toLowerCase()
        .includes(filterByName.toLowerCase()));

    if (filterByName.length !== 0) {
      setFilteredData({
        filteredPlanetsList: filteredPlanets,
        isFiltering: true,
      });
    } else {
      setFilteredData({ ...filteredData, isFiltering: false });
    }
  };

  const filterPlanetListByNumeric = () => {
    const { planetsList } = data;
    const { filterByNumericValues } = filter;
    let filteredPlanets = planetsList;

    filterByNumericValues.forEach((filterObj) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        switch (filterObj.comparison) {
        case 'menor que':
          return parseInt(planet[filterObj.column], 10) < filterObj.value;
        case 'maior que':
          return parseInt(planet[filterObj.column], 10) > filterObj.value;
        default:
          return planet[filterObj.column] === filterObj.value;
        }
      });
    });

    if (filterByNumericValues.length !== 0) {
      setFilteredData({
        filteredPlanetsList: filteredPlanets,
        isFiltering: true,
      });
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    filterPlanetListByName();
  }, [filter]);

  useEffect(() => {
    filterPlanetListByNumeric();
  }, [filter]);

  const contextValue = {
    data,
    filteredData,
    handleNameFilter,
    createNumericFilter,
    addNumericFilter,
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
