import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import starsWContext from './starsWContext';

export default function Provider({ children }) {
  const INITIAL_FILTER = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };
  const [data, setData] = useState({});
  const [filters, setFilter] = useState(INITIAL_FILTER);

  useEffect(() => {
    const fetchPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';
      try {
        const response = await fetch(url);
        const planets = await response.json();
        setData(planets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, []);

  const context = {
    data,
    filters,
    setFilter,
  };

  return (
    <starsWContext.Provider value={ context }>
      {children}
    </starsWContext.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};
