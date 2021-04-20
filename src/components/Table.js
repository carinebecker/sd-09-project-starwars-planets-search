import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';
// import { Consumer } from '../context/Provider';

function Table() {
  const { data, funcao } = useContext(MyContext);
  useEffect(() => fetchAPI().then(({ results }) => funcao(results)), [funcao]);
  return (
    <table>
      <thead>
        <tr>
          <td>Planet</td>
          <td>Rotation Period</td>
          <td>Orbital Period</td>
          <td>Diameter</td>
          <td>Climate</td>
          <td>Gravity</td>
          <td>Terrain</td>
          <td>Surface Water</td>
          <td>Population</td>
          <td>Residents</td>
          <td>Films</td>
          <td>Created</td>
          <td>Edited</td>
        </tr>
      </thead>
      <tbody key="planets">
        {data.map((planet) => (
          <tr key={ planet }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.residents }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
