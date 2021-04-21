import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

function Table() {
  const [newData, setNewData] = useState([]);
  const {
    data,
    filters: {
      filterByName: { name: planetName },
      filterByNumericValues,
    },
    columnFilter,
    comparisonFilter,
    valueFilter,
    filterPlanet,
    createNumericFilter,
  } = useContext(PlanetsContext);

  const filterData = () => {
    const newArray = data.filter((planet) => {
      if (filterByNumericValues.length > 0) {
        const filtered = filterByNumericValues
          .find(({ column, comparison, value }) => {
            switch (comparison) {
            case 'maior que':
              return parseInt(planet[column], 10) > parseInt(value, 10);
            case 'menor que':
              return parseInt(planet[column], 10) < parseInt(value, 10);
            default:
              return parseInt(planet[column], 10) === parseInt(value, 10);
            }
          });
        console.log(filtered);
      }
      switch (comparisonFilter) {
      case 'maior que':
        return parseInt(planet[columnFilter], 10) > parseInt(valueFilter, 10);
      case 'menor que':
        return parseInt(planet[columnFilter], 10) < parseInt(valueFilter, 10);
      default:
        return parseInt(planet[columnFilter], 10) === parseInt(valueFilter, 10);
      }
    });
    setNewData(newArray);
  };
  const array = newData.length > 0 ? newData : data;

  if (!data) return <p>Loading...</p>;
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ planetName }
        onChange={ (e) => filterPlanet('name', e) }
        placeholder="Type to filter the planets"
      />
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ (e) => filterPlanet('column', e) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ (e) => filterPlanet('comparison', e) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ valueFilter }
        onChange={ (e) => filterPlanet('value', e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => { createNumericFilter(); filterData(); } }
      >
        Selecione o filtro
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Climate</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          { array.filter(({ name }) => name.includes(planetName)).map(({
            climate,
            created,
            diameter,
            edited,
            films,
            gravity,
            name,
            orbital_period: orbitalPeriod,
            population,
            rotation_period: rotationPeriod,
            surface_water: surfaceWater,
            terrain,
            url,
          }) => (
            <tr key={ url }>
              <td>{ name }</td>
              <td>{ population }</td>
              <td>{ climate }</td>
              <td>{ diameter }</td>
              <td>{ gravity }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ rotationPeriod }</td>
              <td>{ terrain }</td>
              <td>{ surfaceWater }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>
              <td>{ films.map((film) => <span key={ film }>{ film }</span>) }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
