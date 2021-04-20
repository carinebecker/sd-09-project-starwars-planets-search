import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import fetchApiPlanetsContext from './fetchApiPlanetsContext';
import fetchApiPlanets from '../services/fetchApiPlanets';

export default function ApiProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  async function getPlanetsApiData() {
    setIsFetching(true);
    const newData = await fetchApiPlanets();
    setData(newData);
    setIsFetching(false);
  }

  useEffect(() => {
    getPlanetsApiData();
  }, []);

  const requestState = {
    isFetching,
    data,
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
