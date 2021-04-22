import React, { useContext } from 'react';
import { TableContext } from '../contexts/TableContext';

function Table() {
  const { data } = useContext(TableContext);
  const firstPlanet = data[0] || [];

  const createTableHeader = () => {
    const names = Object.keys(firstPlanet);
    return names.map((columName, index) => (
      <th key={ index }>{ columName }</th>
    ));
  };
  // const keys = Object.keys(teste);
  // console.log('keys', keys);
  // ))
  // const values = Object.values(teste)
  // console.log('values', values)

  const receiveFilters = () => {
    const filtro = data;
    return filtro;
  };

  const createTableLines = () => {
    const content = receiveFilters();
    return content.map((planet, indexLine) => (
      <tr key={ indexLine }>
        {
          Object.values(planet).map((values, indexCell) => (
            <td key={ indexCell }>{ values }</td>
          ))
        }
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          { createTableHeader() }
        </tr>
      </thead>
      <tbody>
        { createTableLines() }
      </tbody>
    </table>
  );
}

export default Table;
