import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [resultsKeys, setResultsKeys] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columnFilter, setColumnFilter] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumeric, setFilterByNumeric] = useState(
    {
      column: columnFilter[0],
      comparison: 'maior que',
      value: '',
    },
  );
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const apiData = await fetch(endpoint)
        .then((response) => response.json()).catch((error) => console.log(error));
        // Obrigada Rafa Reis pela dica do delete
      apiData.results.forEach((element) => delete element.residents);
      setData(apiData);
      setFilteredData(apiData.results.map((res) => Object.values(res)));
      setResultsKeys(apiData.results.map((res) => Object.keys(res)));
      setFetching(false);
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
    filterByNumericValues,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    activeFilters,
    setActiveFilters,
    resultsKeys,
    order,
    setOrder,
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
