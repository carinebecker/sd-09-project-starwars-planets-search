import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../services/Api';
import Context from './Context';

export default function ProviderContext({ children }) {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function res() {
      const planets = await Api();
      setResponse(planets);
    }
    res();
  }, []);

  const currentState = {
    response,
  };
  return (
    <Context.Provider value={ currentState }>
      {children}
    </Context.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
