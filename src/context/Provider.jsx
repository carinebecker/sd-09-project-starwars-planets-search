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
  const [sortBy, setSortBy] = useState({ sortByColumn: 'name', sortType: 'ASC' });

  useEffect(() => {
    async function getPlanets() {
      const results = await fetchPlanetsAPI();
      setPlanets(results);
      setTableHeaders(Object.keys(results[0]));
      setLoading(false);
    }
    getPlanets();
  }, []);

  const setSortBySelection = (results, sortSelector) => {
    const noMagicNumber = -1;
    let sortedResults = results;
    if (sortSelector === 'name') {
      sortedResults = results.sort((a, b) => {
        if (a[sortSelector] > b[sortSelector]) {
          return 1;
        }
        return noMagicNumber;
      });
    } else {
      sortedResults = results
        .sort((a, b) => +(a[sortSelector]) - +(b[sortSelector]));
    }
    return sortedResults;
  };

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
    sortBy,
    setSortBy,
    setSortBySelection,
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
