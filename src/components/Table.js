import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { Consumer } from '../context/Provider';

function Table() {
  const { data } = useContext(MyContext);
  const planets = Object.entries(data);
  return (
    <Consumer>
      <table>
        <tfoot>
          <tc>Planet</tc>
          <tc>Rotation Period</tc>
          <tc>Orbital Period</tc>
          <tc>Diameter</tc>
          <tc>Climate</tc>
          <tc>Gravity</tc>
          <tc>Terrain</tc>
          <tc>Surface Water</tc>
          <tc>Population</tc>
          <tc>Residents</tc>
          <tc>Films</tc>
          <tc>Created</tc>
          <tc>Edited</tc>
        </tfoot>
        {planets.map((planet) => (
          <tbody key="planets">
            <tr key={ planet }>
              <tc>{ planet.name }</tc>
              <tc>{ planet.rotation_period }</tc>
              <tc>{ planet.orbital_period }</tc>
              <tc>{ planet.diameter }</tc>
              <tc>{ planet.climate }</tc>
              <tc>{ planet.gravity }</tc>
              <tc>{ planet.terrain }</tc>
              <tc>{ planet.surface_water }</tc>
              <tc>{ planet.population }</tc>
              <tc>{ planet.residents }</tc>
              <tc>{ planet.films }</tc>
              <tc>{ planet.created }</tc>
              <tc>{ planet.edited }</tc>
            </tr>
          </tbody>
        ))}
      </table>
    </Consumer>
  );
}

export default Table;
