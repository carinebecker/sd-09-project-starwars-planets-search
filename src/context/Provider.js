import React, { Component, useState, useEffect } from 'react';

import StarwarsContext from './StarwarsContext';
import { getPlanets } from '../services/planetListAPI';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState(['xablau']);
  const [isFetching, setIsFetching] = useState(false);

  /* const fetchPlanets = () => {
    if (isFetching) return;

    setIsFetching(true);
    const searchResults = getPlanets();
  }; */

  useEffect(async () => {
    try {
      const response = await getPlanets();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [])


  /* setPlanets([1, 2, 3]);
  setIsFetching(true); */

  /* const planets = 'xablau';
  const isFetching = true; */

  const context = {
    planets,
    isFetching,
  };

  // console.log(context);

  return (
    <StarwarsContext.Provider value={context}>
      { children }
    </StarwarsContext.Provider>
  );
}

export default Provider;
