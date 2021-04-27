import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsAPI from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [tableHeaders, setTableHeaders] = useState();
  const [isLoading, setLoading] = useState(true);
  const initialColumnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [columnOptions, setColumnOptions] = useState(initialColumnOptions);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByValues, setFilterByValues] = useState([]);
  const [activeFilters, setActiveFilters] = useState([...filterByValues]);

  useEffect(() => {
    async function getPlanets() {
      const results = await fetchPlanetsAPI();
      setPlanets(results);
      setTableHeaders(Object.keys(results[0]));
      setLoading(false);
    }
    getPlanets();
  }, []);

  const context = {
    planets,
    tableHeaders,
    isLoading,
    filterByName,
    setFilterByName,
    filterByValues,
    setFilterByValues,
    initialColumnOptions,
    columnOptions,
    setColumnOptions,
    activeFilters,
    setActiveFilters,
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
