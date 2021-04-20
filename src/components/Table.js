import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>Climate</th>
          <th>Created</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Name</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Terrain</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data.map((line, index) => (
          <tr key={ index }>
            <td>{ line.climate }</td>
            <td>{ line.created }</td>
            <td>{ line.diameter }</td>
            <td>{ line.edited }</td>
            <td>{ line.films }</td>
            <td>{ line.gravity }</td>
            <td>{ line.name }</td>
            <td>{ line.orbital_period }</td>
            <td>{ line.population }</td>
            <td>{ line.rotation_period }</td>
            <td>{ line.surface_water }</td>
            <td>{ line.terrain }</td>
            <td>{ line.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
