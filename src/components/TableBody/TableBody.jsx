import React, { useContext } from 'react';
import planetsContext from '../../context/PlanetsContext';

export default function TableBody() {
  const { planets } = useContext(planetsContext);

  return (
    <tbody>
      {
        planets.map((planet, index) => {
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
