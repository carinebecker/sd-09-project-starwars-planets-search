import React, { useContext } from 'react';
import myContext from '../context/contextAPI';

function renderTitles(titles) {
  return (
    <tr className="cell-title">
      { titles.map((title) => <th className="cell-table" key={ title }>{ title }</th>) }
    </tr>
  );
}

function renderLines(values) {
  return (
    <tr>
      { values.map((value) => <td className="cell-table" key={ value }>{ value }</td>) }
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
  const { filterByNumericValues } = filters;
  let result;

  filterByNumericValues.forEach((filter) => {
    const { column, comparison, value } = filter;
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
  });
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
  const { filterByNumericValues } = filters;
  const { name } = filters.filterByName;
  if (data.length > 0) {
    data.forEach((planet) => delete planet.residents);
    if (name) {
      const filteredByName = filterByName(data, name);
      if (filterByNumericValues.length > 0) {
        return renderTable(filterByValues(filteredByName, filters));
      }
      return renderTable(filteredByName);
    }
    if (filterByNumericValues.length > 0) {
      return renderTable(filterByValues(data, filters));
    }
    return renderTable(data);
  }
  return <span>Loading Planets...</span>;
}

export default Table;
