import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import { fetchPlanets } from '../services/SWAPI';

function Provider({ children }) {
  const [data, setData] = useState(undefined);
  const [filters, setFilters] = useState({
    filters:
      {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [
          {
            column: 'rotation_period',
            comparison: 'maior que',
            value: '',
          },
        ],
      },
  });

  const { filters: {
    filterByName,
    filterByNumericValues,
    filterByName: { name },
    filterByNumericValues: [{ column, comparison, value }],
  },
  } = filters;

  const getData = async () => {
    if (data) return;
    const dataFetched = await fetchPlanets();
    setData(dataFetched);
  };

  return (
    <SWContext.Provider
      value={ {
        data,
        getData,
        filters,
        setFilters,
        filterByName,
        filterByNumericValues,
        name,
        column,
        comparison,
        value } }
    >
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
