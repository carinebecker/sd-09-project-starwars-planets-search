import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApiStarwars from '../components/ApiFetch';

const TableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  async function getPlanets() {
    const planets = await fetchApiStarwars();
    planets.forEach((planet) => {
      delete planet.residents;
    });
    setData(planets);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <TableContext.Provider value={ { data } }>
      { children }
    </TableContext.Provider>
  );
};

TableContextProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export { TableContext, TableContextProvider };
