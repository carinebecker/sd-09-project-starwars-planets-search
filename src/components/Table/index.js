import React, { useContext } from 'react';

import PlanetsContext from '../../context/PlanetsContext';

function filterPlanets(planets, filters) {
  const { filterByName: { name }, filterByNumericValues } = filters;
  let filteredPlanets = planets.filter((planet) => planet.name.includes(name));

  filterByNumericValues.forEach((filter) => {
    filteredPlanets = filteredPlanets.filter((planet) => {
      const planetColumnValue = parseFloat(planet[filter.column]);
      const filterColumnValue = parseFloat(filter.value);

      if (filter.comparison === 'maior que') return planetColumnValue > filterColumnValue;
      if (filter.comparison === 'menor que') return planetColumnValue < filterColumnValue;
      if (filter.comparison === 'igual a') return planetColumnValue === filterColumnValue;

      return false;
    });
  });

  return filteredPlanets;
}

function Table() {
  const { isFetching, planets, filters } = useContext(PlanetsContext);

  // useEffect(() => {
  //   fetchPlanetsAPI();
  // }, []);

  const filteredPlanets = filterPlanets(planets, filters);

  console.log('planets filtrados - filteredPlanets');
  console.log(filteredPlanets);

  const render = () => (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Período de Rotação</th>
          <th>Período da Órbita</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criação</th>
          <th>Edição</th>
          <th>Site</th>
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              { planet.films.map((film) => (
                <a
                  href={ film }
                  key={ film }
                >
                  { film }
                </a>))}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderLoading = () => <h3>Loading ...</h3>;

  return (isFetching ? renderLoading() : render());
}

export default Table;
