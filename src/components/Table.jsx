import React, { useContext } from 'react';
import { TableContext } from '../contexts/TableContext';
import useFilterName from '../hooks/useFilterName';

function Table() {
  const { data } = useContext(TableContext);
  const firstPlanet = data[0] || [];

  const [setNameSearch, filterNameReturn] = useFilterName();

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

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameSearch(value);
  };

  function createTextInput() {
    return (
      <input
        data-testid="name-filter"
        onChange={ handleChange }
      />
    );
  }

  const receiveFilters = () => {
    let filter = [];
    if (filterNameReturn.length > 0) {
      filter = filterNameReturn;
      return filter;
    }
    filter = data;
    return filter;
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
    <>
      <div>
        { createTextInput() }
      </div>
      <div>
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
      </div>
    </>
  );
}

export default Table;
