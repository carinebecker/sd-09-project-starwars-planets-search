import React, { useContext } from 'react';
import myContext from '../context/contextAPI';

function renderTitles(titles) {
  return (
    <tr>
      { titles.map((title) => <th key={ title }>{ title }</th>) }
    </tr>
  );
}

function renderLines(values) {
  return (
    <tr>
      { values.map((value) => <td key={ value }>{ value }</td>) }
    </tr>
  );
}

function renderTable(planets) {
  if (planets.length > 0) {
    return (
      <div>
        { renderTitles(Object.keys(planets[0])) }
        { planets.map((planet) => renderLines(Object.values(planet))) }
      </div>
    );
  }
  return <span>Planets not found</span>;
}

function filterByValues(list, filters) {
  const { column, comparison, value } = filters.filterByNumericValues;
  let result;
  switch (comparison) {
  case 'menor que':
    result = list.filter((planet) => Number(planet[column]) < Number(value));
    break;
  case 'maior que':
    result = list.filter((planet) => Number(planet[column]) > Number(value));
    break;
  default:
    result = list.filter((planet) => Number(planet[column]) === Number(value));
    break;
  }
  return result;
}

function filterByName(list, name) {
  return list.filter((planet) => {
    const namePlanetUpper = planet.name.toUpperCase();
    const nameFilter = name.toUpperCase();
    return (namePlanetUpper.includes(nameFilter));
  });
}

function Table() {
  const { data, filters } = useContext(myContext);
  const { column, comparison, value } = filters.filterByNumericValues;
  const { name } = filters.filterByName;
  if (data.length > 0) {
    data.forEach((planet) => delete planet.residents);
    if (name) {
      const filteredByName = filterByName(data, name);
      if (column && comparison && value) {
        return renderTable(filterByValues(filteredByName, filters));
      }
      return renderTable(filteredByName);
    }
    if (column && comparison && value) return renderTable(filterByValues(data, filters));
    return renderTable(data);
  }
  return <span>Loading Planets...</span>;
}

export default Table;
