import React, { createContext, useState, useEffect } from 'react';

export const TableContext = createContext();

const TableContextProvider = (props) => {
  const { children } = props;

  const [planets, setPlanets] = useState([]);

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchApi = async () => {
    const { results } = await fetch(url)
      .then((response) => response.json());
    console.log(results);
    setPlanets(results);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const data = { planets };

  return (
    <TableContext.Provider value={ data }>
      { children }
    </TableContext.Provider>
  );
};

export default TableContextProvider;

TableContextProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
