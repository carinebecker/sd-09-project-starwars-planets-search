import React from 'react';

import TableFields from './TableFields';
import TableBody from './TableBody';
import useFilter from '../../hooks/useFilter';

function Table() {
  const planets = useFilter();

  const drawTable = () => {
    const newPlanets = [...planets];
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

  return <table>{planets && drawTable()}</table>;
}

export default Table;
