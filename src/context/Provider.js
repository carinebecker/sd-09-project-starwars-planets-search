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
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
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

  const handleChange = ({ name, value }) => {
    setSelectedFilter({
      ...selectedFilter,
      [name]: value,
    });
  };

  const cleanFilter = (filterName) => {
    const { filterByNumericValues } = filter;

    const newFilterByNumericValues = filterByNumericValues
      .filter(({ column }) => column !== filterName);
    const newActiveFilters = activeFilters
      .filter(({ activeFilterName }) => activeFilterName !== filterName);

    setFilter({
      ...filter,
      filterByNumericValues: [newFilterByNumericValues],
    });

    setActiveFilters([newActiveFilters]);
  };

  const addNumericFilter = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [...filter.filterByNumericValues, selectedFilter],
    });

    if (!activeFilters.includes(selectedFilter.column)) {
      setActiveFilters([...activeFilters, selectedFilter.column]);
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
    activeFilters,
    selectedFilter,
    handleNameFilter,
    handleChange,
    addNumericFilter,
    cleanFilter,
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
