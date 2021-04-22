import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWPlanets from '../services/SWFetch';

const SWProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filtered, setFiltered] = useState([]);

  // Valeu Bob Wendell, me salvou! :)
  useEffect(() => {
    getSWPlanets(setFiltered);
    getSWPlanets(setData);
  }, []);

  // Filtrar por texto
  const filter = ({ target }) => {
    setFilters({ filterByName: { [target.name]: target.value } });
    const filtering = data.filter(
      (item) => item.name.includes(target.value),
    );

    setFiltered(filtering);
  };

  const context = {
    data,
    filter,
    filtered,
    filters,
  };

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
