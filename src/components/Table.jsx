import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import requestAPI from '../service/request';

function Table() {
  const { data, setPlanets } = useContext(MyContext);
  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            { Object.keys(data[0]).map((r) => <th key={ r }>{ r }</th>) }
          </tr>
        </thead>
        <tbody>
          { data.map((r) => (
            <tr key={ r.name }>
              { Object.values(r).map((obj) => <td key={ obj }>{ obj }</td>) }
            </tr>))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    requestAPI().then((r) => setPlanets(r));
  }, [setPlanets]);

  if (data.length !== 0) {
    return (
      renderTable()
    );
  }
  return (
    <h2>teste</h2>
  );
}

export default Table;
