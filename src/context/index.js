import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';
import getPlanets from '../services/starWarsDatabaseApi';

export const StarWarsContext = createContext();

const getPlanetsFromApi = async (setAllPlanets, setLoading) => {
  const planets = await getPlanets();
  setAllPlanets(planets.results);
  setLoading(false);
};

export const StarWarsProvider = ({ children }) => {
  const [allPlanets, setAllPlanets] = useState([]);
  const [planetsWithFilter, setPlanetsWithFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(null);

  const filters = {
    filterByName: {
      name: input,
    },
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  useEffect(() => {
    getPlanetsFromApi(setAllPlanets, setLoading);
  }, [allPlanets]);

  useEffect(() => {
    if (input === '') {
      setPlanetsWithFilter([]);
    } else {
      const arrayFilters = allPlanets.filter((e) => e.name.toLowerCase().includes(input));
      setPlanetsWithFilter(arrayFilters);
    }
  }, [input]);

  const contextValue = { allPlanets, loading, filters, handleChange, planetsWithFilter };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: node.isRequired,
};
