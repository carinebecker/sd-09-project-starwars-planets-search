import React, { useState, useEffect } from 'react';
import loadPlanets from '../services/ApiPlanets';
import ItemPlanet from './ItemPlanet';
import './Table.css';

function Table() {
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const planets = await loadPlanets();
    setData(planets);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <h3 className="title">Pesquisa de planetas do Star Wars</h3>
      <p> </p>
      <table border="0">
        <thead>
          <tr>
            <th className="name">Nome</th>
            <th className="rotation">Rotação</th>
            <th className="orbital">Período Orbital</th>
            <th className="diameter">Diâmetro</th>
            <th className="climate">Clima</th>
            <th className="gravity">Gravidade</th>
            <th className="terrain">Terreno</th>
            <th className="surface">Superfície</th>
            <th className="population">População</th>
            <th className="films">Filmes</th>
            <th className="created">Criação</th>
            <th className="edited">Editado</th>
            <th className="url">Url</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((planet) => (
              <ItemPlanet
                name={ planet.name }
                rotation={ planet.rotation_period }
                orbital={ planet.orbital_period }
                diameter={ planet.diameter }
                climate={ planet.climate }
                gravity={ planet.gravity }
                terrain={ planet.terrain }
                surface={ planet.surface_water }
                population={ planet.population }
                films={ planet.films[0] }
                created={ planet.created }
                edited={ planet.edited }
                url={ planet.url }
                key={ planet.name }
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
