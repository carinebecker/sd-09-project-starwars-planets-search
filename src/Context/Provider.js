import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumber, setFilterByNumber] = useState([]);

  const getPlanets = async () => {
    const API = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const planetList = await fetch(API)
      .then((response) => response.json())
      .then((json) => json.results);
    setPlanets(planetList);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const context = {
    planets,
    setPlanets,
    loading,
    setLoading,
    filterByName,
    setFilterByName,
    filterByNumber,
    setFilterByNumber,
  };

  return (
    <planetsContext.Provider value={ context }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
