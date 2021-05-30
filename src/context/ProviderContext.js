import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/api';

function Provider({ children }) {
  const [dataFromApi, setDataFromApi] = useState({ planets: { results: [] } });
  const [planetsFilter, setPlanetsFilter] = useState({ filteredPlanets: [] });
  const [inputFilter, setInputFilter] = useState({
    filters: {
      filterByName: { search: '' },
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' },
    },
  });
  const { filters: { order } } = inputFilter;
  const { filteredPlanets } = planetsFilter;
  const { planets: { results } } = dataFromApi;
  const [loading, setLoading] = useState(true);

  const sortPlanets = (data = filteredPlanets) => {
    if (!filteredPlanets.length) { data = results; }

    const reorderByNumber = {
      up: 1,
      down: -1,
    };

    const sortedResults = order.sort === 'ASC'
      ? data
        .sort((a, b) => (
          a[order.column] < b[order.column]
            ? reorderByNumber.down : reorderByNumber.up
        ))
      : data
        .sort((a, b) => (
          b[order.column] - a[order.column]
          // a[order.column] < b[order.column]
          //   ? reorderByNumber.up : reorderByNumber.down
        ));

    if (!filteredPlanets.length) {
      setDataFromApi({ planets: { results: sortedResults } });
    } else {
      setPlanetsFilter({ filteredPlanets: sortedResults });
    }
  };

  const getPlanets = async () => {
    const data = await fetchStarWarsPlanets();
    data.results.map((result) => delete result.residents);

    setDataFromApi({ planets: data });
    setLoading(false);
  };

  useEffect(() => {
    sortPlanets();
  }, [results]);

  const contextValue = {
    getPlanets,
    dataFromApi,
    setDataFromApi,
    loading,
    planetsFilter,
    setPlanetsFilter,
    inputFilter,
    setInputFilter,
    sortPlanets,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
