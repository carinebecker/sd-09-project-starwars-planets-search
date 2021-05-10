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
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const fetchData = async () => {
    const planetsApi = await getPlanets();
    setData(planetsApi);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addFiltersInputs = (filterObj) => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, filterObj],
    });
  };

  // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/

  const orderPlanets = (planets) => {
    const { order } = filters;
    const menosUm = -1;
    if (order.column === 'Name') {
      return planets.sort((a, b) => {
        if (a.name < b.name) return order.sort === 'ASC' ? menosUm : 1;
        if (a.name > b.name) return order.sort === 'ASC' ? 1 : menosUm;
        return 0;
      });
    }

    if (order.sort === 'ASC') {
      return planets.sort((a, b) => a[order.column] - b[order.column]);
    }
    if (order.sort === 'DESC') {
      return planets.sort((a, b) => b[order.column] - a[order.column]);
    }
  };

  const removeFilter = (filter) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((fil) => fil !== filter),
    });
  };

  const handleClick = (orderColumn) => {
    setFilters({ ...filters, order: orderColumn });
  };

  const value = { data, addFiltersInputs, handleClick, filters, removeFilter, orderPlanets };

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
