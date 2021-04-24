import React, { useEffect, useState } from 'react';
import api from '../Api/Api';
import { usePlanets } from '../context/Planets';

export default function Table() {
  const { planets, setPlanets } = usePlanets();
  const [loading, setLoading] = useState(true);

  async function getPlanets() {
    const response = await api();
    return response;
  }

  useEffect(() => {
    getPlanets().then((response) => {
      setPlanets(response.results);
      setLoading(false);
    });
  }, [setPlanets]);

  if (loading) return <h2>LOADING...</h2>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Periodo de Rotação</th>
            <th>Periodo de orbita</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Área de superfície</th>
            <th>População</th>
            <th>Residents</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((element) => (
            <tr key={ element.name }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.residents.length}</td>
              <td>{element.films.length}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
