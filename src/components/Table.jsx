import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Filters from './Filters';

function getHeaderTitles(data) {
  return Object.keys(data[0]);
}

function renderTableHeader(headerTitles) {
  return (
    <thead>
      <tr>
        { headerTitles.map((title) => <th key={ title }>{ title }</th>)}
      </tr>
    </thead>
  );
}

function renderPlanetInfo(planet) {
  return (
    Object.values(planet).map((value) => <td key={ value }>{ value }</td>)
  );
}

function renderTableBody(data) {
  return (
    <tbody>
      { data.map((planet) => (
        <tr key={ planet.name }>
          { renderPlanetInfo(planet) }
        </tr>
      ))}
    </tbody>
  );
}

function filterData(data, filters) {
  const { name } = filters.filterByName;
  return data.filter((planet) => planet.name.includes(name));
}

function Table() {
  const { data, isLoading, filters } = useContext(StarWarsContext);
  const headerTitles = isLoading ? [] : getHeaderTitles(data);

  const filteredData = filterData(data, filters);
  if (isLoading) return 'Loading';
  return (
    <div>
      <Filters />
      <table>
        {renderTableHeader(headerTitles)}
        {renderTableBody(filteredData)}
      </table>
    </div>
  );
}

export default Table;
