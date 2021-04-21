// criar tabela semantica com 13 colunas (exceto coluna residents);
// A tabela deve ter uma primeira linha com os headers e as demais com as informações de cada campo.
// tabela com uma linha para cada planeta;
// criar componente provider que recebera o contexto com a chave data com a resposta da API https://swapi-trybe.herokuapp.com/api/planets/

// criar input data-testid='name-filter' para filtrar tabela
// tabela atualiza com a propriedade onChange;
// o filtro por nome deve ser salvo no contexto com o formato:
/* const context = {
  ...,
  filters: {
    filterByName: 'Tatoo',
  },
}; */

import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

export default function Table() {
  const { data } = useContext(PlanetsContext);
  const filteredKeys = data.map((planet) => (
    Object.keys(planet).filter((key) => key !== 'residents')))[0];
  const filteredValues = data.map((planet) => (
    Object.values(planet).filter((value) => value !== planet.residents)));
  const table = (
    <>
      <h1>Welcome to StarWars planets search</h1>
      <input type="search" name="search" id="search" placeholder="Filter by Name" />
      <table className="teste">
        <thead>
          <tr>
            {filteredKeys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredValues.map((values) => (
            <tr key={ values }>
              {values.map((value) => <td id="title" key={ value }>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return table;
}
