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
    Object.values(planet).map((value, index) => {
      if (index !== 0) return <td key={ value }>{ value }</td>;
      return <td key={ value } data-testid="planet-name">{ value }</td>;
    })
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

function checkIsNumber(string) {
  return Number.isNaN(+string) ? string : +string;
}

function filterData(data, filters) {
  const { filterByName: { name }, filterByNumericValues, order } = filters;
  let filteredData = data.filter((planet) => planet.name.includes(name));

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

  filteredData.sort((planet1, planet2) => {
    const direct = 1;
    const reverse = -1;
    const keep = 0;
    const { column } = order;

    const value1 = checkIsNumber(planet1[column]);
    const value2 = checkIsNumber(planet2[column]);

    if (value1 > value2) return order.sort === 'ASC' ? direct : reverse;
    if (value1 < value2) return order.sort === 'ASC' ? reverse : direct;

    return keep;
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
