import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Loading from '../components/Loading';
import PlanetsContext from './PlanetsContext';

export default function Planets({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = {
    data,
    setData,
    loading,
  };
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();
      const planets = await result.results;
      setData(planets);
      setLoading(false);
    };
    fetchAPI();
  }, []);
  return loading ? <Loading /> : (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Planets.propTypes = {
  children: node,
}.isRequired;
