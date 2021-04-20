import React, { useContext, useState } from 'react';
import criaCont from '../context/contextStar';

function Table() {
  const { filters, filterByName, filterByNumericValues } = useContext(criaCont);
  const [filtrado, setFiltrado] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 'null',
  });
  const [dropdown, setdropdrown] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleChange = ({ target: { value } }) => {
    filterByName(value);
  };
  const handleFilter = ({ target: { name, value } }) => {
    setFiltrado({
      ...filtrado,
      [name]: value,
    });
  };

  const handleButton = () => {
    filterByNumericValues(filtrado);
    setdropdrown(dropdown.filter((item) => item !== filtrado.column));
  };

  return (
    <div>
      <header>
        <input
          onChange={ handleChange }
          data-testid="name-filter"
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleFilter }
          required
        >
          {dropdown.map((item) => <option key={ item }>{item}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleFilter }
          required
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleFilter }
          required
        />
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ handleButton }
        >
          Filtrar
        </button>
      </header>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Climate </th>
            <th> Created </th>
            <th> Diameter </th>
            <th> Edited </th>
            <th> Films </th>
            <th> Gravity </th>
            <th> Orbital Period </th>
            <th> Population </th>
            <th> Rotation Period </th>
            <th> Surface Water</th>
            <th> Terrain </th>
            <th> Url </th>
          </tr>
        </thead>
        <tbody>
          {filters.map((planeta) => (
            <tr key={ planeta.name }>
              <td>
                {planeta.name}
              </td>
              <td>
                {planeta.climate}
              </td>
              <td>
                {planeta.created}
              </td>
              <td>
                {planeta.diameter}
              </td>
              <td>
                {planeta.edited}
              </td>
              <td>
                {planeta.films}
              </td>
              <td>
                {planeta.gravity}
              </td>
              <td>
                {planeta.orbital_period}
              </td>
              <td>
                {planeta.population}
              </td>
              <td>
                {planeta.rotation_period}
              </td>
              <td>
                {planeta.surface_water}
              </td>
              <td>
                {planeta.terrain}
              </td>
              <td>
                {planeta.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
// partes do código inspiradas no código do Lucas Neiva, turma 8
