import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YodaContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const r2d2Context = {
    setData,
    data,
    isLoading,
    setIsLoading,
  };
  return (
    <YodaContext.Provider value={ r2d2Context }>
      {children}
    </YodaContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};
export default Provider;
