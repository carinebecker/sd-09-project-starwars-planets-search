import React, { useContext } from 'react';
import myContext from '../context/contextAPI';

function setOrder(a, b) {
  const Maior = -1;
  const Menor = 1;
  const Igual = 0;
  if (a < b) return Maior;
  if (b > a) return Menor;
  return Igual;
}

function sortPlanets(list, order) {
  const { column, sort } = order;
  if (sort === 'ASC') {
    return list.sort((a, b) => {
      if (Number(a[column])) return a[column] - b[column];
      return setOrder(a[column], b[column]);
    });
  }
  return list.sort((a, b) => {
    if (Number(a[column])) return b[column] - a[column];
    return setOrder(b[column], a[column]);
  });
}

function renderTitles(titles) {
  return (
    <tr className="cell-title">
      { titles.map((title) => <th key={ title }>{ title }</th>) }
    </tr>
  );
}

function renderLines(values) {
  return (
    <tr>
      { values.map((value, index) => {
        if (index === 0) {
          return (
            <td
              data-testid="planet-name"
              className="cell-table"
              key={ value }
            >
              { value }
            </td>
          );
        }
        return <td className="cell-table" key={ value }>{ value }</td>;
      }) }
    </tr>
  );
}

function renderTable(planets) {
  if (planets.length > 0) {
    return (
      <div className="table-info">
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
      if (result) {
        result = result.filter((planet) => Number(planet[column]) < Number(value));
      } else result = list.filter((planet) => Number(planet[column]) < Number(value));
      break;
    case 'maior que':
      if (result) {
        result = result.filter((planet) => Number(planet[column]) > Number(value));
      } else result = list.filter((planet) => Number(planet[column]) > Number(value));
      break;
    default:
      if (result) {
        result = result.filter((planet) => Number(planet[column]) === Number(value));
      } else result = list.filter((planet) => Number(planet[column]) === Number(value));
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
  const { filterByNumericValues, order } = filters;
  const { name } = filters.filterByName;
  if (data.length > 0) {
    data.forEach((planet) => delete planet.residents);
    if (name) {
      const filteredByName = filterByName(data, name);
      if (filterByNumericValues.length > 0) {
        return renderTable(sortPlanets(filterByValues(filteredByName, filters), order));
      }
      return renderTable(sortPlanets(filteredByName, order));
    }
    if (filterByNumericValues.length > 0) {
      return renderTable(sortPlanets(filterByValues(data, filters), order));
    }
    return renderTable(sortPlanets(data, order));
  }
  return <span>Loading Planets...</span>;
}

export default Table;
