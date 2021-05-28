import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([{}]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(
    { filterByName: { name: '' }, filterByNumericValues: [] },
  );

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((resp) => resp.json());
      setData(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setPlanets(data);
  }, [data]);

  useEffect(() => {
    let filteredPlanets = [];
    if (filters.filterByName.name !== '') {
      filteredPlanets = data.filter(
        (planet) => planet.name.toLowerCase().includes(
          filters.filterByName.name.toLowerCase(),
        ),
      );
    } else {
      filteredPlanets = data;
    }
    setPlanets(filteredPlanets);
  }, [filters.filterByName, data]);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length > 0) {
      console.log('bla');
    }
  }, [filters, data]);

  const context = {
    data,
    filters,
    planets,
    setFilters,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, DataProvider as Provider };
