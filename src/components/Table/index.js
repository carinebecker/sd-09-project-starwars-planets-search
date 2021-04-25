import React from 'react';

import TableFields from './TableFields';
import TableBody from './TableBody';
import useAPI from '../../hooks/useAPI';
import useFilter from '../../hooks/useFilterName';

function Table() {
  const data = useAPI();
  const { filter } = useFilter();

  const showAll = () => {
    const {
      data: { results: planets },
    } = data;
    return [...planets];
  };

  const getFiltered = () => {
    if (filter.isSearching) {
      const {
        results,
      } = filter;
      return [...results];
    }

    return showAll();
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
