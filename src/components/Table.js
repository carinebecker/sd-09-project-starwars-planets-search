import React from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  return (
    <div>
      <h1>Table</h1>
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
          <StarWarsContext.Consumer>
            {(value) => {
              if (value.responseApi) {
                let showPlanet = value.responseApi;
                if (value.filters.filterByName.name !== undefined) {
                  showPlanet = showPlanet
                    .filter((planet) => planet.name
                      .includes(value.filters.filterByName.name));
                }
                return showPlanet.map((planet) => (
                  <tr key={ planet.name }>
                    {Object.keys(planet)
                      .filter((key) => key !== 'residents')
                      .map((key) => <td key={ key }>{planet[key]}</td>)}
                  </tr>
                ));
              }
            }}
          </StarWarsContext.Consumer>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
