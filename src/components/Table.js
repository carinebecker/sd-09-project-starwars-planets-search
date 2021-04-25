import React, { useContext } from 'react';
import { Context } from '../Context';
import { filterPlanets, sortPlanets } from './Store';

function Table() {
  const { data, filters } = useContext(Context);
  const { filterByName, filterByNumericValues, order } = filters;

  if (!data.results) return <div className="loading">Loading...</div>;
  const planets = sortPlanets(data.results, order);

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
