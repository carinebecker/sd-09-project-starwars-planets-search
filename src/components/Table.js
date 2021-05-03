import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filterPlanets from './Filter';

function Table() {
  const { data, filters } = useContext(PlanetsContext);
  const { filterByName: { name }, filterByNumericValues } = filters;

  if (!data.results) return <div>loading</div>;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data.results[0]).map((key) => <th key={ key }>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        { filterPlanets(data.results, filterByNumericValues)
          .filter((planet) => (planet.name.toLowerCase().includes(name)))
          .map((planet, index) => (
            <tr key={ index }>
              { Object.values(planet)
                .map((value) => <td key={ value }>{value}</td>) }
            </tr>)) }
      </tbody>
    </table>
  );
}

export default Table;
