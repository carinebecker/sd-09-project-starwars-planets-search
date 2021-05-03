import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumeric, setFilterByNumeric] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '',
    },
  );

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const apiData = await fetch(endpoint)
        .then((response) => response.json()).catch((error) => console.log(error));
        // Obrigada Rafa Reis pela dica do delete
      apiData.results.forEach((element) => delete element.residents);
      setData(apiData);
      setFetching(false);
      const apiDataValues = apiData.results.map((res) => Object.values(res));
      setFilteredData(apiDataValues);
    };
    getData();
  }, []);

  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterByNumeric,
    setFilterByNumeric,
    filteredData,
    setFilteredData,
  };

  return (
    <TableContext.Provider value={ contextValue }>
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
