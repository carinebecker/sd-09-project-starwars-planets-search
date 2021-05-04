import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { filteredData, resultsKeys } = useContext(TableContext);

  function renderHeader() {
    return resultsKeys[0].map((each, i) => (
      <th key={ i }>{each.toUpperCase().replace('_', ' ')}</th>
    ));
  }

  function renderBody() {
    return filteredData.map((planet, i) => {
      const td = planet.map((currValue, index) => (
        <td key={ index }>{currValue}</td>
      ));
      return (<tr key={ i }>{ td }</tr>);
    });
  }

  return (
    <table>
      <thead>
        <tr>
          { renderHeader() }
        </tr>
      </thead>
      <tbody>
        { renderBody() }
      </tbody>
    </table>
  );
}

export default Table;
