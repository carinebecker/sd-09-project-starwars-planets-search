import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/StarWarsApi';

const INITIAL_FILTERS = {
  filterByNumericValues: [],
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const context = { data };

  useEffect(() => {
    const fetchData = async () => {
      const planetsApi = await getPlanets();
      planetsApi.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setData(planetsApi);
    };
    fetchData();
  }, []);

  const addFiltersInputs = (obj) => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, obj],
    });
  };

  const orderPlanets = () => {
    const { order } = filters;
    if (order.sort === 'ASC') {
      setData(data.sort((a, b) => a[order.column] - b[order.column]));
    }
    if (order.sort === 'DESC') {
      setData(data.sort((a, b) => b[order.column] - a[order.column]));
    }
  };

  const handleClick = (orderColumn) => {
    setFilters({ ...filters, order: orderColumn });
    orderPlanets();
  };
  const value = { context, data, addFiltersInputs, handleClick, filters };

  return (
    <main>
      <StarWarsContext.Provider value={ value }>
        {children}
      </StarWarsContext.Provider>
    </main>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarWarsProvider;
