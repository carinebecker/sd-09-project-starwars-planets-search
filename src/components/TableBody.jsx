import React, { useContext } from 'react';
import context from '../context/context';

function TableBody() {
  const { data } = useContext(context);

  const setTable = () => (
    data.map((planet) => (
      <tr key={ planet.name }>
        <td>{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ planet.population }</td>
        <td>{ planet.films }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    ))
  );

  return (
    <tbody>
      { setTable() }
    </tbody>
  );
}

export default TableBody;
