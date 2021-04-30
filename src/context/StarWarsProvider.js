import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/StarWarsApi';

const INITIAL_FILTERS = {
  filterByNumericValues: [],
};

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const context = { data };

  useEffect(() => {
    const fetchData = async () => {
      const planetsApi = await getPlanets();
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

  const value = { context, data, addFiltersInputs, filters };

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
