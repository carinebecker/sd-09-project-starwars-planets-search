import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Loading from '../components/Loading';
import PlanetsContext from './PlanetsContext';

export default function Planets({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });
  const context = {
    data,
    filteredData,
    setFilteredData,
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
      const {
        filterByNumericValues: [{ column, comparison, value }],
      } = filters;
      const filteredPlanetsByName = data.filter((planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name));
      setFilteredData(filteredPlanetsByName);
      switch (comparison) {
      case 'menor que':
        setFilteredData(filteredPlanetsByName
          .filter((planet) => +(planet[column]) < +value));
        break;
      case 'maior que':
        setFilteredData(filteredPlanetsByName
          .filter((planet) => +(planet[column]) > +value));
        break;
      case 'igual a':
        setFilteredData(filteredPlanetsByName
          .filter((planet) => +(planet[column]) === +value));
        break;
      default:
        setFilteredData(filteredPlanetsByName);
        break;
      }
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
