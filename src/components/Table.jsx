import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { data } = useContext(TableContext);
  console.log(data);

  const results = data.results.map((res) => Object.keys(res));
  const values = data.results.map((res) => Object.values(res));
  console.log(values)

  // console.log(`results: ${results}`);
  // const planet = results.map(each => each)
  // console.log(planet)
  return (
    <table>
      <thead>
        <tr>
          {
            results[0].map((each, i) => (
              <th key={ i }>{each}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          values.map((value, i) => (
            <tr key={ i }>
              {
                value.map((currValue, i) => (
                  <td key={ i }>{currValue}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
