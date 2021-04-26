import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import fetchApiPlanetList from '../services/fetchApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planetFilteredByName, setPlanetFilteredByName] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const handleFetchApi = async () => {
    const { results } = await fetchApiPlanetList();
    setData(results);
    setDataFilter(results);
    setLoading(false);
  };

  useEffect(() => {
    const filteredPlanets = data;
    setDataFilter(filteredPlanets.filter((planet) => (
      planet.name.includes(planetFilteredByName.filters.filterByName.name)
    )));
  }, [data, planetFilteredByName]);

  useEffect(() => {
    handleFetchApi();
  }, []);

  const context = {
    loading,
    setPlanetFilteredByName,
    dataFilter,
  };

  return (
    <TableContext.Provider value={ context }>
      {children}
    </TableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
