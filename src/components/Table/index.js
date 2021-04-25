import React from 'react';

import TableFields from './TableFields';
import TableBody from './TableBody';
import useAPI from '../../hooks/useAPI';

function Table() {
  const data = useAPI();

  const drawTable = ({ data: { results: planets } }) => {
    const newPlanets = [...planets];

    newPlanets.map((planet) => {
      delete planet.residents;
      return planet;
    });

    return (
      <>
        <TableFields planets={ planets } />
        <TableBody planets={ planets } />
      </>
    );
  };

  return <table>{data && drawTable(data)}</table>;
}

export default Table;
