import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getSWPlanets from '../services/SWFetch';

const SWProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filtered, setFiltered] = useState([]);

  // Valeu Bob Wendell, me salvou! :)
  useEffect(() => {
    getSWPlanets(setFiltered);
    getSWPlanets(setData);
  }, []);

  const filterName = ({ target }) => {
    setFilterByName({ filterByName: { [target.name]: target.value } });
    const filteringName = data.filter(
      (item) => item.name.includes(target.value),
    );

    setFiltered(filteringName);
  };

  const filterNumber = ({ comparison, column, value }) => {
    const filteringNumber = data.filter((item) => {
      if (comparison === 'maior que') return item[column] > value;
      if (comparison === 'menor que') return item[column] <= value;
      return item[column] === value;
    });

    setFiltered(filteringNumber);
  };

  const context = {
    data,
    filterName,
    filterNumber,
    filtered,
    filterByName,
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
