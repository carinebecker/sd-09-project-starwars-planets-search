import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
// import handleOrderFilter from '../store';

function Table() {
  const { filteredData, resultsKeys } = useContext(TableContext);

  function renderHeader() {
    return resultsKeys[0].map((each, i) => (
      <th key={ i }>{each.toUpperCase().replace('_', ' ')}</th>
    ));
  }
  console.log(filteredData);
  function renderBody() {
    return filteredData.map((res) => Object.values(res)).map((planet, i) => {
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
