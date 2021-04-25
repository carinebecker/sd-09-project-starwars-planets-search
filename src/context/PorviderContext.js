import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../services/Api';
import Context from './Context';

export default function ProviderContext({ children }) {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    async function res() {
      const planets = await Api();
      setResponse(planets);
    }
    res();
  }, []);

  const currentState = {
    response,
    filters: {
      filterByName: {
        name,
      },
    },
    setName,
    setResponse,
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
