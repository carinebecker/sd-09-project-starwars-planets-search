import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanets from '../services/starwarsApi';

function PlanetProvider({ children }) {
  const baseFilter = { filterByName:
      { name: '' },
  };
  const [data, setData] = useState([]);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(baseFilter);

  const context = {
    dataToFilter,
    setDataToFilter,
    loading,
    filters,
    setFilters,
  };

  const getData = async () => {
    const { results } = await getPlanets();
    setData(results);
    setDataToFilter(results);
    setLoading(false);
  };

  useEffect(() => {
    const { filterByName: { name } } = filters;
    let planetsToBeFiltered = data;
    planetsToBeFiltered = planetsToBeFiltered.filter(
      (planet) => planet.name.toUpperCase().includes(name.toUpperCase()),
    );
    setDataToFilter(planetsToBeFiltered);
  },
  [data, filters]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <PlanetContext.Provider value={ context }>
        {children}
      </PlanetContext.Provider>
    </main>

  );
}
PlanetProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.element),
}.isRequired;
export default PlanetProvider;
