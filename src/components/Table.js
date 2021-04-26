import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => result.json())
      .then((json) => {
        setData(json.results);
        setLoading(true);
      });
  });

  if (loading === false) return <h2>loading</h2>;
  return (
    <div>
      <table>
        <tr>
          {Object.keys(data[0])
            .filter((value) => value !== 'residents')
            .map((value) => <th key={ value }>{value}</th>)}
        </tr>
        {data.map((tagTd) => (
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
