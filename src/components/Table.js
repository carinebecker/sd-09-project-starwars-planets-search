import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  // Req 1 / 2 - 1.6 - Recepcionando o useContext para usá-lo
  const { planets, filterPlanets } = useContext(PlanetsContext);

  // Req 1 - 1.9 - Essa forma de criar as linhas de uma forma genérica
  const dinamicRow = (element, index) => ( // element são objetos
    <tr key={ index }>
      {
        Object.values(element).map((elementPlanets, key) => ( // Só pego os valores do objeto para usar o map
          <td key={ key }>
            {elementPlanets}
          </td>))
      }
    </tr>
  );

  return (
    <div className="table-container">
      {/* Req 1 - 1.7 - Criar uma tabela para colocar o resultado */}
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        {/* Req 1 - 1.7.1 - Criação da 'cabeça' da tabela */}
        {/* Obs: A descrição desse requisito me deixou com dúvidas */}
        {/* O ricci me ajudou, esses nomes são com a key da API */}
        {/* Mas esses nomes não aparecem no readme - sugerir essa melhora */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {/* Req 2 - 2.3 - Filtragem dinâmica, a depender do input */}
          {filterPlanets.length > 0
            ? filterPlanets.map((element, index) => dinamicRow(element, index))
            // Req 1 - 1.8 - Com o objeto de planetas que veio através do estado faço o map
            : planets.map((element, index) => dinamicRow(element, index))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
