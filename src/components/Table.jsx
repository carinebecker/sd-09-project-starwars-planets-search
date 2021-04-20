import React, { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';

function renderListItem(planet) {
  delete planet.residents;
  return (
    <tr>
      {Object.values(planet).map((values, index) => (
        <td key={ index }>{ values }</td>
      ))}
    </tr>
  );
}

function Table() {
  const { data, getPlanets } = useContext(TableContext);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  if (data.results) {
    const tableLabel = Object.keys(data.results[0]);
    const filteredTabelLabel = tableLabel.filter((label) => (
      label !== 'residents'
    ));
    console.log('ola');
    return (
      <table>
        <tr>
          {filteredTabelLabel.map((label) => (
            <th key={ label }>{label}</th>
          ))}
        </tr>
        {data.results.map((planet) => (
          renderListItem(planet)
        ))}
      </table>
    );
  }
  return <span>loading...</span>;
}

export default Table;
