import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import fetchApiPlanetList from '../services/fetchApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planetFilteredByName, setPlanetFilteredByName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [fieldFiltering, setFieldFiltering] = useState(
    {
      column: 'diameter',
      comparison: 'maior que',
      value: '100000',
    },
  );

  const handleFetchApi = async () => {
    const { results } = await fetchApiPlanetList();
    setData(results);
    setDataFilter(results);
    setLoading(false);
  };

  useEffect(() => {
    const filteredPlanets = data;
    setDataFilter(filteredPlanets.filter((planet) => (
      planet.name.includes(planetFilteredByName.filterByName.name)
    )));
  }, [data, planetFilteredByName]);

  useEffect(() => {
    handleFetchApi();
  }, []);

  const context = {
    data,
    loading,
    planetFilteredByName,
    setPlanetFilteredByName,
    dataFilter,
    setDataFilter,
    fieldFiltering,
    setFieldFiltering,
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
