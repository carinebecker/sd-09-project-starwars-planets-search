import React, { useContext } from 'react';
import TableBody from '../TableBody';
import TableHeader from '../TableHeader';
import planetsContext from '../../context/PlanetsContext';

export default function Table() {
  const { loading } = useContext(planetsContext);

  return (

    loading
      ? <p>LOADING...</p>
      : (
        <table>
          <TableHeader />
          <TableBody />
        </table>
      )

  );
}
