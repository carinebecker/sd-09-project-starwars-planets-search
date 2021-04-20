import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
      setData(results);
      setPlanets(results);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setHeaders(keys);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const filteredPlanets = data.filter(
      (planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()),
    );
    setPlanets(filteredPlanets);
  }, [filters, data]);

  const context = { data, headers, loading, filters, setFilters, planets };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export { Context, DataProvider as Provider };
