import React, { useState } from 'react';
import { func } from 'prop-types';
import TableContext from './TableContext';
import fechStarWarsAPI from '../service/StarWarsApi';

function TableProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    // isLoading true
    // fazer a requisição para buscar as perguntas
    // isLoading false
    setIsLoading(true);
    const planetsApiResult = await fechStarWarsAPI();
    setPlanets(planetsApiResult);
    setIsLoading(false);
  };

  return (
    <TableContext.Provider value={ { isLoading, planets, getPlanets } }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: func,
}.isRequired;

export default TableProvider;
