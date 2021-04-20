import React, { useState } from 'react';
import { func } from 'prop-types';
import TableContext from './TableContext';
import fechStarWarsAPI from '../service/StarWarsApi';

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getPlanets = async () => {
    setIsLoading(true);
    const planetsApiResult = await fechStarWarsAPI();
    setData(planetsApiResult);
    setIsLoading(false);
  };

  return (
    <TableContext.Provider value={ { isLoading, data, getPlanets } }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: func,
}.isRequired;

export default TableProvider;
