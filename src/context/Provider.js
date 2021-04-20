import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanets() {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json());
      console.log(results);
      setData(results);
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

  const context = { data, headers, loading };
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
