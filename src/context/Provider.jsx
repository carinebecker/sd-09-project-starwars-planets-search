import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [header, setHeader] = useState();
  const [isLoading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState({ name: '' });
  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: '',
    comparison: '',
    value: '0',
  });

  useEffect(() => {
    const getPlanets = async () => {
      const result = await fetchPlanets();
      setPlanets(result);
      setHeader(result);
      setLoading(false);
    };
    getPlanets();
  }, []);

  const context = {
    planets,
    isLoading,
    header,
    filterName,
    setFilterName,
    columns,
    setColumns,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
