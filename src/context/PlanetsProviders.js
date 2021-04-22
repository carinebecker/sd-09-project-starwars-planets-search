import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [text, editText] = useState('');

  useEffect(() => {
    getPlanets().then((results) => {
      const filterResults = results.filter((result) => delete result.residents);
      setData(filterResults);
    });
  }, []);

  const context = {
    data,
    filters,
    setFilters,
    text,
    editText,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
