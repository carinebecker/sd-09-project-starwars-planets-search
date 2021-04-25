import React, { useContext } from 'react';
import { DataApiContext } from '../context/DataApi';

const Table = () => {
  const { apiData } = useContext(DataApiContext);

  if (!apiData.length) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Tabela</h1>
      <table>
        <thead>
          <tr>
            {
              Object.keys(apiData[0]).map((eachKey) => <th key={ eachKey }>{eachKey}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {apiData.map((eachElement) => (
            <tr key={ eachElement.name }>
              {Object.values(eachElement).map((eachValue) => (
                <td key={ eachValue }>
                  {eachValue}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

/* {
  apiData.map((eachElement) => (
    <tr key={ eachElement.name }>
      <td>{eachElement.name}</td>
      <td>{eachElement.rotation_period}</td>
    </tr>
  ))
} */
