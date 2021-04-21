import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import fetchApiPlanetList from '../services/fetchApi';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleFetchApi = async () => {
    const { results } = await fetchApiPlanetList();
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const context = {
    data,
    loading,
  };

  return (
    <TableContext.Provider value={ context }>
      {children}
    </TableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
