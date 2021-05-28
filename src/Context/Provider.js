import React, { useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';
import usePlanets from './Effects/usePlanets';
import useFilterByName from './Effects/useFilterByName';
import useFilterByNumber from './Effects/useFilterByNumber';
import useSort from './Effects/useSort';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumber, setFilterByNumber] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  usePlanets(setPlanets, setLoading);
  useFilterByName(setFilteredPlanets, filterByName, planets);
  useFilterByNumber(setFilteredPlanets, filterByNumber, planets);
  useSort(setFilteredPlanets, order, planets);

  const context = {
    planets,
    filteredPlanets,
    loading,
    filterByName,
    setFilterByName,
    filterByNumber,
    setFilterByNumber,
    setOrder,
  };

  return (
    <planetsContext.Provider value={ context }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
