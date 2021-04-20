import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import fetchApiPlanetsContext from './fetchApiPlanetsContext';
import fetchApiPlanets from '../../services/fetchApiPlanets';
import useInput from '../../hooks/useInput';

export default function ApiProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useInput({ filterByName: { name: '' } });

  async function getPlanetsApiData() {
    setIsFetching(true);
    const newData = await fetchApiPlanets();
    setData(newData);
    setIsFetching(false);
  }

  useEffect(() => {
    getPlanetsApiData();
  }, []);

  function handleChange({ target }) {
    const { value } = target;
    setFilters({
      filterByName: {
        name: value.toLowerCase(),
      } });
  }

  const requestState = {
    isFetching,
    data,
    handleChange,
    filters,
  };

  return (
    <fetchApiPlanetsContext.Provider value={ requestState }>
      {children}
    </fetchApiPlanetsContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: shape().isRequired,
};
