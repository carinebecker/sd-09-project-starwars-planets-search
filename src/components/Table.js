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

function Table() {
  const { data, filters } = useContext(myContext);
  const { name } = filters.filterByName;
  if (data.length > 0) {
    data.forEach((planet) => delete planet.residents);
    if (name) return renderTable(data.filter((planet) => planet.name.includes(name)));
    return renderTable(data);
  }
  return <span>Loading Planets...</span>;
}

export default Table;
