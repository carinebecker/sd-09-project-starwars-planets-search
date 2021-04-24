import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import { fetchPlanets } from '../services/SWAPI';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [filters, setFilters] = useState({ filters: { filterByName: { name: '' } } });

  const getData = async () => {
    if (data) return;
    setLoading(true);
    const dataFetched = await fetchPlanets();
    setData(dataFetched);
    setLoading(false);
  };

  return (
    <SWContext.Provider value={ { loading, data, getData, filters, setFilters } }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
