import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const { data, loading } = useContext(StarWarsContext);

  const renderTableHead = () => {
    const head = Object.keys(data[0]);
    return (
      <thead>
        <tr>
          {head.map((item) => <th key={ item }>{ item }</th>)}
        </tr>
      </thead>
    );
  };

  const renderRow = (planet) => {
    const row = Object.values(planet);
    return (
      <tr>
        {row.map((item) => <td key={ item }>{ item }</td>)}
      </tr>
    );
  };

  const renderTableBody = () => (
    <tbody>
      {data.map((planet) => renderRow(planet))}
    </tbody>
  );

  return (
    <table>
      {!loading && renderTableHead() }
      {!loading && renderTableBody() }
    </table>
  );
};

export default Table;
