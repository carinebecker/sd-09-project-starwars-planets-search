import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApiStarwars from '../components/ApiFetch';

const TableContext = createContext();

const TableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filterChoiceReturn, setFilterChoiceReturn] = useState([]);

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

  const context = {
    data,
    name,
    setName,
    filterChoiceReturn,
    setFilterChoiceReturn,
  };

  return (
    // <TableContext.Provider value={ { data } }>
    <TableContext.Provider value={ context }>
      { children }
    </TableContext.Provider>
  );
};

TableContextProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export { TableContext, TableContextProvider };
