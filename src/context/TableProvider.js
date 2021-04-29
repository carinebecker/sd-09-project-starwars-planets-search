import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(true);

  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([
    {
      column: 'population',
      comparison: 'greater',
      value: '',
    },
  ]);

  const nameFilter = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };

  const numericFilters = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValues((prevState) => ([{
      ...prevState,
      [name]: value,
    }]));
  };

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const apiData = await fetch(endpoint)
        .then((response) => response.json()).catch((error) => console.log(error));
        // Obrigada Rafa Reis pela dica do delete
      apiData.results.forEach((element) => delete element.residents);
      setData(apiData);
      setFetching(false);
    };
    getData();
  }, []);

  const contextValue = {
    data,
    setData,
    filterByName,
    filterByNumericValues,
    nameFilter,
    numericFilters,
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
