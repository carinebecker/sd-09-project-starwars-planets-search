import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const { data, loading, filters } = useContext(StarWarsContext);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let filteredPlanets = data;
    filteredPlanets = filteredPlanets.filter((item) => item.name.toUpperCase()
      .includes(filters.filterByName.name.toUpperCase()));
    setFiltered(filteredPlanets);
  }, [filters, data]);

  const renderTableHead = () => {
    const head = Object.keys(data[0]);
    return (
      <thead>
        <tr>
          {head.map((item) => <th key={ item }>{ item }</th>)}
        </tr>
      </thead>
    );
  };

  const renderRow = (planet) => {
    const row = Object.values(planet);
    return (
      <tr key={ planet.name }>
        {row.map((item) => <td key={ item }>{ item }</td>)}
      </tr>
    );
  };

  const renderTableBody = () => (
    <tbody>
      {filtered.map((planet) => renderRow(planet))}
    </tbody>
  );

  return (
    <table>
      {!loading && renderTableHead() }
      {!loading && renderTableBody() }
    </table>
  );
};

export default Table;
