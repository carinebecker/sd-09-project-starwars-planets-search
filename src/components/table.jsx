import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

const Table = () => {
  const { data, filters: { filterByName: { name = '' } } } = useContext(starWarsContext);
  const tableHead = data[0] || [];

  function tableHeadGenerator() {
    return Object.keys(tableHead)
      .map((element, index) => <th key={ index }>{element}</th>);
  }

  function tableBodyGenerator() {
    return data.filter((planet) => planet.name.toLowerCase().includes(name))
      .map((planet) => (
        <tr key={ planet.name }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ));
  }

  return (
    <table>
      <thead>
        <tr>
          {tableHeadGenerator()}
        </tr>
      </thead>
      <tbody>
        {tableBodyGenerator()}
      </tbody>
    </table>
  );
};

export default Table;
