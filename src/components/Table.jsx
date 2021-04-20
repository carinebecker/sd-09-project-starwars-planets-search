import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { planets, getPlanets } = useContext(MyContext);
  console.log(planets);
  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            { Object.keys(planets[0]).map((r) => <th key={ r }>{ r }</th>) }
          </tr>
        </thead>
        <tbody>
          { planets.map((r) => (
            <tr key={ r.name }>
              { Object.values(r).map((obj) => <td key={ obj }>{ obj }</td>) }
            </tr>))}
        </tbody>
      </table>
    );
  }

  function teste() {
    getPlanets();
  }

  useEffect(() => {
    teste();
  }, []);

  if (planets.length !== 0) {
    return (
      renderTable()
    );
  }
  return (
    <h2>teste</h2>
  );
}

export default Table;
