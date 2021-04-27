import React, { useContext } from 'react';
import context from '../context/contextApi';

function createTitle(data) {
  if (data.length === 0) { return; }
  return (
    <tr>
      {Object.keys(data[0])
        .map((title) => <th key={ title }>{title}</th>)}
    </tr>
  );
}

function createRows(data) {
  if (data.length === 0) { return; }
  return (
    data.map((planet) => (
      <tr key={ planet }>
        {Object.values(planet)
          .map((value) => <td key={ value }>{value}</td>)}
      </tr>
    ))
  );
}

function Table() {
  const { data } = useContext(context);
  data.forEach((planet) => delete planet.residents);

  return (
    <table>
      {createTitle(data)}
      {createRows(data)}
    </table>
  );
}

export default Table;
