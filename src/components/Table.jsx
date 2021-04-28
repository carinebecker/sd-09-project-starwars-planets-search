import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { data, filters } = useContext(TableContext);
  const { results } = data;
  const resultsKeys = results.map((res) => Object.keys(res));

  const nameToFilter = filters.filterByName.name.toLowerCase();
  const resultsValues = results.filter((res) => res.name.toLowerCase().includes(nameToFilter)).map((res) => Object.values(res));
  console.log(resultsValues);

  function renderHeader() {
    return resultsKeys[0].map((each, i) => (
      <th key={ i }>{each.toUpperCase().replace('_', ' ')}</th>
    ));
  }

  console.log(nameToFilter);

  function renderBody() {
    return resultsValues.map((value, i) => (
      <tr key={ i }>
        {
          value.map((currValue, index) => (
            <td key={ index }>{currValue}</td>
          ))
        }
      </tr>
    ));
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
