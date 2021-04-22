import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../services/fetchApi';

function StarWarsProvider({ children }) {
  const [data, setData] = useState({});

  const handleFetchApi = async () => {
    const result = await fetchApi();
    setData(result);
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
