import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import NoResults from './NoResults';
import './Table.css';

export default function Table() {
  // let { data: planets } = useContext(PlanetsContext);
  const { setFilter, filters, filteredData: planets } = useContext(PlanetsContext);

  // if (filteredData.length) { planets = filteredData; }
  // if (!planets.length) return <NoResults />;

  const [planet1] = planets;
  const columns = Object.keys(planet1);
  const values = planets.map((planet) => Object.values(planet));

  return (
    <>
      <h1>Welcome to StarWars planets search</h1>
      <input
        type="search"
        data-testid="name-filter"
        placeholder="Filter by Name"
        onChange={ ({ target: { value } }) => setFilter({
          ...filters,
          filteredByName: {
            ...filters.filteredByName,
            name: value,
          },
        }) }
      />
      <table>

        <thead>
          <tr>
            {columns.map((key) => <th key={ key }>{key}</th>)}
          </tr>
        </thead>

        <tbody>
          {values.map((planetValues, index) => (
            <tr key={ planetValues[index] }>
              {planetValues.map((value) => <td key={ value }>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
