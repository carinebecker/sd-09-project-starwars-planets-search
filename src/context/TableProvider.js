import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(true);
  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const results = await fetch(endpoint)
        .then((response) => response.json()).catch((error) => console.log(error));
      setData(results);
      setFetching(false);
    };
    getData();
  }, []);

  return (
    <TableContext.Provider value={ { data, setData } }>
      {
        !isFetching
          ? [children]
          : <p>Loading</p>
      }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node, // verificar certinho depois
}.isRequired;

export default TableProvider;
