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
  const [filter, setFilter] = useState({ filterByName: '' });

  const fetchPlanets = async () => {
    try {
      setData({ ...data, isFetching: true });
      const planetsList = await requestPlanetList();
      setData({ planetsList, isFetching: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = ({ value }) => {
    if (typeof value === 'string') {
      setFilter({ ...filter, filterByName: value });
    }
  };

  const filterPlanetListByName = () => {
    const { planetsList } = data;
    const { filterByName } = filter;

    const filteredPlanets = planetsList.filter(({ name }) => name.includes(filterByName));

    if (filterByName.length !== 0) {
      setFilteredData({
        filteredPlanetsList: filteredPlanets,
        isFiltering: true,
      });
    } else {
      setFilteredData({ ...filteredData, isFiltering: false });
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    filterPlanetListByName();
  }, [filter]);

  const contextValue = {
    data,
    filteredData,
    handleFilter,
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
