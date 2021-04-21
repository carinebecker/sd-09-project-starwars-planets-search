import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWPlanets from '../services/SWFetch';

const SWProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getSWPlanets().then((response) => setPlanets(response));
  }, []);

  const context = { planets };

  return (
    <SWContext.Provider value={ context }>
      { children }
    </SWContext.Provider>
  );
};

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
