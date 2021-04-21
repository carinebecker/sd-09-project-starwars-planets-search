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
  let filteredData = data.filter((planet) => planet.name.includes(name));

  const { filterByNumericValues } = filters;
  filterByNumericValues.forEach((filter) => {
    filteredData = filteredData.filter((planet) => {
      const columnValue = +(planet[filter.column]);
      const filterValue = +(filter.value);

      if (filter.comparison === 'maior que') return (columnValue > filterValue);
      if (filter.comparison === 'menor que') return (columnValue < filterValue);
      if (filter.comparison === 'igual a') return (columnValue === filterValue);

      return false;
    });
  });

  return filteredData;
}

function Table() {
  const { data, isLoading, filters } = useContext(StarWarsContext);
  if (isLoading) return 'Loading';

  const filteredData = filterData(data, filters);
  const headerTitles = getHeaderTitles(data);
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
