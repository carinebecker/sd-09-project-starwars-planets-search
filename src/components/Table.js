import React, { useContext } from 'react';
import { Context } from '../Context';

function Table() {
  const { data } = useContext(Context);
  if (!data.results) return <table />;
  return (
    <table>
      <thead>
        <tr>
          { Object.keys(data.results[0]).map((element, index) => (
            <th key={ index }>{ element }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { data.results.map((element) => (
          <tr key={ element.name }>
            { Object.values(element).map((value) => (
              <td key={ value }>{ value }</td>))}
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
