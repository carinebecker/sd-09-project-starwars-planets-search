import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { usePlanet } from '../context/Planets';

export default function Table() {
  const { planets, setPlanets } = usePlanet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api().then((response) => {
      setPlanets(response.results);
      setLoading(false);
    });
  }, [setPlanets]);

  async function handleSearch({ target }) {
    const response = await api();
    const filter = response.results
      .filter((planet) => planet.name.includes(target.value));
    setPlanets(filter);
  }

  if (loading) return <h2>Loading</h2>;
  return (
    <div>
      <input type="text" onChange={ handleSearch } data-testid="name-filter" />
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
            <th>área de superfície</th>
            <th>População</th>
            <th>residents</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
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

    </div>);
}
