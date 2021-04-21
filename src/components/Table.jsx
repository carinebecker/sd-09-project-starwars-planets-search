import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const {
    data,
    loading,
    filters: {
      filterByName: { name },
      // filterByNumericValues: [{ column, comparison, value }],
      filterByNumericValues,
    },
  } = useContext(StarWarsContext);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let filteredPlanets = data;
    filteredPlanets = filteredPlanets.filter((item) => item.name.toUpperCase()
      .includes(name.toUpperCase()));
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter, index) => {
        const { column, comparison, value } = filterByNumericValues[index];
        if (comparison === 'maior que') {
          console.log('aqui');
          filteredPlanets = filteredPlanets
            .filter((planet) => Number(planet[column]) > Number(value));
        } else if (comparison === 'menor que') {
          console.log('aqui');
          filteredPlanets = filteredPlanets
            .filter((planet) => Number(planet[column]) < Number(value));
        }
        if (comparison === 'igual a') {
          console.log('aqui');
          filteredPlanets = filteredPlanets
            .filter((planet) => Number(planet[column]) === Number(value));
        }
      });
    }
    setFiltered(filteredPlanets);
  }, [data, name, filterByNumericValues]);

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
