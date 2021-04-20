import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {data.map((line, index) => {
          const { climate, created, diameter, edited, films, gravity,
            name, orbital_period, population, rotation_period,
            surface_water, terrain, url } = line;
          return (
            <tr key={ index }>
              <td>{name }</td>
              <td>{rotation_period }</td>
              <td>{orbital_period }</td>
              <td>{diameter }</td>
              <td>{climate }</td>
              <td>{gravity }</td>
              <td>{terrain }</td>
              <td>{surface_water }</td>
              <td>{population }</td>
              <td>{films }</td>
              <td>{created }</td>
              <td>{url }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
