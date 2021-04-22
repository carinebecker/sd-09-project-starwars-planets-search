import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Loading from '../components/Loading';
import PlanetsContext from './PlanetsContext';

export default function Planets({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState({
    filteredByName: {
      name: '',
    },
  });
  const context = {
    data,
    filteredData,
    setData,
    loading,
    filters,
    setFilter,
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();
      const { results } = result;
      results.forEach((planet) => delete planet.residents);
      setData(results);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const filterName = () => {
      const filteredPlanetsByName = data.filter((planet) => planet.name.toLowerCase()
        .includes(filters.filteredByName.name));
      setFilteredData(filteredPlanetsByName);
    };
    filterName();
  }, [filters, data]);

  return loading ? <Loading /> : (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Planets.propTypes = {
  children: node,
}.isRequired;
