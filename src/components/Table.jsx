import React, { useContext } from 'react';
import DataApiContext from '../context/DataApiContext';

const Table = () => {
  const {
    data,
    filters,
    isFetching,
    sortColumn,
  } = useContext(DataApiContext);

  const tablePlanets = (planets) => (
    planets.map((eachElement) => (
      <tr key={ eachElement.name }>
        {Object.values(eachElement).map((eachValue) => (
          <td key={ eachValue }>
            {eachValue}
          </td>
        ))}
      </tr>
    ))
  );

  const sortPlanetsByStringTypeColumn = () => {
    const { order: { sort, column } } = sortColumn;
    const lowCaseColumn = column.toLowerCase();
    let sorteredPlanets = [];
    if (sort === 'ASC') {
      sorteredPlanets = data
        .sort((a, b) => a[lowCaseColumn].localeCompare(b[lowCaseColumn]));
    } else {
      sorteredPlanets = data
        .sort((a, b) => b[lowCaseColumn].localeCompare(a[lowCaseColumn]));
    }
    return sorteredPlanets;
  };

  const sortPlanetsByNumberTypeColumn = () => {
    const { order: { sort, column } } = sortColumn;
    const lowCaseColumn = column.toLowerCase();
    let sorteredPlanets = [];
    if (sort === 'ASC') {
      sorteredPlanets = data.sort((a, b) => a[lowCaseColumn] - b[lowCaseColumn]);
    } else {
      sorteredPlanets = data.sort((a, b) => b[lowCaseColumn] - a[lowCaseColumn]);
    }
    return sorteredPlanets;
  };
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

  const verifyTypeOfColumn = () => {
    const { order: { column } } = sortColumn;
    let sorteredPlanets = [];
    if (typeof column === 'string') {
      sorteredPlanets = sortPlanetsByStringTypeColumn();
    } else {
      sorteredPlanets = sortPlanetsByNumberTypeColumn();
    }
    return sorteredPlanets;
  };

  const filterPlanets = () => {
    const sorteredPlanets = verifyTypeOfColumn();
    const { filterByName: { name }, filterByNumericValues } = filters;

    let filteredPlanets = data.filter(({
      name: planetName,
    }) => planetName.toLowerCase().includes(name.toLowerCase()));

    filterByNumericValues.forEach((planet) => {
      const { comparison, column, value } = planet;
      if (comparison === 'maior que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) > +(value));
        console.log(filteredPlanets);
        console.log(column);
      } else if (comparison === 'menor que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) < +(value));
      } else {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) === +(value));
      }
      // +() converte string para number
    });
    if (filteredPlanets.length) {
      return tablePlanets(filteredPlanets);
    }
    if (sortColumn.length) {
      return tablePlanets(sorteredPlanets);
    }
    return tablePlanets(data);
  };

  // useEffect(() => {
  //   sortPlanetsByNumberTypeColumn();
  //   sortPlanetsByStringTypeColumn();
  // }, [sortPlanetsByNumberTypeColumn, sortPlanetsByStringTypeColumn]);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Tabela</h1>
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map((eachKey) => <th key={ eachKey }>{eachKey}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            filterPlanets()
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
