import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default function Table() {
  const {
    data,
    filters: {
      filterByName,
      filterByNumericValues,
    },
  } = useContext(StarWarsContext);
  const rowHead = () => (
    <tr>
      {Object.keys(data.results[0]).map((title) => <th key={ title }>{title}</th>)}
    </tr>
  );

  const filterColumn = () => {
    let newData = '';
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        newData = data.results
          .filter((element) => Number(element[column]) > Number(value));
        break;
      case 'menor que':
        newData = data.results
          .filter((element) => Number(element[column]) < Number(value));
        break;
      case 'igual a':
        newData = data.results
          .filter((element) => Number(element[column]) === Number(value));
        break;
      default:
        newData = data.results;
      }
    });
    return newData
      .filter((planet) => planet.name.includes(filterByName.name))
      .map((element) => (
        <tr key={ element.name }>
          { Object.values(element)
            .map((elementValue) => <td key={ elementValue }>{ elementValue }</td>) }
        </tr>));
  };

  const rowBody = () => (
    data.results
      .filter((planet) => planet.name.includes(filterByName.name))
      .map((element) => (
        <tr key={ element.name }>
          { Object.values(element).map((value) => <td key={ value }>{ value }</td>) }
        </tr>
      )));

  // Source of the rowHead and rowBody functions: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/52/files /

  if (!data.results) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <table>
        <thead>
          { rowHead() }
        </thead>
        <tbody>
          { filterByNumericValues.length ? filterColumn() : rowBody()}
        </tbody>
      </table>
    </div>
  );
}
