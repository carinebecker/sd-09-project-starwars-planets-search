import React from 'react';

import TableFields from './TableFields';
import TableBody from './TableBody';
import useAPI from '../../hooks/useAPI';
import useFilter from '../../hooks/useFilter';

function Table() {
  const data = useAPI();
  const { filter } = useFilter();

  const getFiltered = () => {
    if (filter) {
      const {
        filterByName: { name: nameFilter, results },
      } = filter;
      console.log(nameFilter);
      console.log(results);
      return [...results];
    }
    const {
      data: { results: planets },
    } = data;
    return [...planets];
  };

  const drawTable = () => {
    const newPlanets = getFiltered();
    newPlanets.map((planet) => {
      delete planet.residents;
      return planet;
    });

    return (
      <>
        <TableFields planets={ newPlanets } />
        <TableBody planets={ newPlanets } />
      </>
    );
  };

  return <table>{data && drawTable()}</table>;
}

export default Table;
