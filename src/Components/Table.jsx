import React, { useContext } from 'react';
import { ApiContext } from '../Context/DataApi';
import Filters from './Filters';

function filterData(data, filters) {
  const { name } = filters.filterName;
  return data.filter((planet) => planet.name.includes(name));
}

const Table = () => {
  const { data, filters } = useContext(ApiContext);
  const filtered = filterData(data, filters);
  if (!data.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Table</h1>
      <Filters />
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map((eachTr) => <th key={ eachTr }>{eachTr}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {filtered.map((eachElement) => (
            <tr key={ eachElement.name }>
              {Object.values(eachElement).map((value) => (
                <td key={ value }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
