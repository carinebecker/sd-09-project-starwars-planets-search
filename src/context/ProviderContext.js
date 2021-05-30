import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  const getPlanets = async () => {
    const data = await fetchStarWarsPlanets();
    data.results.map((result) => delete result.residents);

    setDataFromApi({ planets: data });
    setLoading(false);
  };

  const contextValue = {
    getPlanets,
    dataFromApi,
    setDataFromApi,
    loading,
    planetsFilter,
    setPlanetsFilter,
    inputFilter,
    setInputFilter,
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
