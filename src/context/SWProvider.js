import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/api';
import SWContext from './SWContext';

function SWProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
    ],
  });

  async function fetchApi() {
    const dataAPI = await getPlanets();
    await setData(dataAPI);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <SWContext.Provider value={ { data, filters, fetchApi, setFilters } }>
      {children}
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default SWProvider;
