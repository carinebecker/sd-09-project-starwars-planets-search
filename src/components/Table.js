import React, { useContext, useEffect } from 'react';

import StarwarsContext from '../context/StarwarsContext';
import '../css/Table.css';
import TableRow from './TableRow';

const Table = () => {
  const {
    planets,
    fetchPlanets,
    isFetching,
    tableHeaders,
    filteredPlanets,
  } = useContext(StarwarsContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const table = (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => <th key={ index }>{ header }</th>)}
        </tr>
      </thead>
      <tbody>
        {(filteredPlanets.length === 0)
          ? planets.map((planet, index) => <TableRow key={ index } planet={ planet } />)
          : filteredPlanets
            .map((planet, index) => <TableRow key={ index } planet={ planet } />)}
      </tbody>
    </table>
  );

  return (
    <div>
      { isFetching ? 'Loading...' : table }
    </div>
  );
};

export default Table;
