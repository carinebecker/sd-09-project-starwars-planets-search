import React, { useContext } from 'react';
import { StarWarsContext } from '../provider/Provider';

function TableHeader() {
  const { data } = useContext(StarWarsContext);

  if (!data.length) return <div>Loading..</div>;

  const headerTable = () => (
    <thead>
      <tr>
        {Object.keys(data[0])
          .map((titulo) => (<th key={ titulo }>{titulo}</th>))}
      </tr>
    </thead>
  );

  const bodyTable = () => (
    <tbody>
      {data.map((element) => (
        <tr key={ element }>
          {Object.values(element)
            .map((item) => <td key={ item }>{item}</td>)}
        </tr>))}
    </tbody>
  );

  return (
    <table>
      {headerTable()}
      {bodyTable()}
    </table>
  );
}

export default TableHeader;
