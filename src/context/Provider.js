import React, { useState } from 'react';

import StarwarsContext from './StarwarsContext';
import { getPlanets } from '../services/planetListAPI';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);

  const removeResidentsKey = (planets) => {
    planets.forEach((planet) => {
      delete planet.residents;
    });
  };

  const fetchPlanets = async () => {
    setIsFetching(true);
    try {
      const response = await getPlanets();
      removeResidentsKey(response);
      filterTableHeads(response);
      setPlanets(response);
      setIsFetching(false);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const filterTableHeads = (planets) => {
    const headers =  Object.keys(planets[0]);
    console.log('headers');
    console.log(headers);
    setTableHeaders(headers);
  }

  const context = {
    planets,
    isFetching,
    tableHeaders,
    fetchPlanets,
  };

  // console.log(context);

  return (
    <StarwarsContext.Provider value={context}>
      { children }
    </StarwarsContext.Provider>
  );
}

export default Provider;
