import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, filtered, planet, titles, takesSortedData } = useContext(Context);

  const headers = ['Nome', 'Rotação', 'Órbita', 'Diâmetro', 'Clima', 'Gravidade',
    'Terreno', 'Água da Superfície', 'População', 'Criado', 'Editado', 'Filmes', 'Url'];

  const tableHeader = () => (
    <tr>
      { headers.map((element, index) => (
        <th key={ index }>
          { element }
        </th>
      )) }
    </tr>
  );

  const dataBase = () => {
    const { name } = filtered.filters.filterByName;
    if (name !== '') {
      return data.filter((row) => row.name.includes(name))
        .map((element, index) => (
          <tr key={ index }>
            { titles.map((item, id) => {
              if (item === 'name') {
                return (
                  <td key={ id } data-testid="planet-name">
                    {element[item]}
                  </td>
                );
              }
              return (
                <td
                  key={ id }
                >
                  {element[item]}
                </td>
              );
            }) }
          </tr>
        ));
    }
    if (planet.length > 0) {
      return planet.map((element, index) => (
        <tr key={ index }>
          { titles.map((item, id) => {
            if (item === 'name') {
              return (
                <td key={ id } data-testid="planet-name">
                  {element[item]}
                </td>
              );
            }
            return (
              <td
                key={ id }
              >
                {element[item]}
              </td>
            );
          }) }
        </tr>
      ));
    }
    const order = takesSortedData();
    return order.map((element, index) => (
      <tr key={ index }>
        { titles.map((item, id) => {
          if (item === 'name') {
            return (
              <td key={ id } data-testid="planet-name">
                {element[item]}
              </td>
            );
          }
          return (
            <td
              key={ id }
            >
              {element[item]}
            </td>
          );
        }) }
      </tr>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          { tableHeader() }
        </thead>
        <tbody>
          { dataBase() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
