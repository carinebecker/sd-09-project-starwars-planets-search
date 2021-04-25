import React, { useContext } from 'react';
import { Context } from '../Context';

const filterPlanets = (planets, filterByNumericValues) => {
  filterByNumericValues.forEach(({ column, comparison, value }) => {
    if (comparison === 'maior que') {
      planets = planets.filter((planet) => +planet[column] > +value);
    }
    if (comparison === 'menor que') {
      planets = planets.filter((planet) => +planet[column] < +value);
    }
    if (comparison === 'igual a') {
      planets = planets.filter((planet) => +planet[column] === +value);
    }
  });
  return planets;
};

function Table() {
  const { data, filters } = useContext(Context);
  const { filterByName, filterByNumericValues } = filters;
  if (!data.results) return <div>Loading...</div>;
  const planets = data.results;

  return (
    <table>
      <thead>
        <tr>
          { Object.keys(planets[0])
            .map((element) => <th key={ element }>{ element }</th>) }
        </tr>
      </thead>
      <tbody>
        { filterPlanets(planets, filterByNumericValues)
          .filter(({ name }) => name.toLowerCase().includes(filterByName.name))
          .map((planet, index) => (
            <tr key={ index }>
              { Object.values(planet).map((value) => (value === planet.name
                ? <td data-testid="planet-name" key={ value }>{ value }</td>
                : <td key={ value }>{ value }</td>)) }
            </tr>
          )) }
      </tbody>
    </table>
  );
}

export default Table;
