import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import FiltersContext from '../../context/FiltersContext';

const comparisons = {
  'maior que': (a, b) => Number(a) > Number(b),
  'menor que': (a, b) => Number(a) < Number(b),
  'igual a': (a, b) => Number(a) === Number(b),
};

export default function TableBody() {
  const { planets } = useContext(PlanetsContext);
  const {
    filters: {
      filterByName: nameQuery,
      filterByNumericValues: numericValues,
    } } = useContext(FiltersContext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  useEffect(() => {
    const filtered = planets.filter(({ name: planetName }) => (
      nameQuery.length
        ? planetName.match(new RegExp(nameQuery, 'i'))
        : planetName
    ));
    setFilteredPlanets(filtered);
  }, [planets, nameQuery]);

  useEffect(() => {
    let filtered = planets.slice();
    numericValues.forEach(({ column, comparison, value }) => {
      filtered = filtered.filter((planet) => (
        comparisons[comparison](planet[column], value)
      ));
    });
    setFilteredPlanets(filtered);
  }, [planets, numericValues]);

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
              <td data-testid="planet-name">{ name }</td>
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
