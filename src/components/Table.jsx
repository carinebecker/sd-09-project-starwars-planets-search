import React, { useEffect, useState } from 'react';
import fetchPlanetsDatabase from '../services';

function Table() {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => { // ComponentDidMount
    async function fetchData() {
      const fetchedData = await fetchPlanetsDatabase();
      fetchedData.forEach((planet) => delete planet.residents);
      setData(fetchedData);
      setTableColumns(Object.keys(fetchedData[0]));
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {tableColumns.map((column) => <th key={ column }>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((content) => (
              <td key={ content }>{content}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
