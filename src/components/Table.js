/* eslint-disable indent */
import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, filtered } = useContext(Context);

  const titles = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'created', 'edited',
    'films', 'url'];

  const dataBase = () => {
    const { name } = filtered.filters.filterByName;
    if (name !== '') {
      return data.filter((planet) => planet.name.includes(name))
        .map((element, index) => (
          <tr key={ index }>
            { titles.map((item, id) => (
              <td key={ id }>
                {element[item]}
              </td>
            )) }
          </tr>
      ));
    }
    return data.map((element, index) => (
      <tr key={ index }>
        { titles.map((item, id) => (
          <td key={ id }>
            {element[item]}
          </td>
        )) }
      </tr>
    ));
  };

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
          { dataBase() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
