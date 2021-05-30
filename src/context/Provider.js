import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanetsAPI from '../services/api';

import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const fetchPlanetsAPI = async () => {
    setIsFetching(true);
    const planetsAPI = await getPlanetsAPI();
    setPlanets(planetsAPI);
    setIsFetching(false);
  };
  useEffect(() => {
    fetchPlanetsAPI();
  }, []);

  const filterByName = (name) => {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  };

  const addFilterByNumericValues = (filter) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        filter,
      ],
    });
  };

  const removeFilterByNumericValues = (name) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues.filter((filter) => filter.column !== name),
      ],
    });
  };

  const changeOrder = ({ column, sort }) => {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  const contextValue = {
    isFetching,
    planets,
    filters,
    fetchPlanetsAPI,
    filterByName,
    addFilterByNumericValues,
    removeFilterByNumericValues,
    changeOrder,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
