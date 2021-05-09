import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ContextPlanets } from '../../context/PlanetsContext';

function filterData(data, filters) {
  const { filterByName: { name } } = filters;
  const filteredData = data.filter((planet) => planet.name.includes(name));
  return filteredData;
}

function Table() {
  const { data, filters } = useContext(ContextPlanets);

  const filteredData = filterData(data, filters);
  console.log(filteredData);
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
        { filteredData.map((planet) => (
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
                <Link
                  to={ film }
                  key={ film }
                >
                  { film }
                </Link>))}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (render());
}

export default Table;
