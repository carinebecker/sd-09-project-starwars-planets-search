import React, { useContext } from 'react';
import Context from '../context/Context';

const Table = () => {
  const { data } = useContext(Context);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotação</th>
            <th>Órbita</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água da Superfície</th>
            <th>População</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>Filmes</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { data.map(({ climate, created, diameter, edited, films, gravity, name,
            orbital_period: orbital, population, rotation_period: rotation,
            surface_water: water, terrain, url }, index) => (
            // eslint-disable-next-line react/jsx-indent
            <tr key={ index }>
              <td>{ name }</td>
              <td>{ rotation }</td>
              <td>{ orbital }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ water }</td>
              <td>{ population }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ films }</td>
              <td>{ url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
