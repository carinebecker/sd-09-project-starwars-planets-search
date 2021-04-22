import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import FiltersContext from '../../context/FiltersContext';

export default function TableBody() {
  const { planets } = useContext(PlanetsContext);
  const { filters: { filterByName: nameQuery } } = useContext(FiltersContext);

  const filteredPlanets = planets.filter(({ name: planetName }) => (
    nameQuery.length
      ? planetName.match(new RegExp(nameQuery, 'i'))
      : planetName
  ));

  return (
    <tbody>
      {
        filteredPlanets.map((planet, index) => {
          const {
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitaPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            residents,
            films,
            created,
            edited,
          } = planet;
          return (
            <tr key={ `${name}${index}` }>
              <td>{ name }</td>
              <td>{ rotationPeriod }</td>
              <td>{ orbitaPeriod }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ surfaceWater }</td>
              <td>{ population }</td>
              <td>{ residents }</td>
              <td>{ films }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
            </tr>
          );
        })
      }
    </tbody>
  );
}
