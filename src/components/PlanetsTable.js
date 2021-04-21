import React from 'react';
import PropTypes from 'prop-types';

const PlanetsTable = ({ planets }) => (
  <table>
    <thead>
      <tr>
        <th>NAME</th>
        <th>ROTATION PERIOD</th>
        <th>ORBITAL PERIOD</th>
        <th>DIAMETER</th>
        <th>CLIMATE</th>
        <th>GRAVITY</th>
        <th>TERRAIN</th>
        <th>SURFACE WATER</th>
        <th>POPULATION</th>
        <th>FILMS</th>
        <th>CREATED AT</th>
        <th>EDITED AT</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody>
      {
        planets.map((planet, index) => (
          <tr key={ index }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.films }</td>
            <td>{ planet.url }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

PlanetsTable.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

PlanetsTable.defaultProps = {
  planets: [],
};

export default PlanetsTable;
