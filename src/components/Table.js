import React, { useContext } from 'react';
import { StarWarsContext } from '../context/index';

const Table = () => {
  const { planets, loading } = useContext(StarWarsContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Nome do Planeta</th>
          <th>Período de rotação</th>
          <th>Período orbital</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água da superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>

        </tr>
      </thead>
      <tbody>
        {loading === false
        && planets.results.map((planet) => (
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
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
