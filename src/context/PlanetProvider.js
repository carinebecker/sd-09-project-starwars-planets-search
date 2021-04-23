import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState({});

  const addData = (newData) => {
    setData(newData);
  };

  return (
    <PlanetContext.Provider value={ { data, addData } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = ({
  children: PropTypes.element,
}).isRequired;

export default PlanetProvider;
