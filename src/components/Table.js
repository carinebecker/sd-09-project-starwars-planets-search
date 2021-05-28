/* eslint-disable sonarjs/cognitive-complexity */
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

                if (value.filters.filterByNumericValues.length > 0) {
                  value.filters.filterByNumericValues.forEach((condition) => {
                    if (condition.comparison === 'maior que') {
                      showPlanet = showPlanet
                        .filter((planet) => Number(planet[condition.column])
                        > Number(condition.value));
                    } else if (condition.comparison === 'menor que') {
                      showPlanet = showPlanet
                        .filter((planet) => Number(planet[condition.column])
                        < Number(condition.value));
                    } else if (condition.comparison === 'igual a') {
                      showPlanet = showPlanet
                        .filter((planet) => Number(planet[condition.column])
                        === Number(condition.value));
                    }
                  });
                }

                const magicNumber = -1;

                showPlanet.sort((a, b) => ((a.name > b.name) ? 1 : magicNumber));
                if (value.filters.order) {
                  if (value.filters.order.sort === 'ASC') {
                    showPlanet.sort((a, b) => ((Number(b[value.filters.order.column])
                    < Number(a[value.filters.order.column])) ? 1 : magicNumber));
                  } else if (value.filters.order.sort === 'DESC') {
                    showPlanet.sort((a, b) => ((Number(a[value.filters.order.column])
                    < Number(b[value.filters.order.column])) ? 1 : magicNumber));
                  }
                }

                return showPlanet.map((planet) => (
                  <tr key={ planet.name }>
                    {Object.keys(planet)
                      .filter((key) => key !== 'residents')
                      .map((key) => (
                        <td data-testid={ `planet-${key}` } key={ key }>{planet[key]}</td>
                      ))}
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
