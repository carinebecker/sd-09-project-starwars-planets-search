import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

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

function Table() {
  const { data, isLoading } = useContext(StarWarsContext);
  const headerTitles = isLoading ? [] : getHeaderTitles(data);

  if (isLoading) return 'Loading';
  return (
    <table>
      {renderTableHeader(headerTitles)}
      {renderTableBody(data)}
    </table>
  );
}

export default Table;
