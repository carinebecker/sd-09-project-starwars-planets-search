import React, { useEffect, useState } from 'react';
import { arrayOf } from 'prop-types';
import fetchApiPlanetsContext from './fetchApiPlanetsContext';
import fetchApiPlanets from '../../services/fetchApiPlanets';
import useFilter from '../../hooks/useFilter';

export default function ApiProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [filters, handleChange, filterByNumbers] = useFilter();
  const [configFilters, setConfigFilters] = useState();
  const [checkFilters, serCheckFilters] = useState([]);

  async function getPlanetsApiData() {
    setIsFetching(true);
    const newData = await fetchApiPlanets();
    setData(newData);
    setIsFetching(false);
  }

  useEffect(() => {
    getPlanetsApiData();
  }, []);

  function handleClickFilterByNumber() {
    const { results } = data;
    if (results) {
      const filteredPlanet = results.filter((planet) => (
        [filterByNumbers].every(({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            return +(planet[column]) > value;
          case 'menor que':
            return +(planet[column]) < value;
          case 'igual a':
            return +(planet[column]) === +value;
          default:
            return true;
          }
        })
      ));
      setConfigFilters(filteredPlanet);
      serCheckFilters(checkFilters.concat(filterByNumbers));
    }
  }

  function handleClickResetFilters() {
    setConfigFilters([]);
  }

  const requestState = {
    isFetching,
    data,
    handleChange,
    filters,
    handleClickFilterByNumber,
    configFilters,
    setConfigFilters,
    checkFilters,
    handleClickResetFilters,
  };

  return (
    <fetchApiPlanetsContext.Provider value={ requestState }>
      {children}
    </fetchApiPlanetsContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: arrayOf(Object).isRequired,
};
