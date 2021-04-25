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

  const filterNumber = ({ column, comparison, value }) => {
    const filter = data.filter((item) => {
      const columnName = Number(item[column]);
      if (comparison === 'menor que') return columnName < Number(value);
      if (comparison === 'maior que') return item[column] > Number(value);
      if (comparison === 'igual a') return item[column] === value;
      return null;
    });

    setFiltered(filter);
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
