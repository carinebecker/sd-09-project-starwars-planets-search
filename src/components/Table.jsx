import React, { useEffect, useState } from 'react';
import fetchPlanetsDatabase from '../services';

function Table() {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [{ filters }, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  useEffect(() => { // ComponentDidMount
    async function fetchData() {
      const fetchedData = await fetchPlanetsDatabase();
      fetchedData.forEach((planet) => delete planet.residents);
      setData(fetchedData);
      setTableColumns(Object.keys(fetchedData[0]));
    }
    fetchData();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setFilters({ filters: { filterByName: { name: value } } });
  };

  return (
    <section>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            {tableColumns.map((column) => <th key={ column }>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.filter(({ name }) => name.includes(filters.filterByName.name))
            .map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((content) => (
                  <td key={ content }>{content}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
