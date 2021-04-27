import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const get = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => result.json())
      .then((json) => {
        setData(json.results);
        setNewData(json.results);
      });
  };

  useEffect(() => {
    get();
  }, []);

  const filterPlanets = ({ target }) => {
    const filter = data.filter(({ name }) => name.toUpperCase()
      .includes(target.value.toUpperCase()));
    setNewData(filter);
  };

  if (data.length === 0) return <h2>loading</h2>;
  return (
    <div>
      <label htmlFor="planet">
        Pesquisar:
        <input
          type="text"
          id="planet"
          onChange={ filterPlanets }
          data-testid="name-filter"
        />
      </label>
      <table>
        <tr>
          {Object.keys(data[0])
            .filter((value) => value !== 'residents')
            .map((value) => <th key={ value }>{value}</th>)}
        </tr>
        {newData.map((tagTd) => (
          <tr key={ tagTd.name }>
            <td>{tagTd.name}</td>
            <td>{tagTd.rotation_period}</td>
            <td>{tagTd.orbital_period}</td>
            <td>{tagTd.diameter}</td>
            <td>{tagTd.climate}</td>
            <td>{tagTd.gravity}</td>
            <td>{tagTd.terrain}</td>
            <td>{tagTd.surface_water}</td>
            <td>{tagTd.population}</td>
            <td>{tagTd.films}</td>
            <td>{tagTd.created}</td>
            <td>{tagTd.edited}</td>
            <td>{tagTd.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
