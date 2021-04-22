import React, { useContext } from 'react';
import { TableContext } from '../Context/TableContext';

const TableBody = () => {
  const { planets } = useContext(TableContext);

  return (
    <tbody>
      {planets.map((planet) => (
        <tr key={ planet.id }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.films}</td>
          <td>{planet.gravity}</td>
          <td>{planet.population}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.terrain}</td>
          <td>{planet.url}</td>
        </tr>))}
    </tbody>
  );
};

export default TableBody;
