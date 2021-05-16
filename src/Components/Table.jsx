import React, { useContext } from 'react';
import { ApiContext } from '../Context/DataApi';

const Table = () => {
  const { data } = useContext(ApiContext);

  if (!data.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map((eachTr) => <th key={ eachTr }>{eachTr}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {data.map((eachElement) => (
            <tr key={ eachElement.name }>
              {Object.values(eachElement).map((value) => (
                <td key={ value }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
